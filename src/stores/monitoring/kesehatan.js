import { defineStore } from "pinia";
import * as s$kesehatan from "@/services/monitoring/kesehatan";

const u$kesehatan = defineStore({
  id: "kesehatan",
  state: () => ({
    kesehatan: [],
    detailKesehatan: [],
    total: [],
    riwayatKesehatan: [],
  }),
  actions: {
    async a$kesehatanList() {
      try {
        const { data } = await s$kesehatan.list();
        this.kesehatan = data.list;
      } catch ({ error }) {
        this.kesehatan = [];
        throw error;
      }
    },
    async a$kesehatanAdd(request) {
      try {
        await s$kesehatan.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kesehatanEdit(request) {
      try {
        await s$kesehatan.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kesehatanDelete(request) {
      try {
        await s$kesehatan.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
    // Detail Kesehatan by ID Penyakit
    async a$penyakitDetail(request) {
      try {
        const { data } = await s$kesehatan.detailKesehatan(request);
        this.detailKesehatan = data.list;
      } catch ({ error }) {
        this.detailKesehatan = {};
        throw error;
      }
    },
    // Total ternak sakit
    async a$totalSakit() {
      try {
        const { data } = await s$kesehatan.listTotal();
        this.total = data.list;
      } catch ({ error }) {
        this.total = [];
        throw error;
      }
    },

    // Riwayat Kesehatan by ID Ternak
    async a$riwayatKesehatan(request) {
      try {
        const { data } = await s$kesehatan.riwayatKesehatan(request);
        this.riwayatKesehatan = data.list;
      } catch ({ error }) {
        this.riwayatKesehatan = [];
        throw error;
      }
    },

    // Riwayat Kesehatan
    async a$riwayatKesehatanList() {
      try {
        const { data } = await s$kesehatan.listRiwayatKesehatan();
        this.riwayatKesehatan = data.list;
      } catch ({ error }) {
        this.riwayatKesehatan = [];
        throw error;
      }
    },
  },
  getters: {
    g$kesehatanList: (state) => state.kesehatan,
    g$detailKesehatan: (state) => state.detailKesehatan,
    g$totalSakit: (state) => state.total,
    g$riwayatKesehatan: (state) => state.riwayatKesehatan,
  },
});

export default u$kesehatan;
