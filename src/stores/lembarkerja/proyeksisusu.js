import { defineStore } from "pinia";
import * as s$produksiSusu from "@/services/lembarkerja/proyeksisusu";

const ubahTanggal = (tanggal) =>
  new Intl.DateTimeFormat("id-ID", { dateStyle: "short" }).format(
    new Date(tanggal)
  );
const u$produksiSusu = defineStore({
  id: "produksiSusu",
  state: () => ({
    produksiSusu:[],

  }),
  actions: {
    //Get Data Produksi Susu
    async a$produksiSusu(req) {
      try {
        const { data } = await s$produksiSusu.listproduksiSusu(req);
        this.produksiSusu = data.list;
      } catch ({ error }) {
        this.produksiSusu= [];
        throw error;
      }
    },
  },
  getters: {
    g$produksiList: (state) => state.produksiList,
    g$produksiSusu: (state) => ({
      categories: state.produksiSusu.map(({ tanggal_produksi }) =>
        ubahTanggal(tanggal_produksi)
      ),
      series: [
        {
          name: "Produksi Susu",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: state.produksiSusu.map(({total_harian}) => total_harian),
        },
      ],
      length: state.produksiSusu.length,
    }),
  },
});

export default u$produksiSusu;
