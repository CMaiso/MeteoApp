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
  const degrees = store.currentCity?.current_weather?.temperature;
  if (!degrees) return;
  return `${degrees}°C`;
});
</script>

<template>
  <div class="text-center">
    <p v-if="temperature" class="text-xl mb-1">{{ temperature }}</p>
    <p class="text-lg">{{ weather }}</p>
  </div>
</template>
