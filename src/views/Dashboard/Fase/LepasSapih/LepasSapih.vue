<script>
import { mapActions, mapState } from "pinia";
import d$lepasSapih from "@/stores/fase/lepasSapih";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Fase Lepas Sapih",
  }),
  data: () => ({
    pageTitle: "Fase Lepas Sapih",
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Cempe",
        },
        {
          th: "Tanggal Lepas Sapih",
          render: ({ tanggal_lepas_sapih }) => tanggal_lepas_sapih ? ubahTanggal(tanggal_lepas_sapih) : null,
        },
        {
          name: "kode_kandang",
          th: "Kode Kandang",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$lepasSapih, ["g$lepasSapih"]),
  },
  async mounted() {
    this.a$lepasSapihList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$lepasSapih, ["a$lepasSapihList"]),
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <router-link to="../lepas-sapih">
              <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-lepas-sapih">
              <base-button type="success1" class="btn-lg text-white">
                {{ pageTitle }}
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="langkah-kerja">
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
            <router-link to="data-lepas-sapih">
              <base-button type="success1" class="btn-lg text-white" >
                Riwayat Lepas Sapih
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="fase-lepas-sapih" >
              <base-button type="secondary" class="btn-lg text-dark" >
                Cempe Lepas Sapih
              </base-button>
            </router-link>
          </span>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$lepasSapih.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$lepasSapih" :columns="dt.column"  />
    </template>

  </main-layout>
</template>
