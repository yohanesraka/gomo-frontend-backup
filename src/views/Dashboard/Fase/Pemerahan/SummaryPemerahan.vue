<script>
import { mapActions, mapState } from "pinia";
import useAuthStore from "@/stores/auth";
import d$pemerahan from "@/stores/fase/pemerahan";
import HcBar from "@/components/HighCharts/Bar.vue";

// In your Vue.js component.
import { VueperSlides, VueperSlide } from "vueperslides";
import "@/assets/vendor/vueperslides/vueperslides.css";

export default {
  metaInfo: () => ({
    title: "Fase Pemerahan",
  }),
  components: {
    HcBar,
    VueperSlides,
    VueperSlide,
  },
  data: () => ({
    pageTitle: "Fase Pemerahan",
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          th: "Bangsa",
          render: ({ bangsa }) => (bangsa ? bangsa.bangsa : "---"),
        },
        {
          name: "jenis_kelamin",
          th: "Jenis Kelamin",
        },
        {
          th: "Kode Kandang",
          render: ({ kandang }) => (kandang ? kandang.kode_kandang : "---"),
        },
        {
          th: "Suhu",
          render: ({ suhu }) => suhu ? suhu + "°C" : null,
        },
        {
          th: "Bobot",
          render: ({ berat }) => berat ? berat + " Kg" : null,
        },
        {
          th: "TotalProduksi",
          render: ({ totalProduksiInd }) => `${totalProduksiInd} Liter`,
        },
      ],
    },
  }),
  computed: {
    ...mapState(useAuthStore, ["userInfo"]),
    ...mapState(d$pemerahan, ["g$pemerahan", "g$byPopulasi", "g$kandang"]),
  },

  async mounted() {
    try {
      await this.a$listPemerahan();
    } catch (error) {
      this.notify(error, false);
    }
  },

  methods: {
    ...mapActions(d$pemerahan, ["a$listPemerahan"]),
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
          <div class="row">
            <span class="text-center m-2">
              <router-link to="/fase/pemerahan">
                <base-button type="success1" class="btn-lg text-white">
                  Summary
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="pemerahan/data-pemerahan">
                <base-button
                  v-if="userInfo.role !== 'bod'"
                  type="secondary"
                  class="btn-lg text-dark"
                >
                  {{ pageTitle }}
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="pemerahan/langkah-kerja">
                <base-button
                  v-if="userInfo.role !== 'bod'"
                  type="secondary"
                  class="btn-lg text-dark"
                >
                  Langkah Kerja
                </base-button>
              </router-link>
            </span>
          </div>
        </div>
      </div>
      <div v-if="g$pemerahan.length" class="row">
        <div class="col-sm-4">
          <card-comp>
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-success text-left ls-1 mb-4"
                  style="font-size: 16px"
                >
                  Populasi {{ pageTitle }}
                </h1>
              </div>
            </div>
            <hc-bar
              :height="215"
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
      <div class="row ml-1" v-if="g$pemerahan.length">
        <h1 class="font-weight-bolder text-success">
          Daftar Ternak {{ pageTitle }}
        </h1>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$pemerahan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$pemerahan"
        :columns="dt.column"
      />
    </template>
  </main-layout>
</template>
