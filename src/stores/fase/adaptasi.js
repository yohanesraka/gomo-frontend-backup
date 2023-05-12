import { defineStore } from "pinia";
import * as s$adaptasi from "@/services/fase/adaptasi";

const u$adaptasi = defineStore({
  id: "adaptasi",
  state: () => ({
    adaptasi: [],
    populasi: [],
    kandang: [],
    hariKe1: [],
    hariKe2: [],
    hariKe3: [],
    hariKe4: [],
    hariKe5: [],
    treatment: [],
  }),
  actions: {
    //List Summary Adaptasi
    async a$adaptasiList() {
      try {
        const { data } = await s$adaptasi.list();
        this.adaptasi = data.list;
        this.populasi = data;
        this.kandang = data.total_per_kandang;
      } catch ({ error }) {
        this.adaptasi = [];
        throw error;
      }
    },

    //List adaptasi Hari Ke 1
    async a$adaptasiHariKe1() {
      try {
        const { data } = await s$adaptasi.hariKe1();
        this.hariKe1 = data.list;
      } catch ({ error }) {
        this.hariKe1 = [];
        throw error;
      }
    },

    //List adaptasi Hari Ke 2
    async a$adaptasiHariKe2() {
      try {
        const { data } = await s$adaptasi.hariKe2();
        this.hariKe2 = data.list;
      } catch ({ error }) {
        this.hariKe2 = [];
        throw error;
      }
    },

    //List adaptasi Hari Ke 3
    async a$adaptasiHariKe3() {
      try {
        const { data } = await s$adaptasi.hariKe3();
        this.hariKe3 = data.list;
      } catch ({ error }) {
        this.hariKe3 = [];
        throw error;
      }
    },

    //List adaptasi Hari Ke 4
    async a$adaptasiHariKe4() {
      try {
        const { data } = await s$adaptasi.hariKe4();
        this.hariKe4 = data.list;
      } catch ({ error }) {
        this.hariKe4 = [];
        throw error;
      }
    },

    //List adaptasi Hari Ke 5
    async a$adaptasiHariKe5() {
      try {
        const { data } = await s$adaptasi.hariKe5();
        this.hariKe5 = data.list;
      } catch ({ error }) {
        this.hariKe5 = [];
        throw error;
      }
    },

    //Crate adaptasi
    async a$createAdaptasi(req) {
      try {
        await s$adaptasi.createAdaptasi(req);
      } catch ({ error }) {
        throw error;
      }
    },

    //Get Treatment
    async a$getTreatment(req) {
      try {
        const { data } = await s$adaptasi.getTreatment(req);
        this.treatment = data.treatments;
      } catch ({ error }) {
        this.treatment = [];
        throw error;
      }
    },
  },

  getters: {
    g$adaptasi: (state) => state.adaptasi,
    g$kandang: (state) => state.kandang,
    g$adaptasiHariKe1: (state) => state.hariKe1,
    g$adaptasiHariKe2: (state) => state.hariKe2,
    g$adaptasiHariKe3: (state) => state.hariKe3,
    g$adaptasiHariKe4: (state) => state.hariKe4,
    g$adaptasiHariKe5: (state) => state.hariKe5,
    g$getTreatment: (state) => state.treatment,
    g$byPopulasi: (state) => ({
      categories: ["Total", "Jantan", "Betina"],
      series: [
        {
          name: "Populasi",
          color: "#006329",
          data: [
            state.populasi.total,
            state.populasi.ternak_jantan,
            state.populasi.ternak_betina,
          ],
        },
      ],
    }),
  },
});

export default u$adaptasi;
