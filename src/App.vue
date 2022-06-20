<script setup>
import { geolocation } from "./composables/geolocation";
import { computed, watch } from "vue";
import { useCityWeatherStore } from "./stores/cityWeather";
import { isAnEmptyObject } from "./helpers/object";
import SearchBar from "./components/SearchBar.vue";
import FavoriteCities from "./components/FavoriteCities.vue";
import Weather from "./components/Weather.vue";

const store = useCityWeatherStore();

const { coords } = geolocation();
const currentPosition = computed(() => {
  return {
    coords: {
      latitude: coords.value.latitude,
      longitude: coords.value.longitude,
    },
    name: "Your position",
  };
});

const cityTitle = computed(() => {
  if (!store.currentCity.name) return "No position found";
  return store.currentCity.name;
});

const isYourGeolocation = computed(() => {
  return store.currentCity.name === "Your position";
});

const onClick = (city) => {
  const isAlreadyInTheList = store.favoriteCities?.find((favoriteCity) => {
    return favoriteCity.name === city.name;
  });

  if (isAlreadyInTheList || isAnEmptyObject(city)) return;

  store.setNewFavoriteCity(city);
};

watch(coords, () => {
  store.updateCity(currentPosition.value);
  store.currentWeather(currentPosition.value.coords);
});
</script>

<template>
  <div>
    <h1 class="text-4xl mt-3 font-bold text-center">
      🌈 Weather Application 🌈
    </h1>
    <div class="flex justify-center gap-4 mt-4 flex-wrap">
      <div class="flex flex-col rounded-xl bg-slate-50 p-8 text-left shadow-lg">
        <h2 class="text-2xl text-center mb-2 font-semibold">
          📍 {{ cityTitle }}
        </h2>
        <Weather />
        <button
          v-if="!isYourGeolocation"
          class="mt-2 hover:bg-orange-400 rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-bg-orange-300"
          @click="onClick(store.currentCity)"
        >
          Add to my favorite cities list
        </button>
      </div>
      <FavoriteCities />
    </div>
    <SearchBar />
  </div>
</template>

<style></style>
