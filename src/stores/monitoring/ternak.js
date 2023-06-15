import { defineStore } from "pinia";
import * as s$ternak from "@/services/monitoring/ternak";

const ubahTanggal = (tanggal) =>
  new Intl.DateTimeFormat("id-ID", { dateStyle: "short" }).format(
    new Date(tanggal)
  );

const u$ternak = defineStore({
  id: "ternak",
  state: () => ({
    ternak: [],
    produksi:[],
    statusTernak: [],
    bangsa: [],
    totalTernak: 0,
    perlakuan: [],
    timbangan: [],
    susu:[],
    prediksi:[],
    exports:[]
    
  }),
  actions: {
    async a$exportExcel(req) {
      try {
        const { data } = await s$ternak.exportEx(req);
        this.exports = data;
        console.log(this.exports)
      } catch ({ error }) {
        this.exports = [];
        throw error;
      }
    },
    async a$ternakList(request) {
      try {
        const { data } = await s$ternak.list(request);
        this.ternak = data.list;
      } catch ({ error }) {
        this.ternak = [];
        throw error;
      }
    },
    async a$totalTernak(request) {
      try {
        const { data } = await s$ternak.list(request);
        this.totalTernak = data.total;
      } catch ({ error }) {
        this.ternak = [];
        throw error;
      }
    },
    async a$ternakAdd(request) {
      try {
        const tambahTernak = await s$ternak.add(request);
        return tambahTernak.data;
      } catch ({ error }) {
        throw error;
      }
    },
    async a$ternakEdit(request) {
      try {
        const editTernak = await s$ternak.edit(request);
        return editTernak.data;
      } catch ({ error }) {
        throw error;
      }
    },
    async a$ternakDelete(request) {
      try {
        const deleteTernak = await s$ternak.del(request);
        return deleteTernak.data;
      } catch ({ error }) {
        throw error;
      }
    },
    // Get status ternak
    async a$statusTernak() {
      try {
        const { data } = await s$ternak.statusTernak();
        this.statusTernak = data.list;
      } catch ({ error }) {
        this.statusTernak = [];
        throw error;
      }
    },
    // Get bangsa
    async a$bangsa() {
      try {
        const { data } = await s$ternak.listBangsa();
        this.bangsa = data.list;
      } catch ({ error }) {
        this.bangsa = [];
        throw error;
      }
    },
    //Get Perlakuan
    async a$perlakuan(req) {
      try {
        const { data } = await s$ternak.listPerlakuan(req);
        this.perlakuan = data.list;
      } catch ({ error }) {
        this.perlakuan = [];
        throw error;
      }
    },
    //Get data timbangan
    async a$byTimbangan(req) {
      try {
        const { data } = await s$ternak.listTimbangan(req);
        this.timbangan = data.list;
      } catch ({ error }) {
        this.timbangan = [];
        throw error;
      }
    },

    async a$prediksiSusuTabel(req) {
      try {
        const { data } = await s$ternak.listPrediksi(req);
        console.log(data);
        this.prediksi = data.data;
        console.log(this.prediksi)
      } catch ({ error }) {
        this.prediksi = [];
        throw error;
      }
    },

    async a$produksiSusuTabel(req) {
      try {
        const { data } = await s$ternak.listSusu(req);
        console.log(data);
        this.produksi = data.dataProduksi;
        console.log(this.produksi)
      } catch ({ error }) {
        this.produksi = [];
        throw error;
      }
    },
    async a$produksiSusuTotal(req) {
      try {
        const { data } = await s$ternak.listTotal(req);
        console.log(data);
        this.susu = data;
        console.log(this.susu)
      } catch ({ error }) {
        this.susu = [];
        throw error;
      }
    },
    async a$produksiSusuAdd(req) {
      try {
        const tambahSusu = await s$ternak.addSusu(req);
        return tambahSusu.data;
      } catch ({ error }) {
        throw error;
      }
    },
    async a$prediksiSusuLiterasi(req) {
      try {
        const tambahLiterasi = await s$ternak.addDeltaPrediksi(req);
        return tambahLiterasi.data;
      } catch ({ error }) {
        throw error;
      }
    },
    async a$prediksiSusuTarget(req) {
      try {
        const tambahTarget = await s$ternak.addTargetPeternak(req);
        return tambahTarget.data;
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$exportExcel:(state) => state.exports,
    g$prediksiSusuTabel:(state) => state.prediksi,
    g$produksiSusuTotal:(state) => state.susu,
    g$produksiSusuTabel: (state) => state.produksi,
    g$ternakList: (state) => state.ternak,
    g$totalTernak: (state) => state.totalTernak,
    g$statusTernak: (state) => state.statusTernak,
    g$perlakuan: (state) => state.perlakuan,
    g$byTimbangan: (state) => ({
      categories: state.timbangan.map(({ tanggal_timbang }) =>
        ubahTanggal(tanggal_timbang)
      ),
      series: [
        {
          name: "Bobot",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: state.timbangan.map(({ berat }) => berat),
        },
        {
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          name: "Suhu",
          data: state.timbangan.map(({ suhu }) => suhu),
        },
      ],
      length: state.timbangan.length,
    }),
    g$produksiSusu: (state) => ({
      categories: state.produksi.map(({ tanggal_produksi }) =>
        ubahTanggal(tanggal_produksi)
      ),
      series: [
        {
          name: "Produksi Susu",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: state.produksi.map(({total_harian}) => total_harian),
        },
      ],
      length: state.produksi.length,
    }),
    g$produksiSusuTotalTabel: (state) => ({
      categories: state.susu.map(({ date }) =>
      ubahTanggal(date)
      ),
      series: [
        {
          name: "Produksi Susu Total",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: state.susu.map(({total}) => total),
        },
      ],
      length: state.susu.length,
    }),
    g$prediksiSusuGrafik: (state) => ({
      categories: state.prediksi.map(({ tanggal }) =>
      ubahTanggal(tanggal)
      ),
      series: [
        {
          name: "Prediksi Literasi",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: state.prediksi.map(({data_literasi}) => data_literasi),
        },
        {
          name: "Target Peternak",
          backgroundColor: "rgb(99, 99, 132)",
          borderColor: "rgb(99, 99, 132)",
          data: state.prediksi.map(({data_prediksi}) => data_prediksi),
        },
      ],
      length: state.prediksi.length,
    }),
    g$produksiSusuTotalTabelBulanan: (state) => {
      const monthlyData = state.susu.reduce((result, data) => {
        const date = new Date(data.date);
        const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        
        if (result[monthYear]) {
          result[monthYear].data.push({
            formattedDate,
            total: data.total,
          });
        } else {
          result[monthYear] = {
            monthYear,
            data: [{
              formattedDate,
              total: data.total,
            }],
          };
        }
        
        return result;
      }, {});
    
      const categories = [];
      const series = [{
        name: 'Produksi Susu Total',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [],
      }];
    
      Object.values(monthlyData).forEach(({ monthYear, data }) => {
        categories.push(monthYear);
        const totalProduction = data.reduce((sum, { total }) => sum + total, 0);
        series[0].data.push(totalProduction);
      });
    
      return {
        categories,
        series,
        length: categories.length,
      };
    },
  },
});


export default u$ternak;
