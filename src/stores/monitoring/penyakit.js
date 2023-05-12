import { defineStore } from "pinia";
import * as s$penyakit from "@/services/monitoring/penyakit";

const u$penyakit = defineStore({
  id: "penyakit",
  state: () => ({
    penyakit: [],
  }),
  actions: {
    async a$penyakitList() {
      try {
        const { data } = await s$penyakit.list();
        this.penyakit = data.list;
      } catch ({ error }) {
        this.penyakit = [];
        throw error;
      }
    },
    async a$penyakitAdd(request) {
      try {
        await s$penyakit.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$penyakitEdit(request) {
      try {
        await s$penyakit.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$penyakitDelete(request) {
      try {
        await s$penyakit.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$penyakitList: (state) => state.penyakit,
  },
});

export default u$penyakit;
