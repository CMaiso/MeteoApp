<script setup>
import { useCityWeatherStore } from "../stores/cityWeather.js";
import { computed, ref, watch } from "vue";

const store = useCityWeatherStore();

const input = ref("");
const filteredCitiesList = computed(() => {
  return store.getCities?.filter((city) =>
    city.name.toLowerCase().includes(input.value.toLowerCase())
  );
});

const onClick = (city) => {
  store.updateCity(city);
  store.currentWeather(city);
  store.cleanCities;
};

watch(input, (value) => {
  store.geocoding(input.value);
});
</script>

<template>
  <div class="flex flex-col items-center mt-8">
    <h3 class="text-2xl">🔎 Search a new City</h3>
    <input
      type="text"
      class="outline-none mt-2 rounded-md border border-gray-100 bg-gray-100 px-4 py-2 placeholder-gray-600 focus:border-gray-500 focus:bg-white focus:placeholder-gray-500"
      v-model="input"
      placeholder="Search City..."
    />
    <ul
      v-for="city in filteredCitiesList"
      :key="city.id"
      @click="onClick(city)"
    >
      <li>{{ city.name }}</li>
    </ul>
  </div>
</template>

<style></style>
