<script setup>
import { computed } from "vue";
import { weatherCodes } from "../collections/weatherCode";
import { useCityWeatherStore } from "../stores/cityWeather.js";

const store = useCityWeatherStore();

const weather = computed(() => {
  const weatherCode = store.currentCity?.current_weather?.weathercode;
  return weatherCodes[weatherCode];
});
const temperature = computed(() => {
  return `${store.currentCity?.current_weather?.temperature}°C`;
});
</script>

<template>
  <div class="text-center">
    <p class="text-xl mb-1">{{ temperature }}</p>
    <p class="text-lg">{{ weather }}</p>
  </div>
</template>
