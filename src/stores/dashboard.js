import { defineStore } from "pinia";
import * as s$dashboard from "@/services/monitoring/dashboard";

const u$dashboard = defineStore({
  id: "dashboard",
  state: () => ({
    totalByStatus: [],
    totalByFase: [],
    totalByKandang: [],
    totalByStatusKeluar: [],
    totalAdgCempe: [],
    categoriesAdgCempe: [],
    totalKandang: [],
    totalTernak: [],
    populasi: [],
    categoriesPopulasi: [],
  }),

  actions: {
    async a$totalByStatus() {
      try {
        const { data } = await s$dashboard.totalTernakByStatus();
        this.totalByStatus = data;
      } catch ({ error }) {
        this.totalByStatus = [];
        throw error;
      }
    },

    async a$totalByFase() {
      try {
        const { data } = await s$dashboard.totalTernakByFase();
        this.totalByFase = data;
      } catch ({ error }) {
        this.totalByFase = [];
        throw error;
      }
    },

    async a$totalByKandang() {
      try {
        const { data } = await s$dashboard.totalTernakByKandang();
        this.totalByKandang = data;
      } catch ({ error }) {
        this.totalByKandang = [];
        throw error;
      }
    },

    async a$totalByStatusKeluar() {
      try {
        const { data } = await s$dashboard.totalTernakByStatusKeluar();
        this.totalByStatusKeluar = data;
      } catch ({ error }) {
        this.totalByStatusKeluar = [];
        throw error;
      }
    },

    async a$totalAdgCempe() {
      try {
        const { data } = await s$dashboard.totalAdgCempe();
        this.totalAdgCempe = Object.values(data);
        let bulan = Object.keys(data);
        this.categoriesAdgCempe = bulan.map((item) => {
          let split = item.split("-")[1];
          if (split == "1") return "Jan ";
          if (split == "2") return "Feb ";
          if (split == "3") return "Mar ";
          if (split == "4") return "Apr ";
          if (split == "5") return "Mei ";
          if (split == "6") return "Jun ";
          if (split == "7") return "Jul ";
          if (split == "8") return "Agu ";
          if (split == "9") return "Sep ";
          if (split == "10") return "Okt ";
          if (split == "11") return "Nov ";
          if (split == "12") return "Des ";
        });
      } catch ({ error }) {
        this.totalAdgCempe = [];
        throw error;
      }
    },

    async a$totalKandang() {
      try {
        const { data } = await s$dashboard.totalKandang();
        this.totalKandang = data;
      } catch ({ error }) {
        this.totalKandang = [];
        throw error;
      }
    },

    async a$totalTernak() {
      try {
        const { data } = await s$dashboard.totalTernak();
        this.totalTernak = data;
      } catch ({ error }) {
        this.totalTernak = [];
        throw error;
      }
    },

    async a$populasi() {
      try {
        const { data } = await s$dashboard.populasi();
        this.populasi = Object.values(data.list);
        let bulan = Object.keys(data.list);
        this.categoriesPopulasi = bulan.map((item) => {
          let split = item.split("-")[1];
          if (split == "1") return "Jan ";
          if (split == "2") return "Feb ";
          if (split == "3") return "Mar ";
          if (split == "4") return "Apr ";
          if (split == "5") return "Mei ";
          if (split == "6") return "Jun ";
          if (split == "7") return "Jul ";
          if (split == "8") return "Agu ";
          if (split == "9") return "Sep ";
          if (split == "10") return "Okt ";
          if (split == "11") return "Nov ";
          if (split == "12") return "Des ";
        });
      } catch ({ error }) {
        this.populasi = [];
        throw error;
      }
    },
  },

  getters: {
    g$totalByFase: (state) => state.totalByFase,
    g$totalByKandang: (state) => state.totalByKandang,
    g$totalByStatusKeluar: (state) => state.totalByStatusKeluar,
    g$totalKandang: (state) => state.totalKandang,
    g$totalTernak: (state) => state.totalTernak,
    g$totalByStatus: (state) => ({
      series: [
        {
          name: "Total",
          innerSize: "50%",
          data: [
            {
              y: state.totalByStatus.total_ternak_pejantan,
              name: "Pejantan",
              color: "#006329",
            },
            {
              y: state.totalByStatus.total_ternak_jantan,
              name: "Jantan",
              color: "#7EB918",
            },
            {
              y: state.totalByStatus.total_ternak_indukan,
              name: "Indukan",
              color: "#008BD0",
            },
            {
              y: state.totalByStatus.total_ternak_betina,
              name: "Betina",
              color: "#776EAD",
            },
            {
              y: state.totalByStatus.total_ternak_cempe_betina,
              name: "Cempe Betina",
              color: "#E40044",
            },
            {
              y: state.totalByStatus.total_ternak_cempe_jantan,
              name: "Cempe Jantan",
              color: "#F07C00",
            },
          ],
        },
      ],
      length: state.totalByStatus.length,
    }),
    g$totalAdgCempe: (state) => ({
      categories: [...state.categoriesAdgCempe],
      series: [
        {
          name: "Produksi",
          data: state.totalAdgCempe.map(({ average }) => average),
          color: "#006329",
        },
        {
          name: "Target Peternak",
          data: state.totalAdgCempe.map(({ average }) => average),
          color: "#a86632",
        },
      ],
    }),
    g$totalPopulasi: (state) => ({
      categories: [...state.categoriesPopulasi],
      series: [
        {
          name: "Populasi",
          data: state.populasi.map(({ populasi }) => populasi),
          color: "#006329",
        },
        {
          name: "Masuk",
          data: state.populasi.map(({ masuk }) => masuk),
        },
        {
          name: "Keluar",
          data: state.populasi.map(({ keluar }) => keluar),
        },
      ],
    }),
  },
});

export default u$dashboard;
