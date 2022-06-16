<script setup>
import { useCityWeatherStore } from "../stores/cityWeather.js";
import { computed, ref, watch } from "vue";

const store = useCityWeatherStore();

const input = ref("");
const filteredCitiesList = computed(() => {
  return store.getListOfCities.filter((city) =>
    city.name.toLowerCase().includes(input.value.toLowerCase())
  );
});

watch(input, (value) => {
  store.geocoding(input.value);
});
</script>

<template>
  <input type="text" v-model="input" placeholder="Search City..." />
  <div class="item fruit" v-for="city in filteredCitiesList" :key="city.id">
    <p>{{ city.name }}</p>
  </div>
  <div class="item error" v-if="input && !filteredCitiesList.length">
    <p>No results found!</p>
  </div>
</template>

<style></style>
