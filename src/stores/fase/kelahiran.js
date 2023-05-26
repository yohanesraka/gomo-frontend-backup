import { defineStore } from "pinia";
import * as s$kelahiran from "@/services/fase/kelahiran";
import * as s$dropdown from "@/services/dropdown";

const u$kelahiran = defineStore({
  id: "kelahiran",
  state: () => ({
    kelahiran: [],
    cempe: [],
    statusLepasSapih: ['Indukan', 'Pejantan', 'Bakalan'],
    populasi: [],
    kandang: [],
    pejantan: [],
    indukan: [],
  }),
  actions: {
    //List Kelahiran
    async a$kelahiranList() {
      try {
        const { data } = await s$kelahiran.list();
        this.kelahiran = data.list;
      } catch ({ error }) {
        this.kelahiran = [];
        throw error;
      }
    },

    //List Summary Kelahiran
    async a$listKelahiran() {
      try {
        const { data } = await s$kelahiran.listKelahiran();
        this.kelahiran = data.ternak.list;
        this.populasi = data.ternak;
        this.kandang = data.kandang.list;
      } catch ({ error }) {
        this.kelahiran = [];
        throw error;
      }
    },

    //List Pejantan
    async a$listPejantan() {
      try {
        const { data } = await s$dropdown.dropdown();
        this.pejantan = data.pejantan;
      } catch ({ error }) {
        this.pejantan = [];
        throw error;
      }
    },

    //List Indukan
    async a$listIndukan() {
      try {
        const { data } = await s$dropdown.dropdown();
        this.indukan = data.indukan;
      } catch ({ error }) {
        this.indukan = [];
        throw error;
      }
    },

    //Cempe Baru
    async a$listCempeBaru() {
      try {
        const { data } = await s$kelahiran.listCempeBaru();
        this.cempe = data.list;
      } catch ({ error }) {
        this.cempe = [];
        throw error;
      }
    },

    //Create Kelahiran
    async a$kelahiranCreate(req) {
      try {
        await s$kelahiran.create(req);
      } catch ({ error }) {
        throw error;
      }
    },
  },

  getters: {
    g$kelahiran: (state) => state.kelahiran,
    g$kandang: (state) => state.kandang,
    g$listPejantan: (state) => state.pejantan,
    g$listIndukan: (state) => state.indukan,
    g$listCempeBaru: (state) => state.cempe,
    g$byPopulasi: (state) => ({
      categories: ["Total", "Cempe Betina", "Cempe Jantan"],
      series: [
        {
          name: "Populasi",
          color: "#19B6CF",
          data: [
            state.populasi.total,
            state.populasi.total_cempe_betina,
            state.populasi.total_cempe_jantan,
          ],
        },
      ],
    }),
  },
});

export default u$kelahiran;
