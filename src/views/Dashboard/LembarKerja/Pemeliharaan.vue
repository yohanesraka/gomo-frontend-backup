<script>
import { mapActions, mapState } from "pinia";

import d$pemeliharaan from "@/stores/lembarkerja/pemeliharaan";
import d$kandang from "@/stores/monitoring/daftarkandang";
import d$pakan from "@/stores/monitoring/pakan";

import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Pemeliharaan",
  }),
  data: () => ({
    pageTitle: "Lembar Kerja Pemeliharaan",
    // DataTable
    dt: {
      column: [
        {
          name: "tanggal_pemeliharaan",
          th: "Tanggal",
          render: ({ tanggal_pemeliharaan }) =>
            ubahTanggal(tanggal_pemeliharaan),
        },
        {
          name: "kandang",
          th: "Kode Kandang",
          render: ({ kandang }) => kandang.kode_kandang,
        },
        {
          name: "jenis_pakan",
          th: "Jenis Pakan",
        },
        {
          name: "jumlah_pakan",
          th: "Jumlah Pakan",
          render: ({ jumlah_pakan }) => `${jumlah_pakan} Kg`,
        },
        {
          name: "pembersihan_kandang",
          th: "Pembersihan Kandang",
          render: ({ pembersihan_kandang }) =>
            pembersihan_kandang
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
        {
          name: "pembersihan_ternak",
          th: "Pembersihan Ternak",
          render: ({ pembersihan_ternak }) =>
            pembersihan_ternak
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
      ],
    },
    input: {
      kandang: null,
      tanggal_pemeliharaan: null,
      jenis_pakan: null,
      jumlah_pakan: 0,
      pembersihan_kandang: true,
      pembersihan_ternak: true,
    },
    modal: {
      createLkPemeliharaan: false,
    },
    loading: false,
    loadingModal: false,
  }),
  computed: {
    ...mapState(d$pemeliharaan, ["g$pemeliharaan", "g$pemeliharaanAll"]),
    ...mapState(d$kandang, ["g$kandangList"]),
    ...mapState(d$pakan, ["g$pakanList"]),
  },

  async mounted() {
    await this.a$pemeliharaanListAll().catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$pemeliharaan, [
      "a$pemeliharaanList",
      "a$pemeliharaanListAll",
      "a$createLkPemeliharaan",
    ]),
    ...mapActions(d$kandang, ["a$kandangList"]),
    ...mapActions(d$pakan, ["a$pakanList"]),

    async triggerCreate() {
      this.modal.createLkPemeliharaan = true;
      this.loadingModal = true;
      await this.a$kandangList().catch((error) => this.notify(error, false));
      await this.a$pakanList("").catch((error) => this.notify(error, false));
      this.loadingModal = false;
    },

    async createLkPemeliharaan() {
      this.loading = true;
      try {
        const {
          kandang,
          tanggal_pemeliharaan,
          jenis_pakan,
          jumlah_pakan,
          pembersihan_kandang,
          pembersihan_ternak,
        } = this.input;
        const data = {
          id_kandang: kandang.id_kandang,
          tanggal_pemeliharaan,
          jenis_pakan: jenis_pakan.jenis_pakan,
          jumlah_pakan,
          pembersihan_kandang,
          pembersihan_ternak,
        };
        await this.a$createLkPemeliharaan(data);
        this.modal.createLkPemeliharaan = false;
        this.notify(`Berhasil menambahkan data ${this.pageTitle}`, true);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.clearInput();
        this.a$pemeliharaanListAll().catch((error) =>
          this.notify(error, false)
        );
      }
      this.loading = false;
    },

    clearInput() {
      this.input = {
        kandang: null,
        tanggal_pemeliharaan: null,
        jenis_pakan: null,
        jumlah_pakan: 0,
        pembersihan_kandang: true,
        pembersihan_ternak: true,
      };
    },
    onChange(value) {
      this.input.jumlah_pakan = value.kebutuhan_pakan;
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
            <router-link to="pemeliharaan">
              <base-button type="success1" class="btn-lg text-white">
                Lembar Kerja Pemeliharaan
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="pemeliharaan/langkah-kerja">
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
        <div class="col text-right">
          <base-button type="success" @click="triggerCreate">
            <span>Tambah {{ pageTitle }}</span>
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$pemeliharaanAll.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$pemeliharaanAll"
        :columns="dt.column"
      />
    </template>

    <template #modal>
      <!-- Create LK pemeliharaan -->
      <modal-comp
        v-model:show="modal.createLkPemeliharaan"
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
            <form-comp v-if="modal.createLkPemeliharaan">
              <div class="row">
                <!-- Kandang -->
                <div class="col-6">
                  <base-input name="kandang" label="Kandang" required>
                    <multi-select
                      v-model="input.kandang"
                      :options="g$kandangList"
                      label="kode_kandang"
                      track-by="id"
                      placeholder="Pilih Kandang"
                      :show-labels="false"
                      @select="onChange"
                    />
                  </base-input>
                </div>

                <!-- Tanggal pemeliharaan -->
                <div class="col-6">
                  <base-input
                    name="tanggal_pemeliharaan"
                    label="Tanggal Pemeliharaan"
                    required
                  >
                    <flat-pickr
                      v-model="input.tanggal_pemeliharaan"
                      :config="{
                        mode: 'single',
                        allowInput: true,
                        maxDate: new Date(),
                        defaultDate: 'today',
                      }"
                      class="form-control datepicker"
                      placeholder="Pilih tanggal"
                      maxDate="today"
                    />
                  </base-input>
                </div>

                <!-- Jenis pakan -->
                <div class="col-6">
                  <base-input name="jenis_pakan" label="Jenis Pakan" required>
                    <multi-select
                      v-model="input.jenis_pakan"
                      :options="g$pakanList"
                      label="jenis_pakan"
                      track-by="id_jenis_pakan"
                      placeholder="Pilih jenis pakan"
                      :show-labels="false"
                      :preselectFirst="true"
                    />
                  </base-input>
                </div>

                <!-- Jumlah pakan -->
                <div class="col-6">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.jumlah_pakan"
                    name="jumlah_pakan"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Jumlah pakan dalam kg"
                      label="Jumlah Pakan (Kg)"
                      type="number"
                      required
                    ></base-input>
                  </field-form>
                </div>

                <!-- Pembersihan kandang -->
                <div class="col-6">
                  <base-input name="jenis_pakan">
                    <base-checkbox v-model="input.pembersihan_kandang">
                      <h5>Pembersihan Kandang</h5>
                    </base-checkbox>
                  </base-input>
                </div>

                <!-- Pembersihan ternak -->
                <div class="col-6">
                  <base-input name="jenis_pakan">
                    <base-checkbox v-model="input.pembersihan_ternak">
                      <h5>Pembersihan Ternak</h5>
                    </base-checkbox>
                  </base-input>
                </div>
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button
            type="secondary"
            @click="modal.createLkPemeliharaan = false"
          >
            Tutup
          </base-button>
          <base-button type="primary" @click="createLkPemeliharaan">
            <span v-if="!loading">Tambah {{ pageTitle }}</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menambahkan...
            </span>
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
