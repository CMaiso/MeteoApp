<script setup>
import { useCityWeatherStore } from "../stores/cityWeather.js";
import { computed, ref, watch } from "vue";

const store = useCityWeatherStore();

const input = ref("");
const filteredCitiesList = computed(() => {
  return store?.getCities.filter((city) =>
    city.name.toLowerCase().includes(input.value.toLowerCase())
  );
});

const onClick = (city) => {
  store.updateCity(city);
  store.currentWeather(city);
  store.cleanCities();
};

watch(input, (value) => {
  store.geocoding(input.value);
});
</script>

<template>
  <input type="text" v-model="input" placeholder="Search City..." />
  <ul
    class="item fruit"
    v-for="city in filteredCitiesList"
    :key="city.id"
    @click="onClick(city)"
  >
    <li>{{ city.name }}</li>
  </ul>
</template>

<style></style>
