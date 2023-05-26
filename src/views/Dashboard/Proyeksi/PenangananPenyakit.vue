<script>
import { mapActions, mapState } from "pinia";
import d$kesehatan from "@/stores/monitoring/kesehatan";
import d$kandang from "@/stores/monitoring/daftarkandang";
import d$ternak from "@/stores/monitoring/ternak";
import d$penyakit from "@/stores/monitoring/penyakit";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Penanganan Penyakit",
  }),
  data: () => ({
    pageTitle: "Lembar Kerja Penanganan Penyakit",
    // DataTable
    dt: {
      column: [
        {
          name: "tanggal_sakit",
          th: "Tanggal Sakit",
          render: ({ tanggal_sakit }) =>
            tanggal_sakit ? ubahTanggal(tanggal_sakit) : null,
        },
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          name: "penyakit",
          th: "Penyakit",
          render: ({ penyakit }) => penyakit.nama_penyakit,
        },
        {
          name: "gejala",
          th: "Gejala",
        },
        {
          name: "penanganan",
          th: "Penaganan",
        },
        {
          name: "tanggal_sembuh",
          th: "Tanggal Sembuh",
          render: ({ tanggal_sembuh }) =>
            tanggal_sembuh ? ubahTanggal(tanggal_sembuh) : null,
        },
      ],
      actions: [
        {
          text: "Sembuh",
          color: "primary",
          event: "sembuh",
          show: ({ tanggal_sembuh }) => !tanggal_sembuh,
        },
        {
          text: "Ubah",
          color: "warning",
          event: "ubah",
        },
      ],
    },
    input: {
      ternak: null,
      penyakit: null,
      tanggal_sakit: null,
      kandang: null,
      id_kesehatan: null,
      gejala: null,
      penanganan: null,
      tanggal_sembuh: null,
    },
    modal: {
      addLkPenangananPenyakit: false,
      editLkPenangananPenyakit: false,
      sembuhLkPenangananPenyakit: false,
    },
    loading: false,
    loadingModal: false,
  }),
  computed: {
    ...mapState(d$ternak, ["g$ternakList"]),
    ...mapState(d$kandang, ["g$kandangList"]),
    ...mapState(d$kesehatan, ["g$kesehatanList"]),
    ...mapState(d$penyakit, ["g$penyakitList"]),
  },

  async mounted() {
    this.a$kesehatanList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kesehatan, [
      "a$kesehatanAdd",
      "a$kesehatanList",
      "a$kesehatanEdit",
    ]),
    ...mapActions(d$kandang, ["a$kandangList"]),
    ...mapActions(d$ternak, ["a$ternakList"]),
    ...mapActions(d$penyakit, ["a$penyakitList"]),

    async triggerCreate() {
      this.modal.addLkPenangananPenyakit = true;
      this.loadingModal = true;
      await this.a$kandangList().catch((error) => this.notify(error, false));
      await this.a$ternakList().catch((error) => this.notify(error, false));
      await this.a$penyakitList().catch((error) => this.notify(error, false));
      this.loadingModal = false;
    },

    async triggerEdit(row) {
      this.modal.editLkPenangananPenyakit = true;
      this.loadingModal = true;
      await this.a$kandangList().catch((error) => this.notify(error, false));
      const {
        id_kesehatan,
        tanggal_sakit,
        kandang,
        gejala,
        penanganan,
        tanggal_sembuh,
      } = row;
      this.input = {
        id_kesehatan,
        tanggal_sakit,
        kandang,
        gejala,
        penanganan,
        tanggal_sembuh,
      };
      this.loadingModal = false;
    },

    //tambah penanganan penyakit
    async createLkPenangananPenyakit() {
      this.loading = true;
      try {
        const { ternak, penyakit, tanggal_sakit, kandang } = this.input;
        const data = {
          id_ternak: ternak.id_ternak,
          id_penyakit: penyakit.id_penyakit,
          tanggal_sakit,
          id_kandang: kandang.id_kandang,
        };
        await this.a$kesehatanAdd(data);
        this.modal.addLkPenangananPenyakit = false;
        this.notify(`Tambah ${this.pageTitle} berhasil`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.clearInput();
        this.a$kesehatanList();
      }
      this.loading = false;
    },

    //edit penanganan penyakit
    async editLkPenangananPenyakit() {
      this.loading = true;
      this.a$kandangList().catch((error) => this.notify(error, false));
      try {
        const {
          id_kesehatan,
          tanggal_sakit,
          kandang,
          tanggal_sembuh,
          gejala,
          penanganan,
        } = this.input;
        const data = {
          id_kesehatan,
          tanggal_sakit,
          tanggal_sembuh,
          id_kandang: kandang.id_kandang,
          gejala,
          penanganan,
        };
        await this.a$kesehatanEdit(data);
        this.modal.editLkPenangananPenyakit = false;
        this.notify(`Edit ${this.pageTitle} berhasil`);
        this.clearInput();
        await this.a$kesehatanList();
      } catch (error) {
        this.notify(error, false);
      }
      this.loading = false;
    },

    //sembuh penanganan penyakit
    async sembuhLkPenangananPenyakit() {
      this.loading = true;
      try {
        const { id_kesehatan, tanggal_sakit, kandang, gejala, penanganan } =
          this.input;
        const data = {
          id_kesehatan,
          tanggal_sakit,
          tanggal_sembuh: new Date().toJSON(),
          id_kandang: kandang.id_kandang,
          gejala,
          penanganan,
        };
        await this.a$kesehatanEdit(data);
        this.notify(`Sembuh ${this.pageTitle} berhasil`);
        this.modal.sembuhLkPenangananPenyakit = false;
        this.clearInput();
        await this.a$kesehatanList();
      } catch (error) {
        this.notify(error, false);
      }
      this.loading = false;
    },

    triggerSembuh(row) {
      const {
        id_kesehatan,
        id_ternak,
        penyakit,
        tanggal_sakit,
        kandang,
        gejala,
        penanganan,
        tanggal_sembuh,
      } = row;
      this.input = {
        id_kesehatan,
        id_ternak,
        penyakit,
        tanggal_sakit,
        kandang,
        gejala,
        penanganan,
        tanggal_sembuh,
      };
      this.modal.sembuhLkPenangananPenyakit = true;
    },

    // Pilih kandang berdasarkan ternak
    onChange(value) {
      this.input.kandang = value.kandang;
    },
    clearInput() {
      this.input = {
        ternak: null,
        penyakit: null,
        tanggal_sakit: null,
        kandang: null,
        id_riwayat_kesehatan: null,
        gejala: null,
        penanganan: null,
        tanggal_sembuh: null,
      };
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
            <router-link to="penanganan-penyakit">
              <base-button type="success1" class="btn-lg text-white">
                Penanganan Penyakit
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="penanganan-penyakit/langkah-kerja">
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
          <router-link to="penanganan-penyakit">
            <base-button type="success1" class="btn-lg text-white">
              Sedang Sakit
            </base-button>
          </router-link>
        </span>
        <span class="text-center m-2">
          <router-link to="penanganan-penyakit/riwayat-sakit">
            <base-button type="secondary" class="btn-lg text-dark">
              Riwayat Sakit
            </base-button>
          </router-link>
        </span>
        <div class="col text-right">
          <base-button type="success" @click="triggerCreate">
            <span>Tambah {{ pageTitle }}</span>
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kesehatanList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$kesehatanList"
        :columns="dt.column"
        :actions="dt.actions"
        @ubah="triggerEdit"
        @sembuh="triggerSembuh"
      />
    </template>

    <template #modal>
      <!-- Tambah LK penanganan penyakit -->
      <modal-comp
        v-model:show="modal.addLkPenangananPenyakit"
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
            <form-comp v-if="modal.addLkPenangananPenyakit">
              <div class="row">
                <!-- ID ternak -->
                <div class="col-12">
                  <base-input
                    name="id_ternak"
                    placeholder="ID Ternak"
                    label="ID Ternak"
                  >
                    <multi-select
                      v-model="input.ternak"
                      :options="g$ternakList"
                      @select="onChange"
                      label="id_ternak"
                      track-by="id_ternak"
                      placeholder="Pilih ternak"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- Penyakit -->
                <div class="col-12">
                  <base-input
                    name="penyakit"
                    placeholder="Nama Penyakit"
                    label="Nama Penyakit"
                    required
                  >
                    <multi-select
                      v-model="input.penyakit"
                      :options="g$penyakitList"
                      label="nama_penyakit"
                      track-by="id_penyakit"
                      placeholder="Pilih Penyakit"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- Tanggal sakit -->
                <div class="col-12">
                  <base-input
                    name="tanggal_sakit"
                    placeholder="Pilih tanggal"
                    label="Tanggal Sakit"
                    required
                  >
                    <flat-pickr
                      v-model="input.tanggal_sakit"
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

                <!-- Kandang -->
                <div class="col-12">
                  <base-input name="kandang" label="Kandang">
                    <multi-select
                      v-model="input.kandang"
                      :options="g$kandangList"
                      track-by="id_kandang"
                      label="kode_kandang"
                      placeholder="Pilih Kandang"
                      :show-labels="false"
                    />
                  </base-input>
                </div>
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button
            type="secondary"
            @click="modal.addLkPenangananPenyakit = false"
          >
            Tutup
          </base-button>
          <base-button type="primary" @click="createLkPenangananPenyakit">
            <span v-if="!loading">Tambah {{ pageTitle }}</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menambahkan...
            </span>
          </base-button>
        </template>
      </modal-comp>

      <!-- Ubah LK penanganan penyakit -->
      <modal-comp
        v-model:show="modal.editLkPenangananPenyakit"
        modal-classes="modal-md"
      >
        <template #header>
          <h3 class="modal-title">Ubah {{ pageTitle }}</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.editLkPenangananPenyakit">
              <div class="row">
                <!-- Tanggal sakit -->
                <div class="col-12">
                  <base-input
                    name="tanggal_sakit"
                    placeholder="Pilih tanggal"
                    label="Tanggal Sakit"
                    required
                  >
                    <flat-pickr
                      v-model.lazy="input.tanggal_sakit"
                      :config="{
                        mode: 'single',
                        allowInput: true,
                        maxDate: new Date(),
                      }"
                      class="form-control datepicker"
                      placeholder="Pilih tanggal"
                    />
                  </base-input>
                </div>

                <!-- Kandang -->
                <div class="col-12">
                  <base-input name="kandang" label="Kandang">
                    <multi-select
                      v-model="input.kandang"
                      :options="g$kandangList"
                      track-by="id_kandang"
                      label="kode_kandang"
                      placeholder="Pilih Kandang"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- Gejala -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.gejala"
                    type="text"
                    name="gejala"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Gejala"
                      label="Gejala"
                    ></base-input>
                  </field-form>
                </div>

                <!-- Penanganan -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.penanganan"
                    type="text"
                    name="penanganan"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Penanganan"
                      label="Penanganan"
                    ></base-input>
                  </field-form>
                </div>

                <!-- Tanggal sembuh -->
                <div class="col-12">
                  <base-input
                    name="tanggal_sembuh"
                    placeholder="Pilih tanggal"
                    label="Tanggal Sembuh"
                    required
                  >
                    <flat-pickr
                      v-model.lazy="input.tanggal_sembuh"
                      :config="{
                        mode: 'single',
                        allowInput: true,
                        minDate: input.tanggal_sakit,
                        maxDate: new Date(),
                      }"
                      class="form-control datepicker"
                      placeholder="Pilih tanggal"
                    />
                  </base-input>
                </div>
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button
            type="secondary"
            @click="modal.editLkPenangananPenyakit = false"
          >
            Tutup
          </base-button>
          <base-button type="primary" @click="editLkPenangananPenyakit">
            <span v-if="!loading">Simpan perubahan</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menyimpan...
            </span>
          </base-button>
        </template>
      </modal-comp>

      <!-- Sembuh LK penanganan penyakit -->
      <modal-comp
        v-model:show="modal.sembuhLkPenangananPenyakit"
        modal-classes="modal-sm"
      >
        <template #header>
          <h3 class="modal-title">Sembuh {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menyatakan ternak dengan ID ternak
            <strong>{{ input.id_ternak ? input.id_ternak : "ID" }}</strong>
            sembuh dari penyakit
            <strong>{{
              input.penyakit ? input.penyakit.nama_penyakit : "Penyakit"
            }}</strong
            >?
          </p>
        </template>
        <template #footer>
          <base-button
            type="secondary"
            @click="modal.sembuhLkPenangananPenyakit = false"
          >
            Tutup
          </base-button>
          <base-button type="primary" @click="sembuhLkPenangananPenyakit"
            ><span v-if="!loading">Sembuh</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menyimpan...
            </span></base-button
          >
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
