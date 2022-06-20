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
  <div
    class="text-center flex flex-col rounded-xl bg-slate-50 p-8 text-left shadow-lg"
  >
    <h2 class="text-2xl font-semibold mb-2">🧡 Favorite Cities List</h2>
    <ul>
      <li
        class="flex content-center text-lg mt-1"
        v-for="city in store.favoriteCities"
        :key="city.id"
      >
        <button
          class="mr-1 focus:outline-none rounded-md border border-transparent bg-orange-500 py-1 px-2 text-sm text-white hover:bg-bg-orange-300"
          @click="onDelete(city)"
        >
          X
        </button>
        <p @click="onClick(city)">{{ city.name }}</p>
      </li>
    </ul>
  </div>
</template>

<style></style>
