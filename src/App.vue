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
  store.currentWeather(currentPosition);
  console.log("pouet");
});
</script>

<template>
  <div>
    <h1>{{ store.city.name }}'s Weather Today</h1>
    {{ currentPosition }}
    <SearchBar />
  </div>
</template>

<style></style>
