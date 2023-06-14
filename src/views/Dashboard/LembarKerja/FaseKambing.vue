<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/monitoring/ternak";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";
import Calendar from "@/components/HighCharts/VCalendar.vue";

export default {
  metaInfo: () => ({
    title: "Proyeksi Fase Kambing",
  }),
  components: {
    Calendar,
  },
  data: () => ({
    pageTitle: "Proyeksi Fase Kambing",
    // UI
    modal: {
      detailTernak: false,
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
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-ternak",
        },
      ],
    },
    infoTernak: {},
  }),
  computed: {
    ...mapState(d$ternak, [
      "g$ternakList",
      "g$perlakuan",
      "g$statusTernak",
      "g$byTimbangan",
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
      "a$byTimbangan",
    ]),
    clearInput() {},
    async triggerDetail(row) {
      try {
        this.infoTernak = { ...row };
        this.modal.detailTernak = true;
        this.a$riwayatKesehatan(this.infoTernak.id_ternak);
        this.a$perlakuan(this.infoTernak.id_ternak);
        this.a$byTimbangan(this.infoTernak.id_ternak);
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
        @detail-ternak="triggerDetail"
      />
    </template>

    <template #modal>
      <!-- Modal Detail Ternak -->
      <modal-comp v-model:show="modal.detailTernak" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Detail Ternak Nomor {{ infoTernak.id_ternak }}</h3>
        </template>
        <template v-if="modal.detailTernak" #body>
          <tabs>
            <tab-pane title="Detail">
              <div style="max-height: 450px; overflow-y: auto; overflow-x: hidden">
                <div class="row">
                  <!-- ID Ternak -->
                  <div class="col-5">
                    <span style="font-weight: 600">ID Ternak</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300"> {{ infoTernak.id_ternak }}</span>
                  </div>
                </div>

                <!-- RFID -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">ID Kambing</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300"> {{ infoTernak.rf_id }}</span>
                  </div>
                </div>

                <!-- Bangsa -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Bangsa</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.bangsa ? infoTernak.bangsa.bangsa : "---" }}</span
                    >
                  </div>
                </div>

                <!-- Jenis kelamin -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Jenis Kelamin</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.jenis_kelamin ? infoTernak.jenis_kelamin : "---"
                      }}</span
                    >
                  </div>
                </div>

                <!-- Tanggal lahir -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Tanggal Lahir</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.tanggal_lahir
                          ? ubahTanggal(infoTernak.tanggal_lahir)
                          : "---"
                      }}</span
                    >
                  </div>
                </div>

                <!-- Umur -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Umur</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.umur ?? "---" }}
                    </span>
                  </div>
                </div>

                <!-- ID sire (bapak) -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">ID Sire (Bapak)</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.id_sire ?? "---" }}</span
                    >
                  </div>
                </div>

                <!-- ID dam (ibu) -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">ID Dam (Ibu)</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.id_dam ?? "---" }}</span
                    >
                  </div>
                </div>

                <!-- Kode kandang -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Kode Kandang</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.kandang ? infoTernak.kandang.kode_kandang : "---"
                      }}</span
                    >
                  </div>
                </div>

                <!-- Fase -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Fase Pemeliharaan</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.fase ? infoTernak.fase.fase : "---" }}</span
                    >
                  </div>
                </div>

                <!-- Status -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Status Ternak</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.status_ternak
                          ? infoTernak.status_ternak.status_ternak
                          : "---"
                      }}</span
                    >
                  </div>
                </div>

                <!-- Jenis pakan -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Jenis Pakan</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.kandang
                          ? infoTernak.kandang.jenis_pakan.jenis_pakan
                          : "---"
                      }}</span
                    >
                  </div>
                </div>

                <!-- Berat -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Berat</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.berat ?? "---" }} Kg</span
                    >
                  </div>
                </div>

                <!-- Suhu -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Suhu</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.suhu ?? "---" }} °C</span
                    >
                  </div>
                </div>

                <!-- Status kesehatan -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Status Kesehatan</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.status_kesehatan ?? "---" }}</span
                    >
                  </div>
                </div>

                <!-- Tanggal masuk -->
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Tanggal Masuk</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.tanggal_masuk
                          ? ubahTanggal(infoTernak.tanggal_masuk)
                          : "---"
                      }}</span
                    >
                  </div>
                </div>
              </div>
            </tab-pane>
            <tab-pane title="Kalender">
              <h3 class="my-4">Kalender Proyeksi Ternak</h3>
              <Calendar
                :initialPhase="infoTernak.fase.fase"
                :startDate="infoTernak.updatedAt"
              >
              </Calendar>
            </tab-pane>
          </tabs>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
