import { onUnmounted, onMounted, ref } from "vue";
import { useCityWeatherStore } from "../stores/cityWeather";

export function geolocation() {
  const coords = ref({ latitude: 0, longitude: 0 });
  const store = useCityWeatherStore();
  const isSupported = "navigator" in window && "geolocation" in navigator;

  let watcher = null;
  onMounted(() => {
    if (isSupported) {
      //TODO: add case when user refuse localisation
      watcher = navigator.geolocation.watchPosition(
        (position) => (coords.value = position.coords),
        () => (coords.value = defaultCoords)
      );
    } else {
      store.setDefaultCoords();
    }
  });
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher);
  });

  return { coords, isSupported };
}
