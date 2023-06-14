<script>
import { mapActions, mapState } from "pinia";
import d$produksiSusu from "@/stores/lembarkerja/proyeksisusu";
import d$ternak from "@/stores/monitoring/ternak";
import HcLine from "@/components/HighCharts/Line.vue";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

import {
  object as y$object,
  array as y$array,
  string as y$string,
  ref as y$ref,
} from "yup";

export default {
  metaInfo: () => ({
    title: "Proyeksi Produksi Susu",
  }),
  components: {
    HcLine,
  },
  setup() {
    const schema = y$object({
      produksi_pagi: y$string().required().label("Produksi Pagi"),
      produksi_sore: y$string().required().label("Produksi Sore"),
      tanggal_produksi: y$string().required().label("Tanggal Produksi"),
      kualitas: y$string().required().label("Kualitas"),
    });
    return {
      schema,
    };
  },

  data: () => ({
    pageTitle: "Proyeksi Produksi Susu",
    // Input
    input: {
      id_ternak: null,
      produksi_pagi: null,
      produksi_sore: null,
      tanggal_produksi: null,
      kualitas: null,
    },
    // UI
    modal: {
      detailTernak: false,
      addSusu: false,
    },
    loading: false,
    loadingModal: false,
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          name: "bangsa",
          th: "Bangsa",
          render: ({ bangsa }) => (bangsa ? bangsa.bangsa : null),
        },
        {
          th: "Fase",
          render: ({ fase }) => (fase ? fase.fase : null),
        },
        {
          name: "status_perah",
          th: "Status Perah",
        },
      ],
      action: [
        {
          text: "Grafik",
          color: "info",
          event: "grafik-susu",
        },
        {
          text: "Tambah",
          color: "success",
          event: "tambah-susu",
        },
      ],
    },

    dt2: {
      column: [
        {
          name: "tanggal_produksi",
          th: "Tanggal Produksi",
          render: ({ tanggal_produksi }) => `${ubahTanggal(tanggal_produksi)}`,
        },
        {
          name: "produksi_pagi",
          th: "Produksi Pagi",
        },
        {
          name: "produksi_sore",
          th: "Produksi Sore",
        },
        {
          name: "total_harian",
          th: "Total harian",
        },
        {
          name: "kualitas",
          th: "Kualitas",
        },
      ],
    },
    infoTernak: {},
  }),
  computed: {
    ...mapState(d$ternak, [
      "g$ternakList",
      "g$produksiSusu",
      "g$perlakuan",
      "g$produksiSusuTabel",
      "g$statusTernak",
    ]),
    modals() {
      return Object.values(this.modal).includes(true);
    },
    filteredTernakList() {
      return this.g$ternakList.filter(
        (infoTernak) => infoTernak.status_ternak.status_ternak === "Indukan"
      );
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
    this.a$ternakList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$ternak, [
      "a$ternakList",
      "a$perlakuan",
      "a$statusTernak",
      "a$produksiSusuTabel",
      "a$produksiSusuAdd",
    ]),
    clearInput() {
      this.input = {
        id_ternak: null,
        produksi_pagi: null,
        produksi_sore: null,
        tanggal_produksi: null,
        kualitas: null,
      };
    },
    async addSusu() {
      this.loading = true;
      try {
        const {
          id_ternak,
          produksi_pagi,
          produksi_sore,
          tanggal_produksi,
          kualitas,
        } = this.input;
        const data = {
          id_ternak,
          produksi_pagi,
          produksi_sore,
          tanggal_produksi,
          kualitas,
        };
        await this.schema.validate(data);
        const tambahSusu = await this.a$produksiSusuAdd(data);
        this.modal.addSusu = false;
        this.notify(
          `Produksi Susu Ternak dengan ID ${tambahSusu.id_ternak} berhasil ditambahkan`
        );
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$produksiSusuTabel();
      }
      this.loading = false;
    },
    async triggerAddSusu(row) {
      this.modal.addSusu = true;
      const { id_ternak, produksi_pagi, produksi_sore, tanggal_produksi, kualitas } = row;
      this.input = {
        id_ternak,
        produksi_pagi,
        produksi_sore,
        tanggal_produksi,
        kualitas,
      };
      this.loadingModal = false;
    },
    async triggerDetail(row) {
      try {
        this.infoTernak = { ...row };
        this.modal.detailTernak = true;
        console.log(this.infoTernak.id_ternak);
        this.a$produksiSusuTabel(this.infoTernak.id_ternak);
        this.loadingModal = false;
      } catch (error) {}
    },
    ubahTanggal,
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
      <empty-result v-if="!filteredTernakList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="filteredTernakList"
        :columns="dt.column"
        :actions="dt.action"
        @grafik-susu="triggerDetail"
        @tambah-susu="triggerAddSusu"
      />
    </template>

    <template #modal>
      <!-- Modal Detail Ternak -->
      <modal-comp v-model:show="modal.detailTernak" modal-classes="modal-md">
        <template #header>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <h3 class="modal-title">
              Grafik Produksi Susu Ternak Nomor {{ infoTernak.id_ternak }}
            </h3>
          </div>
        </template>
        <template v-if="modal.detailTernak" #body>
          <tabs>
            <tab-pane title="Tabel">
              <template v-if="g$produksiSusuTabel.length > 0">
                <data-table
                  :index="true"
                  :data="g$produksiSusuTabel"
                  :columns="dt2.column"
                />
              </template>
              <template v-else>
                <empty-result :text="'Tabel ' + pageTitle" />
              </template>
            </tab-pane>
            <tab-pane title="Grafik">
              <h3 class="my-4">Grafik Produksi Susu</h3>
              <hc-line
                :height="250"
                :data="g$produksiSusu"
                :data-labels="true"
                :legend="true"
              />
            </tab-pane>
          </tabs>
        </template>
      </modal-comp>

      <modal-comp v-model:show="modal.addSusu" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }} Nomor {{ input.id_ternak }}</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.addSusu" :validation-schema="schema">
              <div class="row">
                <!-- Produksi Pagi -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.produksi_pagi"
                    name="produksi_pagi"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Masukan Banyak Produksi Pagi (Mililiter)"
                      label="Produksi Pagi"
                      type="number"
                      required
                    ></base-input>
                  </field-form>
                </div>

                <!-- Produksi Sore -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.produksi_sore"
                    name="produksi_sore"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Masukan Banyak Produksi Sore (Mililiter)"
                      label="Produksi Sore"
                      type="number"
                      required
                    ></base-input>
                  </field-form>
                </div>

                <!-- Tanggal Produksi -->
                <div class="col-12">
                  <base-input name="tanggal_produksi" label="Tanggal Produksi">
                    <flat-pickr
                      v-model.lazy="input.tanggal_produksi"
                      :config="{
                        mode: 'single',
                        allowInput: true,
                        maxDate: new Date(),
                      }"
                      class="form-control datepicker"
                      placeholder="Pilih Tanggal"
                    />
                  </base-input>
                </div>

                <!-- Kualitas -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.kualitas"
                    type="text"
                    name="kualitas"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="0 - 100"
                      label="Kualitas"
                      required
                    >
                    </base-input>
                  </field-form>
                </div>
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addSusu = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addSusu()">
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
