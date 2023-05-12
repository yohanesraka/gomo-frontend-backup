<script>
import { mapActions, mapState } from "pinia";
import d$penyakit from "@/stores/monitoring/penyakit";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Data Penyakit",
  }),
  setup() {
    const schema = y$object({
      nama_penyakit: y$string().required().label("Nama Penyakit"),
      gejala: y$string().nullable().label("Gejala"),
      penanganan: y$string().nullable().label("Penanganan"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Data Penyakit",
    // Input
    input: {
      id_penyakit: null,
      nama_penyakit: "",
      gejala: "",
      penanganan: "",
    },
    // UI
    modal: {
      addPenyakit: false,
      ubahPenyakit: false,
      confirm: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "nama_penyakit",
          th: "Nama Penyakit",
        },
        {
          name: "gejala",
          th: "Gejala",
        },
        {
          name: "penanganan",
          th: "Penanganan",
        },
      ],
      action: [
        {
          text: "Ubah",
          color: "warning",
          event: "ubah-penyakit",
        },
        {
          text: "Hapus",
          color: "danger",
          event: "hapus-penyakit",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$penyakit, ["g$penyakitList", "g$penyakitDetail"]),
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
    await this.a$penyakitList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$penyakit, [
      "a$penyakitAdd",
      "a$penyakitList",
      "a$penyakitDelete",
      "a$penyakitEdit",
    ]),
    clearInput() {
      this.input = {
        id_penyakit: null,
        nama_penyakit: "",
        gejala: "",
        penanganan: "",
      };
    },
    async addPenyakit() {
      try {
        const { nama_penyakit, gejala, penanganan } = this.input;
        const data = {
          nama_penyakit,
          gejala,
          penanganan,
        };
        await this.schema.validate(data);
        await this.a$penyakitAdd(data);
        this.modal.addPenyakit = false;
        this.notify(`Tambah ${this.pageTitle} Sukses !`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$penyakitList();
      }
    },
    async editPenyakit() {
      try {
        const { id_penyakit, nama_penyakit, gejala, penanganan } = this.input;
        const data = {
          id_penyakit,
          nama_penyakit,
          gejala,
          penanganan,
        };
        await this.schema.validate(data);
        await this.a$penyakitEdit(data);
        this.modal.ubahPenyakit = false;
        this.notify(`Edit ${this.pageTitle} Sukses !`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$penyakitList();
      }
    },
    async delPenyakit() {
      try {
        const { id_penyakit } = this.input;
        const data = {
          id_penyakit,
        };
        await this.a$penyakitDelete(data);
        this.modal.confirm = false;
        this.notify(`Hapus ${this.pageTitle} Sukses !`);
      } catch (error) {
        this.notify(error.message, false);
      } finally {
        this.a$penyakitList();
      }
    },
    async triggerEditModal(row) {
      try {
        const { id_penyakit, nama_penyakit, gejala, penanganan } = row;
        this.input = {
          id_penyakit,
          nama_penyakit,
          gejala,
          penanganan,
        };
        this.modal.ubahPenyakit = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
    async triggerDelete(row) {
      try {
        const { id_penyakit, nama_penyakit } = row;
        this.input = {
          id_penyakit,
          nama_penyakit,
        };
        this.modal.confirm = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <nav class="nav nav-pills flex-column flex-sm-row mb-4">
        <router-link to="/monitoring/data-penyakit" class="nav-item">
          <base-button type="success1" class="btn-lg text-white">
            Data Penyakit
          </base-button>
        </router-link>
        <router-link to="data-penyakit/data-kesehatan" class="nav-item">
          <base-button type="secondary" class="btn-lg text-dark">
            Data Ternak Sakit
          </base-button>
        </router-link>
        <router-link to="data-penyakit/riwayat-kesehatan" class="nav-item">
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
          <base-button type="success" @click="modal.addPenyakit = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$penyakitList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$penyakitList"
        :columns="dt.column"
        :actions="dt.action"
        @ubah-penyakit="triggerEditModal"
        @hapus-penyakit="triggerDelete"
      />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addPenyakit" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addPenyakit" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.nama_penyakit"
                  type="text"
                  name="nama_penyakit"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Nama Penyakit"
                    label="Nama Penyakit"
                    required
                  ></base-input>
                </field-form>
              </div>
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
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addPenyakit = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addPenyakit()">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>

      <!-- Ubah penyakit -->
      <modal-comp v-model:show="modal.ubahPenyakit" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahPenyakit" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.nama_penyakit"
                  type="text"
                  name="nama_penyakit"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Nama Penyakit"
                    required
                  ></base-input>
                </field-form>
              </div>
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
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahPenyakit = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editPenyakit()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>

      <!-- Hapus penyakit -->
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}:
            <strong>{{ input.nama_penyakit }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.confirm = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="delPenyakit()">Hapus</base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
