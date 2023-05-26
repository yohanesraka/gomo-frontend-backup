<script>
import { mapActions, mapState } from "pinia";
import d$pemerahan from "@/stores/fase/pemerahan";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Fase Pemerahan",
  }),
  data: () => ({
    pageTitle: "Fase Pemerahan",
    input: {
      id_indukan: "",
      id_pejantan: "",
    },
    //UI
    modal: {
      createPerkawinan: false,
    },
    // DataTable
    dt: {
      column: [
        {
          th: "Tanggal ",
          render: ({ tanggal_perkawinan }) => ubahTanggal(tanggal_perkawinan),
        },
        {
          name: "id_indukan",
          th: "ID Ternak",
        },
        {
          name: "status",
          th: "Status",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$pemerahan, ["g$pemerahan"]),
  },

  async mounted() {
    await this.a$pemerahanList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$pemerahan, ["a$pemerahanList"]),
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <router-link to="../pemerahan" >
            <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-pemerahan" >
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
            <router-link to="data-pemerahan" >
            <base-button type="success1" class="btn-lg text-white">
                Riwayat pemerahan
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="sedang-laktasi" >
            <base-button type="secondary" class="btn-lg text-dark">
                Sedang Laktasi
              </base-button>
            </router-link>
          </span>
        </div>
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

    <template #modal>
      <!-- Create Adaptasi -->
      <modal-comp
        v-model:show="modal.createPerkawinan"
        modal-classes="modal-md"
      >
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.createPerkawinan">
            <div class="row">
              <!-- id_indukan -->
              <div class="col-12">
                <base-input name="id_indukan" label="ID Indukan">
                  <multi-select
                    v-model="input.id_indukan"
                    :options="g$listIndukan"
                    label="id_ternak"
                    track-by="id_ternak"
                    placeholder="Pilih ID Indukan"
                    :show-labels="false"
                  />
                </base-input>
              </div>

              <!-- id_pejantan -->
              <div class="col-12">
                <base-input name="id_pejantan" label="ID Pejantan">
                  <multi-select
                    v-model="input.id_pejantan"
                    :options="g$listPejantan"
                    label="id_ternak"
                    track-by="id_ternak"
                    placeholder="Pilih ID Pejantan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.createPerkawinan = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="createPerkawinan">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
