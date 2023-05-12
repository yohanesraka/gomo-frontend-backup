import { defineStore } from "pinia";
import * as s$cuaca from "@/services/monitoring/cuaca";

const u$cuaca = defineStore({
  id: "cuaca",
  state: () => ({
    appid: '724edd4b529beb144b3986c95d678b48',
    cuaca: {
      coord: { lon: 110.3666, lat: -7.7296 },
      weather: [
        { id: 804, main: "Clouds", description: "awan mendung", icon: "04d" },
      ],
      base: "stations",
      main: {
        temp: 26.85,
        feels_like: 29.16,
        temp_min: 26.85,
        temp_max: 26.85,
        pressure: 1013,
        humidity: 77,
        sea_level: 1013,
        grnd_level: 992,
      },
      visibility: 10000,
      wind: { speed: 2.52, deg: 168, gust: 3.58 },
      clouds: { all: 100 },
      dt: 1665452744,
      sys: { country: "ID", sunrise: 1665440286, sunset: 1665484342 },
      timezone: 25200,
      id: 1635660,
      name: "Melati",
      cod: 200,
    },
    perkiraaanCuaca: {
      city:
      {
        id: 1630681,
        name: "Candi Prambanan",
        coord:
        {
          lon: 110.4616,
          lat: -7.7165
        },
        country: "ID",
        population: 44925,
        timezone: 25200
      },
      cod: 200,
      message: 3.3570573,
      cnt: 1,
      list: [{
        dt: 1669780800,
        sunrise: 1669759857,
        sunset: 1669804965,
        temp: {
          day: 27.6,
          min: 22.76,
          max: 27.79,
          night: 22.76,
          eve: 25.56,
          morn: 23.2
        },
        feels_like: {
          day: 30.03,
          night: 23.44,
          eve: 26.23,
          morn: 23.98
        },
        pressure: 1010,
        humidity: 71,
        weather: [{
          id: 500,
          main: "Rain",
          description: "hujan rintik-rintik",
          icon: "10d"
        }],
        speed: 4.37,
        deg: 211,
        gust: 4.32,
        clouds: 97,
        pop: 0.44,
        rain: 1.27
      }]
    },
  }),
  actions: {
    async a$getWeather(latitude, longitude) {
      try {
        const { data } = await s$cuaca.getWeather(latitude, longitude, this.appid);
        this.cuaca = data;
      } catch ({ error }) {
        throw error;
      }
    },
    async a$getWeatherPrediction(latitude, longitude) {
      try {
        const { data } = await s$cuaca.getWeatherPrediction(latitude, longitude, this.appid);
        this.perkiraaanCuaca = data;
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$cuaca: (state) => state.cuaca,
    g$perkiraanCuaca: (state) => state.perkiraanCuaca,
  },
});

export default u$cuaca;
