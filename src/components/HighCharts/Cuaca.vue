<script>
export default {
  name: "Cuaca",
  props: {
    cuaca: {
      type: Object,
      default: () => { },
    },
    perkiraaanCuaca: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    tanggal() {
      return this.cuaca.dt ? new Intl.DateTimeFormat("id", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(this.cuaca.dt * 1000) : null;
    },
    gambarCuaca() {
      return this.cuaca.weather ? `https://openweathermap.org/img/wn/${this.cuaca.weather[0].icon}@2x.png` : null;
    },
    suhu() {
      return this.cuaca.main ? `${Math.round(this.cuaca.main.temp)}°C` : null;
    },
    terasaSeperti() {
      return this.cuaca.main ? `${Math.round(this.cuaca.main.feels_like)}°C` : null;
    },
    kelembapan() {
      return this.cuaca.main ? this.cuaca.main.humidity : null;
    },
    tekanan() {
      return this.cuaca.main ? this.cuaca.main.pressure : null;
    },
    kecepatanAngin() {
      // from m/s to km/h
      return this.cuaca.wind ? Math.round(this.cuaca.wind.speed * 3.6) : null;
    },
    arahAngin() {
      if (!this.cuaca.wind) { return null; }
      if (this.cuaca.wind.deg >= 0 && this.cuaca.wind.deg <= 22.5) {
        return "Utara ↓";
      } else if (this.cuaca.wind.deg > 22.5 && this.cuaca.wind.deg <= 67.5) {
        return "Timur Laut ↙";
      } else if (this.cuaca.wind.deg > 67.5 && this.cuaca.wind.deg <= 112.5) {
        return "Timur ←";
      } else if (this.cuaca.wind.deg > 112.5 && this.cuaca.wind.deg <= 157.5) {
        return "Tenggara ↖";
      } else if (this.cuaca.wind.deg > 157.5 && this.cuaca.wind.deg <= 202.5) {
        return "Selatan ↑";
      } else if (this.cuaca.wind.deg > 202.5 && this.cuaca.wind.deg <= 247.5) {
        return "Barat Daya ↗";
      } else if (this.cuaca.wind.deg > 247.5 && this.cuaca.wind.deg <= 292.5) {
        return "Barat →";
      } else if (this.cuaca.wind.deg > 292.5 && this.cuaca.wind.deg <= 337.5) {
        return "Barat Laut ↘";
      } else if (this.cuaca.wind.deg > 337.5 && this.cuaca.wind.deg <= 360) {
        return "Utara ↓";
      }
    },
    deskripsi() {
      return this.cuaca.weather ? this.cuaca.weather[0].description : null;
    },
    maksMin() {
      return this.cuaca.main ? `${Math.round(this.cuaca.main.temp_min)}°C/${Math.round(
        this.cuaca.main.temp_max
      )}°C` : null;
    },
    curahHujan() {
      return this.cuaca.rain ? `${this.cuaca.rain["1h"]} mm` : '---';
    },
  },
};
</script>

<template>
  <div class="row">
    <div class="col">
      <p class="text-left text-white pt-1 mt-1 ml-3" style="font-size: small">
        {{ tanggal }}
      </p>
    </div>
  </div>
  <div class="row mt--4">
    <div class="col-5">
      <img style="width: 80px" :src="gambarCuaca" class="d-block p-0 m-0" :alt="deskripsi ? deskripsi : 'Icon cuaca'" />
      <p class="text-left text-white ml-2 mt--3 m-0 p-0 text-capitalize" style="font-size: small">
        {{ deskripsi }}
      </p>
    </div>
    <div class="col-7 mt-3">
      <div class="row">
        <div class="col-12">
          <p class="temp text-white text-sm-left">
            {{ suhu }}
          </p>
          <p class="kecil text-sm-left text-white mt--3">
            Terasa Seperti
            {{ terasaSeperti }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3 mr--3">
    <div class="col kecil">
      <div class="row">
        <div class="col-5 text-white">
          <i class="fa-solid fa-cloud-rain"></i> Curah Hujan:
          {{ curahHujan }}
        </div>
        <div class="col-7 text-white">
          <i class="fa-solid fa-droplet"></i> Kelembapan: {{ kelembapan }}%
        </div>
      </div>
      <hr class="bg-white m-2 mr-4 ml--1" />
      <div class="row">
        <div class="col-5 text-white">
          <i class="fa-solid fa-down-left-and-up-right-to-center"></i> Tekanan:
          {{ tekanan }} hPa
        </div>
        <div class="col-7 text-white">
          <i class="fa-solid fa-wind"></i> Angin: {{ kecepatanAngin }} Km/jam
          dari {{ arahAngin }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.kecil {
  font-size: 0.7rem;
}

.temp {
  font-size: 1.8rem;
  font-weight: 700;
}
</style>
