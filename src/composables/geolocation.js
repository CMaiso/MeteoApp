import { onUnmounted, onMounted, ref } from "vue";

export function geolocation() {
  const coords = ref({ latitude: 0, longitude: 0 });
  const defaultCoords = { latitude: 48.85661, longitude: 2.3522219 };
  const isSupported = "navigator" in window && "geolocation" in navigator;

  let watcher = null;
  onMounted(() => {
    if (isSupported) {
      watcher = navigator.geolocation.watchPosition(
        (position) => (coords.value = position.coords),
        () => (coords.value = defaultCoords)
      );
    } else {
      coords.value = defaultCoords;
    }
  });
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher);
  });

  return { coords, isSupported };
}
