import { defineStore } from "pinia";
import * as s$pemeliharaan from "@/services/lembarkerja/pemeliharaan";

const u$pemeliharaan = defineStore({
  id: "pemeliharaan",
  state: () => ({
    pemeliharaan: [],
    pemeliharaanAll: [],
  }),
  actions: {
    // Pemeliharaan
    async a$pemeliharaanList() {
      try {
        const { data } = await s$pemeliharaan.list();
        this.pemeliharaan = data.list;
      } catch ({ error }) {
        this.pemeliharaan = [];
        throw error;
      }
    },

    // Pemeliharaan All
    async a$pemeliharaanListAll() {
      try {
        const { data } = await s$pemeliharaan.listAll();
        this.pemeliharaanAll = data.list;
      } catch ({ error }) {
        this.pemeliharaanAll = [];
        throw error;
      }
    },

    // Create pemeliharaan
    async a$createLkPemeliharaan(request) {
      try {
        await s$pemeliharaan.createPemeliharaan(request);
      } catch ({ error }) {
        throw error;
      }
    },

  },

  getters: {
    g$pemeliharaan: (state) => state.pemeliharaan,
    g$pemeliharaanAll: (state) => state.pemeliharaanAll,
  },
});

export default u$pemeliharaan;
