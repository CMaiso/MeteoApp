import { defineStore } from "pinia";

export const cityWeatherStore = defineStore({
  id: "cityWeather",
  state: () => ({
    city: {
      name: "Paris",
      latitude: 48.85661,
      longitude: 2.3522219,
      currentWeather: {},
    },
    listOfCities: [],
    error: "",
  }),
  getters: {
    getCity: (state) => {
      return state.city;
    },
    getListOfCities: (state) => {
      return state.listOfCities;
    },
    getError: (state) => {
      return state.error;
    },
  },
  actions: {
    async currentWeather({ latitude, longitude }) {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?{latitude}=${latitude}&longitude=${longitude}&current_weather=true`
        );
        this.city = { ...this.city, currentWeather: response?.current_weather };
      } catch (e) {
        this.error = e;
      }
    },
    async geocoding({ name }) {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${name}`
        );
        this.listOfCities.push(response?.results);
      } catch (e) {
        this.error = e;
      }
    },
  },
});
