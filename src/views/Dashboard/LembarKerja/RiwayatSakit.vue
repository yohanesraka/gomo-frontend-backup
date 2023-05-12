<script>
import { mapActions, mapState } from "pinia";

import d$kesehatan from "@/stores/monitoring/kesehatan";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Riwayat Sakit",
  }),
  data: () => ({
    pageTitle: "Riwayat Ternak Sakit",
    // DataTable
    dt: {
      column: [
        {
          th: "ID Ternak",
          render: ({ ternak }) => (ternak ? ternak.id_ternak : null),
        },
        {
          name: "tanggal_sakit",
          th: "Tanggal Sakit",
          render: ({ tanggal_sakit }) =>
            tanggal_sakit ? ubahTanggal(tanggal_sakit) : null,
        },
        {
          name: "tanggal_sembuh",
          th: "Tanggal Sembuh",
          render: ({ tanggal_sembuh }) =>
            tanggal_sembuh ? ubahTanggal(tanggal_sembuh) : null,
        },
        {
          name: "gejala",
          th: "Gejala",
          render: ({ gejala }) => (gejala ? gejala : null),
        },
        {
          name: "penanganan",
          th: "Penaganan",
          render: ({ penanganan }) => (penanganan ? penanganan : null),
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kesehatan, ["g$riwayatKesehatan"]),
  },

  async mounted() {
    await this.a$riwayatKesehatanList().catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$kesehatan, ["a$riwayatKesehatanList"]),
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <router-link to="../penanganan-penyakit">
              <base-button type="success1" class="btn-lg text-white">
                Penanganan Penyakit
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
        <span class="text-center m-2">
          <router-link to="../penanganan-penyakit">
            <base-button type="secondary" class="btn-lg text-dark">
              Sedang Sakit
            </base-button>
          </router-link>
        </span>
        <span class="text-center m-2">
          <router-link to="riwayat-sakit">
            <base-button type="success1" class="btn-lg text-white">
              Riwayat Sakit
            </base-button>
          </router-link>
        </span>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$riwayatKesehatan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$riwayatKesehatan"
        :columns="dt.column"
      />
    </template>
  </main-layout>
</template>
