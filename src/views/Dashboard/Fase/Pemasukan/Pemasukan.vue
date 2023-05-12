<script>
import { mapActions, mapState } from "pinia";
import d$pemasukan from "@/stores/fase/pemasukan";
import d$dropdown from "@/stores/dropdown";
import d$daftarkandang from "@/stores/monitoring/daftarkandang";
import d$ternak from "@/stores/monitoring/ternak";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";
import { object as y$object, number as y$number } from "yup";

export default {
  metaInfo: () => ({
    title: "Fase Pemasukan",
  }),
  setup() {
    const schema = y$object({
      cek_poel: y$number().required().min(0).max(6).label("Poel"),
      cek_bcs: y$number().required().min(1).max(5).label("BCS"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Fase Pemasukan",
    //UI
    modal: {
      detailPemasukan: false,
      createPemasukan: false,
    },
    loading: false,
    loadingModal: false,
    // DataTable
    dt: {
      column: [
        {
          th: "Tanggal",
          render: ({ ternak }) => ubahTanggal(ternak.tanggal_masuk),
        },
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          name: "cek_poel",
          th: "Poel",
        },
        {
          name: "cek_mulut",
          th: "Mulut",
        },
        {
          name: "cek_telinga",
          th: "Telinga",
        },
        {
          name: "cek_telinga",
          th: "Kuku Kaki",
        },
        {
          name: "cek_kondisi_fisik_lain",
          th: "Kondisi Fisik",
        },
        {
          name: "cek_bcs",
          th: "BCS",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-pemasukan",
        },
      ],
    },
    infoPemasukan: {},
    input: {
      ternakBaru: null,
      bangsa: null,
      jenis_kelamin: "Betina",
      cek_poel: 0,
      cek_mulut: "Sehat",
      cek_telinga: "Sehat",
      cek_kuku_kaki: "Sehat",
      cek_kondisi_fisik_lain: "Sehat",
      status_ternak: null,
      status_kesehatan: "Sehat",
      cek_bcs: 3,
      kandang: null,
    },
  }),
  computed: {
    ...mapState(d$pemasukan, ["g$pemasukan", "g$ternakBaru"]),
    ...mapState(d$dropdown, ["g$ddbangsa", "g$ddJenisKelamin"]),
    ...mapState(d$daftarkandang, ["g$kandangList"]),
    ...mapState(d$ternak, ["g$statusTernak", "g$bangsa"]),
  },

  async mounted() {
    this.a$pemasukanList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$pemasukan, [
      "a$pemasukanList",
      "a$getTernakBaru",
      "a$createLkPemasukan",
    ]),
    ...mapActions(d$dropdown, ["a$ddBangsa", "a$ddKandang"]),
    ...mapActions(d$daftarkandang, ["a$kandangList"]),
    ...mapActions(d$ternak, ["a$statusTernak", "a$bangsa"]),
    async triggerDetail(row) {
      try {
        this.infoPemasukan = { ...row };
        this.modal.detailPemasukan = true;
      } catch (error) {
      } finally {
        this.a$pemasukanList().catch((error) => this.notify(error, false));
      }
    },
    async triggerCreate() {
      this.modal.createPemasukan = true;
      this.loadingModal = true;
      await this.a$getTernakBaru().catch((error) => this.notify(error, false));
      await this.a$kandangList().catch((error) => this.notify(error, false));
      await this.a$statusTernak().catch((error) => this.notify(error, false));
      await this.a$bangsa().catch((error) => this.notify(error, false));
      this.loadingModal = false;
    },
    async createLkPemasukan() {
      this.loading = true;
      try {
        const {
          ternakBaru,
          bangsa,
          jenis_kelamin,
          cek_poel,
          cek_mulut,
          cek_telinga,
          cek_kuku_kaki,
          cek_kondisi_fisik_lain,
          status_ternak,
          status_kesehatan,
          cek_bcs,
          kandang,
        } = this.input;
        const data = {
          id_ternak: ternakBaru.id_ternak,
          id_bangsa: bangsa.id_bangsa,
          jenis_kelamin,
          cek_poel,
          cek_mulut,
          cek_telinga,
          cek_kuku_kaki,
          cek_kondisi_fisik_lain,
          id_status_ternak: status_ternak.id_status_ternak,
          status_kesehatan,
          cek_bcs,
          id_kandang: kandang.id_kandang,
        };
        await this.schema.validate(data);
        await this.a$createLkPemasukan(data);
        this.modal.createPemasukan = false;
        this.notify(`Berhasil menambahkan data ${this.pageTitle}`, true);
        this.clearInput();
        this.a$pemasukanList().catch((error) => this.notify(error, false));
      } catch (error) {
        this.notify(error, false);
      }
      this.loading = false;
    },
    clearInput() {
      this.input = {
        ternakBaru: null,
        bangsa: null,
        jenis_kelamin: "Betina",
        cek_poel: 0,
        cek_mulut: "Sehat",
        cek_telinga: "Sehat",
        cek_kuku_kaki: "Sehat",
        cek_kondisi_fisik_lain: "Sehat",
        status_ternak: null,
        status_kesehatan: "Sehat",
        cek_bcs: 3,
        kandang: null,
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
            <router-link to="../pemasukan">
              <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-pemasukan">
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
      <div class="row align-items-center mt-3">
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
      <empty-result v-if="!g$pemasukan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$pemasukan"
        :columns="dt.column"
        :actions="dt.action"
        @detail-pemasukan="triggerDetail"
      />
    </template>

    <template #modal>
      <!-- detail pemasukan -->
      <modal-comp v-model:show="modal.detailPemasukan" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">
            Detail {{ pageTitle }} Nomor {{ infoPemasukan.id_ternak }}
          </h3>
        </template>
        <template v-if="modal.detailPemasukan" #body>
          <div style="max-height: 450px; overflow-y: auto; overflow-x: hidden">
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">ID Ternak</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.id_ternak }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Bangsa</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.bangsa.bangsa }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Jenis Kelamin</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.jenis_kelamin }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Cek Poel</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_poel }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600"> Cek Mulut</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_mulut }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Cek Telinga</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_telinga }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Cek Kuku Kaki</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_kuku_kaki }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Cek Kondisi Fisik Lain</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_kondisi_fisik_lain }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Cek BCS</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_bcs }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Status</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.status_ternak.status_ternak }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Status Kesehatan</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.status_kesehatan }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Kode Kandang</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.kandang.kode_kandang }}</span
                >
              </div>
            </div>
          </div>
        </template>
      </modal-comp>

      <!-- Create LK pemasukan -->
      <modal-comp v-model:show="modal.createPemasukan" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.createPemasukan" :validation-schema="schema">
              <div class="row">
                <!-- ID Ternak -->
                <div class="col-6">
                  <base-input name="id_ternak" label="ID Ternak" required>
                    <multi-select
                      v-model="input.ternakBaru"
                      :options="g$ternakBaru"
                      track-by="id_ternak"
                      label="id_ternak"
                      placeholder="Pilih ID Ternak"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- Bangsa -->
                <div class="col-6">
                  <base-input name="bangsa" label="Bangsa" required>
                    <multi-select
                      v-model="input.bangsa"
                      :options="g$bangsa"
                      label="bangsa"
                      track-by="id_bangsa"
                      placeholder="Pilih bangsa"
                      :show-labels="false"
                      :preselectFirst="true"
                    />
                  </base-input>
                </div>

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
                    />
                  </base-input>
                </div>

                <!-- Jenis kelamin -->
                <div class="col-6">
                  <base-input
                    name="jenis_kelamin"
                    placeholder="Jenis Kelamin"
                    label="Jenis Kelamin"
                    required
                  >
                    <multi-select
                      v-model="input.jenis_kelamin"
                      :options="g$ddJenisKelamin"
                      placeholder="Pilih Jenis Kelamin"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- Status ternak -->
                <div class="col-6">
                  <base-input
                    name="status_ternak"
                    label="Status Ternak"
                    required
                  >
                    <multi-select
                      v-model="input.status_ternak"
                      :options="g$statusTernak"
                      label="status_ternak"
                      track-by="id_status_ternak"
                      placeholder="Pilih status ternak"
                      :show-labels="false"
                      :preselectFirst="true"
                    />
                  </base-input>
                </div>

                <!-- Status kesehatan -->
                <div class="col-6">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.status_kesehatan"
                    name="status_kesehatan"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Status kesehatan"
                      label="Status Kesehatan"
                      type="text"
                      required
                    >
                    </base-input>
                  </field-form>
                </div>

                <!-- Cek bcs -->
                <div class="col-6">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.cek_bcs"
                    name="cek_bcs"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Kondisi bcs"
                      label="Cek BCS"
                      type="number"
                      required
                    ></base-input>
                  </field-form>
                </div>

                <!-- Cek poel -->
                <div class="col-6">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.cek_poel"
                    name="cek_poel"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Jumlah poel"
                      label="Cek Poel"
                      type="number"
                      required
                    ></base-input>
                  </field-form>
                </div>

                <!-- Cek mulut -->
                <div class="col-6">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.cek_mulut"
                    name="cek_mulut"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Kondisi mulut"
                      label="Cek Mulut"
                      type="text"
                      required
                    ></base-input>
                  </field-form>
                </div>

                <!-- Cek telinga -->
                <div class="col-6">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.cek_telinga"
                    name="cek_telinga"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Kondisi telinga"
                      label="Cek Telinga"
                      type="text"
                      required
                    >
                    </base-input>
                  </field-form>
                </div>

                <!-- Cek kuku kaki -->
                <div class="col-6">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.cek_kuku_kaki"
                    name="cek_kuku_kaki"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Kondisi kuku kai"
                      label="Cek Kuku Kaki"
                      type="text"
                      required
                    >
                    </base-input>
                  </field-form>
                </div>

                <!-- Cek kondisi fisik lain -->
                <div class="col-6">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.cek_kondisi_fisik_lain"
                    name="cek_kondisi_fisik_lain"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Kondisi fisik lain"
                      label="Cek Kondisi Fisik Lain"
                      type="text"
                      required
                    ></base-input>
                  </field-form>
                </div>
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.createPemasukan = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="createLkPemasukan">
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
