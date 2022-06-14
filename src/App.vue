<script setup>
import { geolocation } from "./composables/geolocation";
import { computed } from "vue";

const { coords } = geolocation();
const currentPosition = computed(() => ({
  lat: coords.value.latitude,
  long: coords.value.longitude,
}));
</script>

<template>
  <div>
    {{ currentPosition }}
  </div>
</template>

<style></style>
