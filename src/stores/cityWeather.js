import { defineStore } from "pinia";

export const useCityWeatherStore = defineStore("cityWeather", {
  state: () => {
    return {
      currentCity: {},
      cities: [],
      favoriteCities: [],
    };
  },
  getters: {
    getCities: (state) => {
      return state.cities;
    },
    getError: (state) => {
      return state.error;
    },
    getfavoriteCities: (state) => {
      return state.favoriteCities;
    },
    cleanCities() {
      return (this.cities = []);
    },
  },
  actions: {
    updateCity(newCity) {
      return (this.currentCity = newCity);
    },
    setFavoritesCities() {
      const cities = JSON.parse(localStorage.getItem("favoriteCities"));
      if (cities) return (this.favoriteCities = cities);
    },
    setNewFavoriteCity(newCity) {
      this.favoriteCities?.push(newCity);
      window.localStorage.setItem(
        "favoriteCities",
        JSON.stringify(this.favoriteCities)
      );
    },
    removeFavoriteCity(city) {
      const index = this.favoriteCities.findIndex((favoriteCity) => {
        return favoriteCity.name === city.name;
      });
      this.favoriteCities.splice(index, 1);
      window.localStorage.setItem(
        "favoriteCities",
        JSON.stringify(this.favoriteCities)
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
          current_weather: data?.current_weather,
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
