<script>
import { mapActions, mapState } from "pinia";
import d$kebuntingan from "@/stores/fase/kebuntingan";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Fase Kebuntingan",
  }),
  data: () => ({
    pageTitle: "Fase Kebuntingan",
    input: {
      id_ternak: null,
    },
    //UI
    modal: {
      abortus: false,
    },
    loading: false,
    // DataTable
    dt: {
      column: [
        {
          th: "Tanggal",
          render: ({ tanggal }) => ubahTanggal(tanggal),
        },
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          name: "kandang",
          th: "Kandang",
          render: ({ kandang }) => (kandang ? kandang.kode_kandang : null),
        },
      ],
      action: [
        {
          text: "Abortus",
          color: "danger",
          event: "triggerAbortus",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kebuntingan, ["g$sedangBunting"]),
  },

  async mounted() {
    await this.a$sedangBunting().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kebuntingan, ["a$sedangBunting", "a$setAbortus"]),
    triggerAbortus(row) {
      this.input.id_ternak = row.id_ternak;
      this.modal.abortus = true;
    },

    async setAbortus() {
      this.loading = true;
      const data = {
        id_ternak: this.input.id_ternak,
      };
      await this.a$setAbortus(data).catch((error) => this.notify(error, false));
      this.modal.abortus = false;
      await this.a$sedangBunting().catch((error) => this.notify(error, false));
      this.notify(
        `Berhasil mengubah status kebuntingan ternak dengan ID ternak ${data.id_ternak} menjadi abortus`,
        true
      );
      this.loading = false;
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <router-link to="../kebuntingan">
              <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-kebuntingan">
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
            <router-link to="data-kebuntingan">
              <base-button type="secondary" class="btn-lg text-dark">
                Riwayat Kebuntingan
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="sedang-bunting">
              <base-button type="success1" class="btn-lg text-white">
                Sedang Bunting
              </base-button>
            </router-link>
          </span>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$sedangBunting.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$sedangBunting"
        :columns="dt.column"
        :actions="dt.action"
        @triggerAbortus="triggerAbortus"
      />
    </template>

    <template #modal>
      <!-- Set abortus -->
      <modal-comp v-model:show="modal.abortus" modal-classes="modal-sm">
        <template #header>
          <h3 class="modal-title">Abortus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menyatakan ternak dengan ID ternak
            <strong>{{ input.id_ternak ? input.id_ternak : "ID" }}</strong>
            abortus?
          </p>
          <p class="text-danger text-sm">
            Setelah dinyatakan abortus, Anda tidak dapat memulihkan data ini!
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.abortus = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="setAbortus"
            ><span v-if="!loading">Abortus</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menyimpan...
            </span></base-button
          >
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
