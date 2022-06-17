<script setup>
import { geolocation } from "./composables/geolocation";
import { computed, watch } from "vue";
import { useCityWeatherStore } from "./stores/cityWeather";
import SearchBar from "./components/SearchBar.vue";
import FavoriteCities from "./components/FavoriteCities.vue";

const store = useCityWeatherStore();

const { coords } = geolocation();
const currentPosition = computed(() => ({
  lat: coords.value.latitude,
  long: coords.value.longitude,
}));

const onClick = (city) => {
  store.setNewFavoriteCity(city);
};

watch(coords, (value) => {
  store.updateCityCoordinates(currentPosition.value);
  store.currentWeather(currentPosition.value);
});
</script>

<template>
  <div>
    <h1>Your localisation Weather Today</h1>
    // TODO: Condition rendering name
    {{ store.currentCity }}
    <button @click="onClick(store.currentCity)">
      Ajouter à la liste de favoris
    </button>
    <SearchBar />
    <FavoriteCities />
  </div>
</template>

<style></style>
