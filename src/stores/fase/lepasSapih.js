import { defineStore } from "pinia";
import * as s$lepasSapih from "@/services/fase/lepasSapih";

const u$lepasSapih = defineStore({
  id: "lepasSapih",
  state: () => ({
    lepasSapih: [],
    ternakLepasSapih: [],
    statusSeleksi: ['Indukan', 'Pejantan', 'Bakalan'],
    cempe: [],
    populasi: [],
    kandang: [],
  }),
  actions: {
    //List Lepas Sapih
    async a$lepasSapihList() {
      try {
        const { data } = await s$lepasSapih.list();
        this.lepasSapih = data.list;
      } catch ({ error }) {
        this.lepasSapih = [];
        throw error;
      }
    },

    //Summary Lepas Sapih
    async a$listLepasSapih() {
      try {
        const { data } = await s$lepasSapih.listLepasSapih();
        this.lepasSapih = data.ternak.list;
        this.populasi = data.ternak;
        this.kandang = data.kandang.list;
      } catch ({ error }) {
        this.lepasSapih = [];
        throw error;
      }
    },

    // Create lepas sapih
    async a$createLepasSapih(req) {
      try {
        const { data } = await s$lepasSapih.createLepasSapih(req);
        return data;
      } catch ({ error }) {
        throw error;
      }
    },

    // Cempe
    async a$cempe() {
      try {
        const { data } = await s$lepasSapih.cempe();
        this.cempe = data.ternak.list;
      } catch ({ error }) {
        this.cempe = [];
        throw error;
      }
    },

    // Get ternak lepas sapih
    async a$ternakLepasSapih() {
      try {
        const { data } = await s$lepasSapih.ternakLepasSapih();
        this.ternakLepasSapih = data.list;
      } catch ({ error }) {
        this.ternakLepasSapih = [];
        throw error;
      }
    },

    // Seleksi ternak
    async a$seleksiTernak(req) {
      try {
        const { data } = await s$lepasSapih.seleksiTernak(req);
        return data;
      } catch ({ error }) {
        throw error;
      }
    }
  },

  getters: {
    g$lepasSapih: (state) => state.lepasSapih,
    g$kandang: (state) => state.kandang,
    g$cempe: (state) => state.cempe,
    g$ternakLepasSapih: (state) => state.ternakLepasSapih,
    g$statusSeleksi: (state) => state.statusSeleksi,
    g$byPopulasi: (state) => ({
      categories: ["Total", "Total Jantan", "Total Betina"],
      series: [
        {
          name: "Populasi",
          color: "#006329",
          data: [
            state.populasi.total,
            state.populasi.total_jantan,
            state.populasi.total_betina,
          ],
        },
      ],
    }),
  },
});

export default u$lepasSapih;
