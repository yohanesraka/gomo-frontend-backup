<script>
import { mapActions, mapState } from "pinia";
import d$lepasSapih from "@/stores/fase/lepasSapih";
import d$kandang from "@/stores/monitoring/daftarkandang";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Fase Lepas Sapih",
  }),
  data: () => ({
    pageTitle: "Fase Lepas Sapih",
    input: {
      ternak: null,
      tanggal_lepas_sapih: null,
      kandang: null,
      status: null,
    },
    //UI
    modal: {
      createLepasSapih: false,
      seleksi: false,
    },
    loading: false,
    loadingModal: false,
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Cempe",
        },
        {
          th: "Tanggal Lepas Sapih",
          render: ({ tanggal }) => (tanggal ? ubahTanggal(tanggal) : null),
        },
        {
          name: "kode_kandang",
          th: "Kode Kandang",
          render: ({ kandang }) => (kandang ? kandang.kode_kandang : null),
        },
      ],
      action: [
        {
          text: "Seleksi",
          color: "primary",
          event: "seleksi",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$lepasSapih, [
      "g$cempe",
      "g$statusSeleksi",
      "g$ternakLepasSapih",
    ]),
    ...mapState(d$kandang, ["g$kandangList"]),
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
    await this.a$ternakLepasSapih().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$lepasSapih, [
      "a$createLepasSapih",
      "a$cempe",
      "a$ternakLepasSapih",
      "a$seleksiTernak",
    ]),
    ...mapActions(d$kandang, ["a$kandangList"]),
    clearInput() {
      this.input = {
        id_ternak: null,
        ternak: null,
        tanggal_lepas_sapih: null,
        kandang: null,
      };
    },

    async createLepasSapih() {
      this.loading = true;
      try {
        const { ternak, tanggal_lepas_sapih, kandang } = this.input;
        const data = {
          id_ternak: ternak.id_ternak,
          tanggal_lepas_sapih,
          id_kandang: kandang.id_kandang,
        };
        await this.a$createLepasSapih(data);
        this.notify("Data berhasil ditambahkan", true);
        this.modal.createLepasSapih = false;
        this.a$ternakLepasSapih();
      } catch (error) {
        this.notify(error, false);
      }
      this.loading = false;
    },

    async triggerCreateLepasSapih() {
      this.modal.createLepasSapih = true;
      this.loadingModal = true;
      await this.a$cempe().catch((error) => this.notify(error, false));
      await this.a$kandangList().catch((error) => this.notify(error, false));
      this.loadingModal = false;
    },

    triggerSeleksi(row) {
      this.modal.seleksi = true;
      this.input = row;
    },

    async seleksiTernak() {
      this.loading = true;
      try {
        const { id_ternak, status } = this.input;
        const data = {
          id_ternak,
          status,
        };
        await this.a$seleksiTernak(data);
        this.notify("Ternak berhasil diseleksi", true);
        this.modal.seleksi = false;
        this.a$ternakLepasSapih();
      } catch (error) {
        this.notify(error, false);
      }
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
              <base-button type="secondary" class="btn-lg text-dark">
                Riwayat Lepas Sapih
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="fase-lepas-sapih">
              <base-button type="success1" class="btn-lg text-white">
                Cempe Lepas Sapih
              </base-button>
            </router-link>
          </span>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="triggerCreateLepasSapih">
            <span>Tambah {{ pageTitle }}</span>
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$ternakLepasSapih.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$ternakLepasSapih"
        :columns="dt.column"
        :actions="dt.action"
        @seleksi="triggerSeleksi"
      />
    </template>

    <template #modal>
      <!-- Create fase lepas sapih -->
      <modal-comp
        v-model:show="modal.createLepasSapih"
        modal-classes="modal-md"
      >
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.createLepasSapih">
              <div class="row">
                <!-- id_ternak -->
                <div class="col-12">
                  <base-input name="id_ternak" label="ID ternak">
                    <multi-select
                      v-model="input.ternak"
                      :options="g$cempe"
                      label="id_ternak"
                      track-by="id_ternak"
                      placeholder="Pilih ID ternak"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- Tanggal lepas sapih -->
                <div class="col-12">
                  <base-input
                    name="tanggal_lepas sapih"
                    label="Tanggal Lepas Sapih"
                  >
                    <flat-pickr
                      v-model="input.tanggal_lepas_sapih"
                      :config="{
                        mode: 'single',
                        allowInput: true,
                        maxDate: new Date(),
                        defaultDate: 'today',
                      }"
                      class="form-control datepicker"
                      placeholder="Pilih tanggal"
                    />
                  </base-input>
                </div>

                <!-- Kode kandang -->
                <div class="col-12">
                  <base-input name="kode_kandang" label="Pilih kandang">
                    <multi-select
                      v-model="input.kandang"
                      :options="g$kandangList"
                      track-by="id_kandang"
                      label="kode_kandang"
                      placeholder="Pilih kandang"
                      :show-labels="false"
                    />
                  </base-input>
                </div>
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.createLepasSapih = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="createLepasSapih">
            <span v-if="!loading">Tambah {{ pageTitle }}</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menambahkan...
            </span>
          </base-button>
        </template>
      </modal-comp>

      <!-- Seleksi -->
      <modal-comp v-model:show="modal.seleksi" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Seleksi {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.seleksi">
            <div class="row">
              <!-- status_seleksi -->
              <div class="col-12">
                <base-input name="status" label="Status">
                  <multi-select
                    v-model="input.status"
                    :options="g$statusSeleksi"
                    placeholder="Pilih status"
                    :show-labels="false"
                  />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.seleksi = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="seleksiTernak">
            <span v-if="!loading">Seleksi</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menyimpan...
            </span>
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
