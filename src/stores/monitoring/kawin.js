import { defineStore } from "pinia";
import * as s$kawin from "@/services/monitoring/kawin";

const u$kawin = defineStore({
  id: "kawin",
  state: () => ({
    kawin: [],
    betina: [],
    jantan: [],
  }),
  actions: {
    // List Domba Betina (Kawin Page)
    async a$betinaList(request) {
      try {
        const { data } = await s$kawin.listBetina(request);
        this.betina = data.list;
      } catch ({ error }) {
        this.betina = [];
        throw error;
      }
    },
    // List Domba Jantan (Kawin Page)
    async a$jantanList(request) {
      try {
        const { data } = await s$kawin.listPejantan(request);
        this.jantan = data.list;
      } catch ({ error }) {
        this.jantan = [];
        throw error;
      }
    },
    // List Kawin by ID Ternak (Detail Kawin Page)
    async a$kawinList(request) {
      try {
        const { data } = await s$kawin.listKawin(request);
        this.kawin = data.list;
      } catch ({ error }) {
        this.kawin = [];
        throw error;
      }
    },
    async a$kawinAdd(request) {
      try {
        await s$kawin.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kawinEdit(request) {
      try {
        await s$kawin.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kawinDelete(request) {
      try {
        await s$kawin.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$kawinList: (state) => state.kawin,
    g$betina: (state) => state.betina,
    g$jantan: (state) => state.jantan,
  },
});

export default u$kawin;
