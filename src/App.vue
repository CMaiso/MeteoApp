<script setup>
import { geolocation } from "./composables/geolocation";
import { computed, watch } from "vue";
import SearchBar from "./components/SearchBar.vue";
import { useCityWeatherStore } from "./stores/cityWeather";

const store = useCityWeatherStore();

const { coords } = geolocation();
const currentPosition = computed(() => ({
  lat: coords.value.latitude,
  long: coords.value.longitude,
}));

const onClick = (city) => {
  console.log(city);
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
    {{ store.city }}
    <Button @click="onClick(store.city)">Ajouter à la liste de favoris</Button>
    <SearchBar />
  </div>
</template>

<style></style>
