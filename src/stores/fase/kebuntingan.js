import { defineStore } from "pinia";
import * as s$kebuntingan from "@/services/fase/kebuntingan";

const u$kebuntingan = defineStore({
  id: "kebuntingan",
  state: () => ({
    kebuntingan: [],
    sedangBunting: [],
    populasi: [],
    kandang: [],
  }),
  actions: {
    //List Kebuntingan
    async a$kebuntinganList() {
      try {
        const { data } = await s$kebuntingan.list();
        this.kebuntingan = data.list;
      } catch ({ error }) {
        this.kebuntingan = [];
        throw error;
      }
    },

    //List Summary Kebuntingan
    async a$listKebuntingan() {
      try {
        const { data } = await s$kebuntingan.listKebuntingan();
        this.kebuntingan = data.list;
        this.populasi = data;
        this.kandang = data.kandang;
      } catch ({ error }) {
        this.kebuntingan = [];
        throw error;
      }
    },

    // Sedang bunting
    async a$sedangBunting() {
      try {
        const { data } = await s$kebuntingan.sedangBunting();
        this.sedangBunting = data.list;
      } catch ({ error }) {
        this.sedangBunting = [];
        throw error;
      }
    },

    // Set abortus
    async a$setAbortus(req) {
      try {
        const { data } = await s$kebuntingan.setAbortus(req);
        return data;
      } catch ({ error }) {
        throw error;
      }
    },
  },

  getters: {
    g$kebuntingan: (state) => state.kebuntingan,
    g$kandang: (state) => state.kandang,
    g$sedangBunting: (state) => state.sedangBunting,
    g$byPopulasi: (state) => ({
      categories: ["Total"],
      series: [
        {
          name: "Populasi",
          color: "#006329",
          data: [state.populasi.total],
        },
      ],
    }),
  },
});

export default u$kebuntingan;
