import { onUnmounted, onMounted, ref } from "vue";

export function geolocation() {
  const coords = ref({ latitude: 0, longitude: 0 });
  const isSupported = "navigator" in window && "geolocation" in navigator;

  let watcher = null;
  onMounted(() => {
    if (isSupported) {
      watcher = navigator.geolocation.getCurrentPosition(
        (position) => (coords.value = position.coords),
        (error) => console.warn(`ERROR(${err.code}): ${err.message}`)
      );
    }
  });
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher);
  });

  return { coords, isSupported };
}
