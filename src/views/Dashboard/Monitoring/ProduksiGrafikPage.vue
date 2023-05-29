<script>
import { mapActions, mapState } from "pinia";
import useAuthStore from "@/stores/auth";
import d$kebuntingan from "@/stores/fase/kebuntingan";
import HcAreaSpline from "@/components/HighCharts/AreaSpline.vue";

// In your Vue.js component.

export default {
  metaInfo: () => ({
    title: "Grafik Produksi Susu",
  }),
  components: {
    HcAreaSpline,

  },
  data: () => ({
    pageTitle: "Grafik Produksi Susu",
    // DataTable
    dt: {
      column: [
        {
          name: "tanggal_produksi",
          th: "Tanggal Produksi",
          render: ({ tanggalProduksi}) => {tanggalProduksi} ,
        },
        {
          name: "totalPopulasi",
          th: "Populasi Pemerahan",
          render: ({ populasiPemerahan }) => {populasiPemerahan} ,
        },
        {
          name: "total_pagi",
          th: "Total Produksi Pagi",
          render: ({ totalProduksiPagi }) => {totalProduksiPagi} ,
        },
        {
          name: "total_sore",
          th: "Total Produksi Sore",
          render: ({ totalProduksiSore }) => {totalProduksiSore} ,
        },
        {
          name: "total_Harian",
          th: "Total Produksi Harian",
          render: ({ totalProduksiHarian }) => {totalProduksiHarian},
        },
      ],
    },
  }),
  computed: {
    ...mapState(useAuthStore, ["userInfo"]),
    ...mapState(d$kebuntingan, ["g$kebuntingan", "g$byPopulasi", "g$kandang"]),
  },

  async mounted() {
    try {
      await this.a$listKebuntingan();
    } catch (error) {
      this.notify(error, false);
    }
  },

  methods: {
    ...mapActions(d$kebuntingan, ["a$listKebuntingan"]),
  },
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
          <div class="row"><span class="text-center m-2">
              <router-link to="data-produksi">
                <base-button type="secondary"
                  class="btn-lg text-dark">
                  Daftar Produksi Susu
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="kebuntingan/data-kebuntingan">
                <base-button
                  v-if="userInfo.role !== 'bod'"
                  type="success1" class="btn-lg text-white">
                  {{ pageTitle }}
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="/fase/adaptasi">
                <base-button type="secondary"
                  class="btn-lg text-dark">
                  Harian
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="kebuntingan/langkah-kerja">
                <base-button
                  v-if="userInfo.role !== 'bod'"
                  type="secondary"
                  class="btn-lg text-dark"
                >
                  Bulanan (Periode)
                </base-button>
              </router-link>
            </span>
          </div>
        </div>
      </div>
      <div v-if="g$kebuntingan.length" class="row">
        <div class="col-sm-4">
          <card-comp>
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-success text-left ls-1 mb-4"
                  style="font-size: 16px"
                >
                {{ pageTitle }}
                </h1>
              </div>
            </div>
            <hc-area-spline
              :height="200"
              :data="g$byPopulasi"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
        </div>
        <div class="col-sm-8">
          <card-comp>
            <vueper-slides
              class="no-shadow"
              :visible-slides="4"
              slide-multiple
              :gap="4"
              :slide-ratio="1 / 3"
              :dragging-distance="10"
              :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
              fixed-height="200px"

            >
              <vueper-slide v-for="item in g$kandang" >
                <template #content>
                  <div class="col text-center bg-success rounded mt-5">
                    <h3 class="text-white pt-4">
                      Kandang {{ item.kode_kandang }}
                    </h3>
                    <h1 class="text-white">{{ item.total }}</h1>
                    <p class="text-white pb-3">Ekor</p>
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>
          </card-comp>
        </div>
      </div>
      <div class="row ml-1" v-if="g$kebuntingan.length">
        <h1 class="font-weight-bolder text-success">
          Daftar Ternak {{ pageTitle }}
        </h1>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kebuntingan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$kebuntingan"
        :columns="dt.column"
      />
    </template>
  </main-layout>
</template>
