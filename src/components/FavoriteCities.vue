<script setup>
import { useCityWeatherStore } from "../stores/cityWeather.js";
import { onMounted } from "vue";

const store = useCityWeatherStore();

const onClick = (city) => {
  store.updateCity(city);
  store.currentWeather(city);
};

const onDelete = (city) => {
  store.removeFavoriteCity(city);
};

onMounted(() => {
  store.setFavoritesCities();
});
</script>

<template>
  <ul class="">
    <li v-for="city in store.favoriteCities" :key="city.id">
      <p @click="onClick(city)">{{ city.name }}</p>
      <button @click="onDelete(city)">X</button>
    </li>
  </ul>
</template>

<style></style>
