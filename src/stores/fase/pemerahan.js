import { defineStore } from "pinia";
import * as s$pemerahan from "@/services/fase/pemerahan";

const u$pemerahan = defineStore({
  id: "pemerahan",
  state: () => ({
    pemerahan: [],
    sedangLaktasi: [],
    populasi: [],
    kandang: [],
  }),
  actions: {
    //List pemerahan
    async a$pemerahanList() {
      try {
        const { data } = await s$pemerahan.list();
        this.pemerahan = data.list;
      } catch ({ error }) {
        this.pemerahan = [];
        throw error;
      }
    },

    //List Summary pemerahan
    async a$listPemerahan() {
      try {
        const { data } = await s$pemerahan.listPemerahan();
        this.pemerahan = data.list;
        this.populasi = data;
        this.kandang = data.kandang;
      } catch ({ error }) {
        this.pemerahan = [];
        throw error;
      }
    },

    // Sedang Laktasi
    async a$sedangLaktasi() {
      try {
        const { data } = await s$pemerahan.sedangLaktasi();
        this.sedangLaktasi = data.list;
      } catch ({ error }) {
        this.sedangLaktasi = [];
        throw error;
      }
    },
  },

  getters: {
    g$pemerahan: (state) => state.pemerahan,
    g$kandang: (state) => state.kandang,
    g$sedangLaktasi: (state) => state.sedangLaktasi,
    g$byPopulasi: (state) => ({
      categories: ["Total"],
      series: [
        {
          name: "Populasi",
          color: "#19B6CF",
          data: [state.populasi.total],
        },
      ],
    }),
  },
});

export default u$pemerahan;
