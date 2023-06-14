<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/monitoring/ternak";
import { object as y$object, string as y$string, ref as y$ref } from "yup";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";
import router from "../../../router";

export default {
  metaInfo: () => ({
    title: "Data Produksi Susu",
  }),

  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Data Produksi  Susu",
    // UI
    modal: {
      confirm: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "date",
          th: "Tanggal Produksi",
          render: ({ date }) => `${ubahTanggal(date)}`,
        },
        {
          name: "population",
          th: "Populasi Pemerahan",
          render: ({ population }) => `${population} Ekor`,
        },
        {
          name: "produksi_pagi",
          th: "Total Produksi Pagi",
          render: ({ produksi_pagi }) => `${produksi_pagi} Liter`,
        },
        {
          name: "produksi_sore",
          th: "Total Produksi Sore",
          render: ({ produksi_sore }) => `${produksi_sore} Liter`,
        },
        {
          name: "total",
          th: "Total Produksi Harian",
          render: ({ total }) => `${total} Liter`,
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$ternak, ["g$produksiSusuTotal", "g$exportExcel"]),
    modals() {
      return Object.values(this.modal).includes(true);
    },
  },
  watch: {
    modals(val) {
      if (!val) {
        this.clearInput();
      }
    },
  },
  async mounted() {
    this.a$produksiSusuTotal().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$ternak, ["a$produksiSusuTotal", "a$exportExcel"]),
    clearInput() {},
    async triggerExport() {
      try {
        this.a$exportExcel();
      } catch (error) {}
    },
  },

  ubahTanggal,
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <nav class="nav nav-pills flex-column flex-sm-row mb-4">
        <router-link to="../data-produksi" class="nav-item">
          <base-button type="success1" class="btn-lg text-white">
            Daftar Produksi Susu
          </base-button>
          <router-link to="data-produksi/grafik-produksi" class="nav-item">
            <base-button type="secondary" class="btn-lg text-dark">
              Grafik Produksi Susu
            </base-button>
          </router-link>
        </router-link>
      </nav>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="triggerExport">
            <span>Export Excel</span>
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$produksiSusuTotal.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$produksiSusuTotal" :columns="dt.column" />
    </template>
  </main-layout>
</template>
