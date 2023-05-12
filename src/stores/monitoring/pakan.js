import { defineStore } from "pinia";
import * as s$pakan from "@/services/monitoring/pakan";

const u$pakan = defineStore({
  id: "pakan",
  state: () => ({
    pakan: [],
    totalPakan: [],
    detailPakan: [],
    detailName: [],
    bahanPakan: [],
  }),
  actions: {
    // Pakan
    async a$pakanList(request) {
      try {
        const { data } = await s$pakan.listJenis(request);
        this.pakan = data.list;
      } catch ({ error }) {
        this.pakan = [];
        throw error;
      }
    },
    async a$pakanAdd(request) {
      try {
        await s$pakan.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$pakanEdit(request) {
      try {
        await s$pakan.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$pakanDelete(request) {
      try {
        await s$pakan.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$totalPakan() {
      try {
        const { data } = await s$pakan.list();
        this.totalPakan = data.total;
      } catch ({ error }) {
        this.totalPakan = [];
        throw error;
      }
    },

    // Detail Pakan
    async a$pakanDetail(req) {
      try {
        const { data } = await s$pakan.listNamaPakan(req);
        this.detailName = data.list[0].jenis_pakan;
        const { data: data2 } = await s$pakan.listPakan(req);
        this.detailPakan = data2.list;
      } catch ({ error }) {
        this.detailPakan = [];
        throw error;
      }
    },
    async a$tambahPakan(req) {
      try {
        await s$pakan.tambahPakan(req);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kosongkanPakan(req) {
      try {
        await s$pakan.kosongkanPakan(req);
      } catch (error) {
        throw error;
      }
    },
    async a$isiPakan(req) {
      try {
        await s$pakan.isiPakan(req);
      } catch (error) {
        throw error;
      }
    },
    async a$ubahPakan(req) {
      try {
        await s$pakan.ubahPakan(req);
      } catch (error) {
        throw error;
      }
    },
    async a$deletePakan(req) {
      try {
        await s$pakan.deletePakan(req);
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    g$pakanList: (state) => state.pakan,
    g$detailPakan: (state) => state.detailPakan,
    g$detailName: (state) => state.detailName,
    g$totalPakan: (state) => state.totalPakan,
  },
});

export default u$pakan;
