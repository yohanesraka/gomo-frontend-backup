import { defineStore } from "pinia";
import * as s$ternak from "@/services/monitoring/ternak";

const ubahTanggal = (tanggal) =>
  new Intl.DateTimeFormat("id-ID", { dateStyle: "short" }).format(
    new Date(tanggal)
  );

const u$produksi = defineStore({
  id: "produksi",
  state: () => ({
    produksi:[],
    prediksiList:[],
    susu:[],
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
  },
  getters: {
    g$exportExcel:(state) => state.exports,
    g$produksiSusuTotal:(state) => state.susu,
    g$produksiSusuTabel: (state) => state.produksi,
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


export default u$produksi;
