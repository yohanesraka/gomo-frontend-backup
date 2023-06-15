<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/monitoring/ternak";
import { object as y$object, string as y$string, ref as y$ref } from "yup";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";
import HcAreaSpline from "@/components/HighCharts/AreaSpline.vue";

// In your Vue.js component.

export default {
  metaInfo: () => ({
    title: "Grafik Produksi Susu",
  }),
  components: {
    HcAreaSpline,
  },
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Grafik Prediksi Susu",
    // DataTable
    input: {
      delta_naik: null,
      delta_turun: null,
      target_peternak: null,
    },
    // UI
    modal: {
      addPrediksi: false,
      addTarget: false,
    },
    loading: false,
    loadingModal: false,
    dt: {
      column: [
        {
          name: "tanggal",
          th: "Tanggal Prediksi",
          render: ({ tanggal }) => `${ubahTanggal(tanggal)}`,
        },
        {
          name: "data_literasi",
          th: "Prediksi Produksi Literasi",
          render: ({ data_literasi }) => `${data_literasi} Liter`,
        },
        {
          name: "data_prediksi",
          th: "Target Produksi Peternak",
          render: ({ data_prediksi }) => `${data_prediksi} Liter`,
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$ternak, [
      "g$produksiSusuTotal",
      "g$produksiSusuTotalTabel",
      "g$prediksiSusuTabel",
      "g$prediksiSusuGrafik",
    ]),
  },
  watch: {
    modals(val) {
      if (!val) {
        this.clearInput();
      }
    },
  },
  async mounted() {
    this.a$produksiSusuTotal().catch((error) => this.notify(error, false));
    this.a$prediksiSusuTabel().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$ternak, [
      "a$produksiSusuTotal",
      "a$prediksiSusuTabel",
      "a$prediksiSusuLiterasi",
      "a$prediksiSusuTarget",
    ]),
    async addPrediksiLiterasi() {
      this.loading = true;
      try {
        const { delta_naik, delta_turun } = this.input;
        const data = {
          delta_naik,
          delta_turun,
        };
        await this.schema.validate(data);
        const tambahLiterasi = await this.a$prediksiSusuLiterasi(data);
        this.modal.addSusu = false;
        this.notify(`Prediksi Susu ${tambahLiterasi} berhasil ditambahkan`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$prediksiSusuTabel();
      }
      this.loading = false;
    },
    async addTargetPeternak() {
      this.loading = true;
      try {
        const { target_peternak } = this.input;
        const data = {
          target_peternak,
        };
        await this.schema.validate(data);
        const tambahTarget = await this.a$prediksiSusuTarget(data);
        this.modal.addSusu = false;
        this.notify(`Prediksi Susu ${tambahTarget} berhasil ditambahkan`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$prediksiSusuTabel();
      }
      this.loading = false;
    },
    clearInput() {},
    async triggerPrediksi() {
      try {
        this.modal.addPrediksi = true;
        const { delta_naik, delta_turun } = row;
        this.input = {
          delta_naik,
          delta_turun,
        };
        this.loadingModal = false;
      } catch (error) {}
    },
    async triggerTarget() {
      try {
        this.modal.addTarget = true;
        const { target_peternak } = row;
        this.input = {
          target_peternak,
        };
        this.loadingModal = false;
      } catch (error) {}
    },
  },
  ubahTanggal,
};
</script>

<template>
  <main-layout :title="pageTitle" is-full style="background: transparent">
    <template #header>
      <div class="row">
        <div class="col-sm-8">
          <h1 class="font-weight-bolder text-success">{{ pageTitle }}</h1>
        </div>
        <div class="col-sm-4">
          <div class="row">
            <span class="text-center m-2">
              <router-link to="../data-produksi">
                <base-button type="secondary" class="btn-lg text-dark">
                  Daftar Produksi Susu
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="grafik-produksi">
                <base-button type="secondary" class="btn-lg text-dark">
                  Grafik Produksi
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="prediksi">
                <base-button type="success1" class="btn-lg text-white">
                  Data Prediksi
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="grafik-produksi">
                <base-button type="secondary" class="btn-lg text-dark">
                  Harian
                </base-button>
              </router-link>
            </span>
            <span class="text-center m-2">
              <router-link to="grafik-bulanan">
                <base-button type="secondary" class="btn-lg text-dark">
                  Bulanan (Periode)
                </base-button>
              </router-link>
            </span>
          </div>
        </div>
      </div>
      <div v-if="g$prediksiSusuTabel.length" class="row">
        <div class="col-sm-4">
          <card-comp>
            <div class="row align-items-center">
              <div class="col">
                <h1 class="text-success text-left ls-1 mb-4" style="font-size: 16px">
                  {{ pageTitle }}
                </h1>
              </div>
            </div>
            <hc-area-spline
              :height="200"
              :data="g$prediksiSusuGrafik"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
        </div>
      </div>
      <div class="row ml-1" v-if="g$prediksiSusuTabel.length">
        <h1 class="font-weight-bolder text-success">Daftar {{ pageTitle }}</h1>
      </div>
    </template>

    <template #body>
      <div class="col text-right">
        <base-button type="success" @click="triggerPrediksi">
          <span>Tambah Prediksi</span>
        </base-button>
      </div>
      &nbsp;
      <div class="col text-right">
        <base-button type="success" @click="triggerTarget">
          <span>Tambah Target</span>
        </base-button>
      </div>
      <empty-result v-if="!g$prediksiSusuTabel.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$prediksiSusuTabel" :columns="dt.column" />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addPrediksi" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah Data Prediksi</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.addPrediksi" :validation-schema="schema">
              <div class="row">
                <!-- Delta Naik -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.delta_naik"
                    name="delta_naik"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Masukan Kenaikan Produksi Susu Per-Hari"
                      label="Delta Naik Harian"
                      type="number"
                      required
                    ></base-input>
                  </field-form>
                </div>

                <!-- Delta Turun -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.delta_turun"
                    name="delta_turun"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Masukan Penurunan Produksi Susu Per-Hari"
                      label="Delta Turun Harian"
                      type="number"
                      required
                    ></base-input>
                  </field-form>
                </div>
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addPrediksi = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addPrediksiLiterasi()">
            <span v-if="!loading">Tambah {{ pageTitle }}</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menambahkan...
            </span>
          </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.addTarget" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah Data Prediksi</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.addTarget" :validation-schema="schema">
              <div class="row">
                <!-- Delta Naik -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.target_peternak"
                    name="target_peternak"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Masukan Target Peternak 1 Periode"
                      label="Target Peternak 1 Periode"
                      type="number"
                      required
                    ></base-input>
                  </field-form>
                </div>
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addPrediksi = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addTargetPeternak()">
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
