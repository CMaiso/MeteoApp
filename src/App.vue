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
    <SearchBar />
  </div>
</template>

<style></style>
