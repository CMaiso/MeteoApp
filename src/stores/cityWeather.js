import { defineStore } from "pinia";

export const useCityWeatherStore = defineStore("cityWeather", {
  state: () => {
    return {
      currentCity: {},
      cities: [],
      favoriteCites: [],
      error: "",
      message: "",
    };
  },
  getters: {
    getCity: (state) => {
      return state.currentCity;
    },
    getCities: (state) => {
      return state.cities;
    },
    getError: (state) => {
      return state.error;
    },
    defaultCoords() {
      return (this.currentCity = {
        coords: { latitude: 48.85661, longitude: 2.3522219 },
        name: "Paris",
      });
    },
    cleanCities() {
      return (this.cities = []);
    },
  },
  actions: {
    updateCity(newCity) {
      return (this.currentCity = newCity);
    },
    updateCityCoordinates(coords) {
      return (this.currentCity = { ...this.currentCity, coords });
    },
    setFavoritesCities() {
      const cities = JSON.parse(localStorage.getItem("favoriteCities"));
      return (this.favoriteCites = cities);
    },
    setNewFavoriteCity(newCity) {
      this.favoriteCites.push(newCity);
      window.localStorage.setItem(
        "favoriteCities",
        JSON.stringify(this.favoriteCites)
      );
    },
    removeFavoriteCity(city) {
      const index = this.favoriteCites.findIndex((favoriteCity) => {
        return favoriteCity.name === city.name;
      });
      this.favoriteCites.splice(index, 1);
      window.localStorage.setItem(
        "favoriteCities",
        JSON.stringify(this.favoriteCites)
      );
    },
    async currentWeather({ latitude, longitude }) {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await response.json();
        this.currentCity = {
          ...this.currentCity,
          currentWeather: data?.current_weather,
        };
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
        this.cities = data.results;
      } catch (e) {
        this.error = e;
      }
    },
  },
});
