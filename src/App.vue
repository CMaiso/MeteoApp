<script setup>
import { geolocation } from "./composables/geolocation";
import { computed, watch } from "vue";
import { useCityWeatherStore } from "./stores/cityWeather";
import SearchBar from "./components/SearchBar.vue";
import FavoriteCities from "./components/FavoriteCities.vue";

const store = useCityWeatherStore();

const { coords } = geolocation();
const currentPosition = computed(() => ({
  coords: {
    latitude: coords.value.latitude,
    longitude: coords.value.longitude,
  },
  name: "Your position",
}));

const onClick = (city) => {
  const isAlreadyInTheList = store.favoriteCities?.find((favoriteCity) => {
    return favoriteCity.name === city.name;
  });
  const isAnEmptyObject = Object.entries(city).length === 0;

  if (isAlreadyInTheList || isAnEmptyObject) return;

  store.setNewFavoriteCity(city);
};

watch(coords, () => {
  store.updateCity(currentPosition.value);
  store.currentWeather(currentPosition.value.coords);
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
