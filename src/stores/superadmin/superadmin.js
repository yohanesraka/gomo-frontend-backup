import { defineStore } from "pinia";
import { setCk, delCk, certDetail } from "@/utils/cookies";
import useAuthStore from "@/stores/auth";
import u$user from "@/stores/user";
import * as s$superadmin from "@/services/superadmin/superadmin";
import d from "dayjs";

const u$superadmin = defineStore({
  id: "superadmin",
  state: () => ({
    users: [],
    peternakan: [],
  }),
  actions: {
    async a$getDataUsers() {
      try {
        const { data } = await s$superadmin.getDataUsers();
        this.users = data.list;
      } catch ({ error }) {
        this.users = [];
        throw error;
      }
    },
    async a$getPeternakan() {
      try {
        const { data } = await s$superadmin.getPeternakan();
        this.peternakan = data.list;
      } catch ({ error }) {
        this.peternakan = [];
        throw error;
      }
    },
    async a$getNewToken(request) {
      try {
        const { data } = await s$superadmin.getNewToken(request);
        setCk("CERT", data.token, { datetime: d(data.expiresAt) });
        useAuthStore().a$setUserInfo();
        return "Login Berhasil!";
      } catch ({ error }) {
        throw error;
      }
    },
    async a$setPremiumFarm(request) {
      try {
        const setPremiumFarm = await s$superadmin.setPremiumFarm(request);
        return setPremiumFarm;
      } catch ({ error }) {
        throw error;
      }
    },
    async a$setFreeFarm(request) {
      try {
        const setFreeFarm = await s$superadmin.setFreeFarm(request);
        return setFreeFarm;
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$users: (state) => state.users,
    g$peternakan: (state) => state.peternakan,
  }
});

export default u$superadmin;