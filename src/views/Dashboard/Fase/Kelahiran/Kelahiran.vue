<script>
import { mapActions, mapState } from "pinia";
import d$kelahiran from "@/stores/fase/kelahiran";
import d$dropdown from "@/stores/dropdown";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Fase Kelahiran",
  }),
  data: () => ({
    pageTitle: "Fase Kelahiran",
    input: {
      id_ternak: null,
      tanggal_lahir: null,
      jenis_kelamin: null,
      tanggal_masuk: null,
      id_dam: null,
      id_sire: null,
      kandang: null,
      bangsa: null,
    },
    //UI
    modal: {
      createKelahiran: false,
    },
    loading: false,
    loadingModal: false,
    // DataTable
    dt: {
      column: [
        {
          th: "Tanggal Masuk",
          render: ({ tanggal_masuk }) => ubahTanggal(tanggal_masuk),
        },
        {
          name: "id_sire",
          th: "ID Sire(Bapak)",
        },
        {
          name: "id_dam",
          th: "ID Dam(Ibu)",
        },
        {
          name: "id_ternak",
          th: "ID Cempe",
        },
        {
          name: "jenis_kelamin",
          th: "Jenis Kelamin Cempe",
        },
        {
          name: "bangsa",
          th: "Bangsa",
        },
        {
          th: "Tanggal Lahir",
          render: ({ tanggal_lahir }) => ubahTanggal(tanggal_lahir),
        },
        {
          name: "kode_kandang",
          th: "Kode Kandang",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kelahiran, [
      "g$kelahiran",
      "g$listIndukan",
      "g$listPejantan",
      "g$listCempeBaru",
    ]),
    ...mapState(d$dropdown, ["g$ddBangsa", "g$ddJenisKelamin", "g$ddKandang"]),
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
    await this.a$kelahiranList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kelahiran, [
      "a$kelahiranList",
      "a$listIndukan",
      "a$listPejantan",
      "a$listCempeBaru",
      "a$kelahiranCreate",
    ]),
    ...mapActions(d$dropdown, ["a$ddBangsa", "a$ddKandang"]),
    clearInput() {
      this.input = {
        id_ternak: null,
        tanggal_lahir: null,
        jenis_kelamin: null,
        tanggal_masuk: null,
        id_dam: null,
        id_sire: null,
        kandang: null,
        bangsa: null,
      };
    },

    async triggerCreateKelahiran() {
      this.loadingModal = true;
      this.modal.createKelahiran = true;
      await this.a$listCempeBaru().catch((error) => this.notify(error, false));
      await this.a$ddBangsa().catch((error) => this.notify(error, false));
      await this.a$listIndukan().catch((error) => this.notify(error, false));
      await this.a$listPejantan().catch((error) => this.notify(error, false));
      await this.a$ddKandang().catch((error) => this.notify(error, false));
      this.loadingModal = false;
    },

    async createKelahiran() {
      this.loading = true;
      try {
        const {
          id_ternak,
          tanggal_lahir,
          jenis_kelamin,
          tanggal_masuk,
          id_dam,
          id_sire,
          kandang,
          bangsa,
        } = this.input;
        const data = {
          id_ternak: id_ternak.id_ternak,
          tanggal_masuk,
          tanggal_lahir,
          id_sire: id_sire.id_ternak,
          id_dam: id_dam.id_ternak,
          jenis_kelamin,
          id_bangsa: bangsa.id,
          id_kandang: kandang.id,
        };
        await this.a$kelahiranCreate(data);
        this.notify("Data berhasil ditambahkan", true);
        this.modal.createKelahiran = false;
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kelahiranList();
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
            <router-link to="../kelahiran">
              <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-kelahiran">
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
        <div class="col text-right">
          <base-button type="success" @click="triggerCreateKelahiran">
            <span>Tambah {{ pageTitle }}</span>
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kelahiran.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$kelahiran"
        :columns="dt.column"
      />
    </template>

    <template #modal>
      <!-- Create Kelahiran -->
      <modal-comp v-model:show="modal.createKelahiran" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.createKelahiran">
              <div class="row">
                <!-- id_ternak -->
                <div class="col-6">
                  <base-input name="id_ternak" label="ID Cempe" required>
                    <multi-select
                      v-model="input.id_ternak"
                      :options="g$listCempeBaru"
                      label="id_ternak"
                      track-by="id_ternak"
                      placeholder="Pilih ID Cempe"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- Jenis kelamin -->
                <div class="col-6">
                  <base-input
                    name="jenis_kelamin"
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

                <!-- Tanggal masuk -->
                <div class="col-6">
                  <base-input
                    name="tanggal_masuk"
                    label="Tanggal Masuk"
                    required
                  >
                    <flat-pickr
                      v-model="input.tanggal_masuk"
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

                <!-- Tanggal lahir -->
                <div class="col-6">
                  <base-input
                    name="tanggal_lahir"
                    label="Tanggal Lahir"
                    required
                  >
                    <flat-pickr
                      v-model.lazy="input.tanggal_lahir"
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

                <!-- id_indukan -->
                <div class="col-6">
                  <base-input name="id_indukan" label="ID Dam (Ibu)" required>
                    <multi-select
                      v-model="input.id_dam"
                      :options="g$listIndukan"
                      label="id_ternak"
                      track-by="id_ternak"
                      placeholder="Pilih ID dam (ibu)"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- id_pejantan -->
                <div class="col-6">
                  <base-input
                    name="id_pejantan"
                    label="ID Sire (bapak)"
                    required
                  >
                    <multi-select
                      v-model="input.id_sire"
                      :options="g$listPejantan"
                      label="id_ternak"
                      track-by="id_ternak"
                      placeholder="Pilih ID sire (bapak)"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- Bangsa -->
                <div class="col-6">
                  <base-input name="bangsa" label="Bangsa" required>
                    <multi-select
                      v-model="input.bangsa"
                      :options="g$ddBangsa"
                      label="name"
                      track-by="id"
                      placeholder="Pilih bangsa"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- Kandang -->
                <div class="col-6">
                  <base-input name="kandang" label="Kandang" required>
                    <multi-select
                      v-model="input.kandang"
                      :options="g$ddKandang"
                      label="name"
                      track-by="id"
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
          <base-button type="secondary" @click="modal.createKelahiran = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="createKelahiran">
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
