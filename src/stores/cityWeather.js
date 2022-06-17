import { defineStore } from "pinia";

export const useCityWeatherStore = defineStore("cityWeather", {
  state: () => {
    return {
      city: {},
      listOfCities: [],
      listOfFavoriteCities: [],
      error: "",
      message: "",
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
    getFavoriteCities: (state) => {
      return state.listOfFavoriteCities;
    },
  },
  actions: {
    updateCity(newCity) {
      return (this.city = newCity);
    },
    updateCityCoordinates(coords) {
      return (this.city = { ...this.city, coords });
    },
    setDefaultCoords() {
      return (this.city = {
        coords: { latitude: 48.85661, longitude: 2.3522219 },
        name: "Paris",
      });
    },
    setNewFavoriteCity(newCity) {
      this.listOfFavoriteCities.push(newCity);
      window.localStorage.setItem(
        "favoriteCities",
        JSON.stringify(this.listOfFavoriteCities)
      );
    },
    cleanListOfCities() {
      return (this.listOfCities = []);
    },
    async currentWeather({ latitude, longitude }) {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await response.json();
        console.log(data);
        this.city = { ...this.city, currentWeather: data?.current_weather };
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
