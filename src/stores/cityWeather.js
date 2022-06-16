import { defineStore } from "pinia";

export const useCityWeatherStore = defineStore("cityWeather", {
  state: () => {
    return {
      city: {
        name: "",
        latitude: 0,
        longitude: 0,
        currentWeather: {},
      },
      listOfCities: [],
      listOfFavoriteCities: [],
      error: "",
    };
  },
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
    updateCity(coords) {
      this.city = coords;
    },
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
    async geocoding(city) {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        const data = await response.json();
        this.listOfCities = data.results;
      } catch (e) {
        this.error = e;
      }
    },
  },
});
