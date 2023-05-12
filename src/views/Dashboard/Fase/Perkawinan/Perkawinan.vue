<script>
import { mapActions, mapState } from "pinia";
import d$perkawinan from "@/stores/fase/perkawinan";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Fase Perkawinan",
  }),
  data: () => ({
    pageTitle: "Fase Perkawinan",
    //UI
    modal: {
      createPerkawinan: false,
    },
    // DataTable
    dt: {
      column: [
        {
          th: "Tanggal ",
          render: ({ tanggal_perkawinan }) => tanggal_perkawinan ? ubahTanggal(tanggal_perkawinan) : null,
        },
        {
          name: "id_indukan",
          th: "ID Indukan",
        },
        {
          name: "id_pejantan",
          th: "ID Pejantan",
        },
        {
          th: "Kode Kandang",
          render: ({ kandang }) => kandang.kode_kandang,
        },
        {
          name: "status",
          th: "Status Indukan",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$perkawinan, [
      "g$listPerkawinan",

    ]),
  },
  async mounted() {
    this.a$perkawinanList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$perkawinan, [
      "a$perkawinanList",

    ]),
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <router-link to="../perkawinan" >
            <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-perkawinan" >
            <base-button type="success1" class="btn-lg text-white">
                {{ pageTitle }}
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="langkah-kerja" >
            <base-button type="secondary" class="btn-lg text-dark">
                Langkah Kerja
              </base-button>
            </router-link>
          </span>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col-auto">
          <span class="text-center m-2">
            <router-link to="data-perkawinan" >
            <base-button type="success1" class="btn-lg text-white">
                Riwayat Perkawinan
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="sedang-kawin" >
            <base-button type="secondary" class="btn-lg text-dark">
                Sedang Kawin
              </base-button>
            </router-link>
          </span>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$listPerkawinan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$listPerkawinan"
        :columns="dt.column"
      />
    </template>
  </main-layout>
</template>
