<script>
import { mapActions, mapState } from "pinia";
import d$kesehatan from "@/stores/monitoring/kesehatan";
import d$kandang from "@/stores/monitoring/daftarkandang";
import d$dropdown from "@/stores/dropdown";
import d$ternak from "@/stores/monitoring/ternak";
import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Data Kesehatan",
  }),
  setup() {
    const schema = y$object({
      id_ternak: y$string().required().label("ID Ternak"),
      nama_penyakit: y$string().required().label("Nama Penyakit"),
      tgl_skit: y$string().required().label("Tanggal Sakit"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Ternak Sakit",
    // Input
    input: {
      ternak: null,
      penyakit: null,
      tanggal_sakit: "",
      kandang: null,
    },
    // UI
    modal: {
      addTernakSakit: false,
      editTernakSakit: false,
    },
    loading: false,
    loadingModal: false,
    // DataTable
    dt: {
      column: [
        {
          name: "nama_penyakit",
          th: "Nama Penyakit",
        },
        {
          name: "total",
          th: "Jumlah Ternak Sakit",
        },
      ],
      action: [
        {
          text: "Lihat Ternak Sakit",
          color: "info",
          event: "detail-kesehatan",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kesehatan, [
      "g$kesehatanList",
      "g$kesehatanDetail",
      "g$penyakitDetail",
      "g$totalSakit",
    ]),
    ...mapState(d$dropdown, ["g$ddListPenyakit", "g$ddKandang"]),
    ...mapState(d$ternak, ["g$ternakList"]),
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
    await this.a$kesehatanList().catch((error) => this.notify(error, false));
    await this.a$totalSakit().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kesehatan, [
      "a$kesehatanAdd",
      "a$kesehatanList",
      "a$totalSakit",
    ]),
    ...mapActions(d$dropdown, ["a$ddListPenyakit", "a$ddKandang"]),
    ...mapActions(d$kandang, ["a$kandangList"]),
    clearInput() {
      this.input = {
        id: null,
      };
    },
    ...mapActions(d$ternak, ["a$ternakList"]),

    async triggerAddTernakSakit() {
      this.modal.addTernakSakit = true;
      this.loadingModal = true;
      await this.a$ternakList().catch((error) => this.notify(error, false));
      await this.a$ddListPenyakit().catch((error) => this.notify(error, false));
      await this.a$kandangList().catch((error) => this.notify(error, false));
      this.loadingModal = false;
    },
    async triggerDetail(row) {
      const { id_penyakit } = row;
      this.$router.push({
        name: "Detail Ternak Sakit",
        params: {
          id: id_penyakit,
        },
      });
    },
    async addTernakSakit() {
      this.loading = true;
      try {
        const { ternak, penyakit, tanggal_sakit, kandang } = this.input;
        const data = {
          id_ternak: ternak.id_ternak,
          id_penyakit: penyakit.id,
          tanggal_sakit,
          id_kandang: kandang.id_kandang,
        };
        await this.a$kesehatanAdd(data);
        this.modal.addTernakSakit = false;
        this.notify(`Tambah ${this.pageTitle} berhasil`);
        await this.a$totalSakit().catch((error) => this.notify(error, false));
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
      <nav class="nav nav-pills flex-column flex-sm-row mb-4">
        <router-link to="../data-penyakit" class="nav-item">
          <base-button type="secondary" class="btn-lg text-dark">
            Data Penyakit
          </base-button>
        </router-link>
        <router-link to="data-kesehatan" class="nav-item">
          <base-button type="success1" class="btn-lg text-white">
            Data Ternak Sakit
          </base-button>
        </router-link>
        <router-link to="riwayat-kesehatan" class="nav-item">
          <base-button type="secondary" class="btn-lg text-dark">
            Riwayat Ternak Sakit
          </base-button>
        </router-link>
      </nav>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="triggerAddTernakSakit">
            <span>Tambah {{ pageTitle }}</span>
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$totalSakit.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$totalSakit"
        :columns="dt.column"
        :actions="dt.action"
        @detail-kesehatan="triggerDetail"
      />
    </template>
    <template #modal>
      <!-- Tambah ternak sakit -->
      <modal-comp v-model:show="modal.addTernakSakit" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.addTernakSakit" :validation-schema="schema">
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
                      :options="g$ddListPenyakit"
                      label="name"
                      track-by="id"
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
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addTernakSakit = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addTernakSakit">
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
