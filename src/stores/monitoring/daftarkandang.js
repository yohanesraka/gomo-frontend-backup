import { defineStore } from "pinia";
import * as s$daftarkandang from "@/services/monitoring/daftarkandang";

const u$daftarkandang = defineStore({
  id: "kandang",
  state: () => ({
    listkandang: [],
    detailKandang: [],
  }),
  actions: {
    //list kandang
    async a$kandangList() {
      try {
        const { data, total } = await s$daftarkandang.listKandang();
        this.listkandang = data.list;
        this.totalKandang = total;
      } catch ({ error }) {
        this.listkandang = [];
        throw error;
      }
    },

    //tambah kandang
    async a$kandangAdd(request) {
      try {
        await s$daftarkandang.add(request);
      } catch ({ error }) {
        throw error;
      }
    },

    //edit kandang
    async a$kandangEdit(request) {
      try {
        await s$daftarkandang.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },

    //delete kandang
    async a$kandangDelete(request) {
      try {
        await s$daftarkandang.del(request);
      } catch ({ error }) {
        throw error;
      }
    },

    // Detail Ternak by ID Kandang
    async a$kandangDetail(request) {
      try {
        const { data } = await s$daftarkandang.detailKandang(request);
        this.detailKandang = data.list;
      } catch ({ error }) {
        this.detailKandang = {};
        throw error;
      }
    },
  },
  getters: {
    g$kandangList: (state) => state.listkandang,
    g$detailKandang: (state) => state.detailKandang,
  },
});

export default u$daftarkandang;
