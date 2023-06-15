<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/monitoring/ternak";
import { object as y$object, string as y$string, ref as y$ref } from "yup";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";
import HcAreaSpline from "@/components/HighCharts/AreaSpline.vue";

// In your Vue.js component.

export default {
  metaInfo: () => ({
    title: "Grafik Produksi Susu",
  }),
  components: {
    HcAreaSpline,
  },
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Grafik Produksi Susu",
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
    ...mapState(d$ternak, ["g$produksiSusuTotal", "g$produksiSusuTotalTabel"]),
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
    ...mapActions(d$ternak, ["a$produksiSusuTotal"]),
    clearInput() {},
  },
  ubahTanggal,
};
</script>

<template>
  <main-layout :title="pageTitle" is-full style="background: transparent">
    <template #header>
      <div class="row">
        <div class="col-sm-8">
          <h1 class="font-weight-bolder text-success">{{ pageTitle }}</h1>
        </div>
        <div class="col-sm-4">
          <div class="row">
            <span class="text-center m-2">
              <router-link to="../data-produksi">
                <base-button type="secondary" class="btn-lg text-dark">
                  Daftar Produksi Susu
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="grafik-produksi">
                <base-button type="success1" class="btn-lg text-white">
                  {{ pageTitle }}
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="prediksi">
                <base-button type="secondary" class="btn-lg text-dark">
                  Data Prediksi
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="grafik-produksi">
                <base-button type="secondary" class="btn-lg text-dark">
                  Harian
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="grafik-bulanan">
                <base-button type="secondary" class="btn-lg text-dark">
                  Bulanan (Periode)
                </base-button>
              </router-link>
            </span>
          </div>
        </div>
      </div>
      <div v-if="g$produksiSusuTotal.length" class="row">
        <div class="col-sm-4">
          <card-comp>
            <div class="row align-items-center">
              <div class="col">
                <h1 class="text-success text-left ls-1 mb-4" style="font-size: 16px">
                  {{ pageTitle }}
                </h1>
              </div>
            </div>
            <hc-area-spline
              :height="200"
              :data="g$produksiSusuTotalTabel"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
        </div>
      </div>
      <div class="row ml-1" v-if="g$produksiSusuTotal.length">
        <h1 class="font-weight-bolder text-success">Daftar Ternak {{ pageTitle }}</h1>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$produksiSusuTotal.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$produksiSusuTotal" :columns="dt.column" />
    </template>
  </main-layout>
</template>
