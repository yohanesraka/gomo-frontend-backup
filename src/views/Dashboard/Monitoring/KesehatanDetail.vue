<script>
import { mapActions, mapState } from "pinia";

import d$kesehatan from "@/stores/monitoring/kesehatan";
import d$kandang from "@/stores/monitoring/daftarkandang";

import { ubahTanggal } from "@/utils/locale/ubahTanggal";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Riwayat Kesehatan",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Riwayat Kesehatan",
    // Input
    input: {
      id: null,
    },
    // UI
    modal: {
      editTernakSakit: false,
      hapusTernakSakit: false,
      sembuhTernakSakit: false,
    },
    loading: false,
    loadingEdit: false,
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          th: "Nama Penyakit",
          render: ({ penyakit }) => (penyakit ? penyakit.nama_penyakit : null),
        },
        {
          name: "kandang",
          th: "Kandang",
          render: ({ kandang }) => (kandang ? kandang.kode_kandang : null),
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
      ],
      action: [
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
    infoTernak: false,
  }),
  computed: {
    ...mapState(d$kesehatan, ["g$detailKesehatan"]),
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
    await this.a$penyakitDetail(this.$route.params.id).catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$kesehatan, ["a$kesehatanEdit", "a$penyakitDetail"]),
    ...mapActions(d$kandang, ["a$kandangList"]),
    clearInput() {
      this.input = {
        id: null,
      };
    },
    async triggerEdit(row) {
      this.modal.editTernakSakit = true;
      this.loadingEdit = true;
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
      this.loadingEdit = false;
    },
    async editTernakSakit() {
      this.loading = true;
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
        this.modal.editTernakSakit = false;
        this.notify(`Edit ${this.pageTitle} berhasil`);
        this.clearInput();
        await this.a$penyakitDetail(this.$route.params.id);
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
      this.modal.sembuhTernakSakit = true;
    },
    async sembuhTernakSakit() {
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
        this.modal.sembuhTernakSakit = false;
        this.clearInput();
        await this.a$penyakitDetail(this.$route.params.id);
      } catch (error) {
        this.notify(error, false);
      }
      this.loading = false;
    },
    async triggerDelete(row) {
      const { id_riwayat_kesehatan } = row;
      this.input = {
        id_riwayat_kesehatan,
      };
      this.modal.hapusTernakSakit = true;
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$detailKesehatan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$detailKesehatan"
        :columns="dt.column"
        :actions="dt.action"
        @ubah="triggerEdit"
        @sembuh="triggerSembuh"
      />
    </template>

    <template #modal>
      <!-- Ubah ternak sakit -->
      <modal-comp v-model:show="modal.editTernakSakit" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Ubah {{ pageTitle }}</h3>
        </template>
        <template #body>
          <div v-if="loadingEdit">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.editTernakSakit">
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
          <base-button type="secondary" @click="modal.editTernakSakit = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editTernakSakit">
            <span v-if="!loading">Ubah {{ pageTitle }}</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang mengubah...
            </span>
          </base-button>
        </template>
      </modal-comp>

      <!-- Sembuh Ternak Sakit -->
      <modal-comp
        v-model:show="modal.sembuhTernakSakit"
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
            @click="modal.sembuhTernakSakit = false"
          >
            Tutup
          </base-button>
          <base-button type="primary" @click="sembuhTernakSakit"
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
