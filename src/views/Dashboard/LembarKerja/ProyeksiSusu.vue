<script>
import { mapActions, mapState } from "pinia";
import d$kawin from "@/stores/monitoring/kawin";
import d$dropdown from "@/stores/dropdown";

import { object as y$object, string as y$string, ref as y$ref } from "yup";
import router from "../../../router";

export default {
  metaInfo: () => ({
    title: "Proyeksi Produksi Susu",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Proyeksi Produksi  Susu",
    // Input
    input: {
      id_produksi_susu: null,
      id_ternak: null,
      status:"",
      produksi_pagi: "",
      produksi_sore: "",
      produksi_harian: "",
    },
    // UI
    modal: {
      addProduksi: false,
      ubahProduksi: false,
      confirm: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Ternak"
        },
        {
          name: "bangsa",
          th: "Bangsa",
          render: ({ bangsa }) => (bangsa ? bangsa.bangsa : null),
        },
        {
          name: "status",
          th: "Status",
          render: ({ individuProduksiSore }) => {individuProduksiSore} ,
        },
        {
          name: "produksi_harian",
          th: "Produksi Harian",
          render: ({ individuProduksiHarian }) => {individuProduksiHarian},
        },
        {
          name: "rata_produksi",
          th: "Rata-rata Produksi",
          render: ({rata_produksi}) => {rata_produksi},
        }, 
      ],
      action: [
        {
          text: "Grafik",
          color: "info",
          event: "grafik-produksi",
        }
      ],
    },
  }),
  computed: {
    ...mapState(d$kawin, ["g$produksiList", "g$betina"]),
    ...mapState(d$dropdown, ["g$ddListBetina", "g$ddListPejantan", "g$ddKandang"]),
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
    await this.a$betinaList('').catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    async triggerDetail(row) {
        const { id_ternak } = row;
        router.push({
          name: "Grafik Proyeksi Susu",
          params: {
            id: id_ternak,
          },
        });
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
      <empty-result v-if="!g$betina.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$betina"
        :columns="dt.column"
        :actions="dt.action"
        @grafik-produksi="triggerDetail"
      />
    </template>

    <template #modal>
      <!-- Tambah kawin -->
      <modal-comp v-model:show="modal.addKawin" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addKawin" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <base-input
                  name="tanggal_kawin"
                  class=""
                  placeholder="Pilih tanggal"
                  label="Tanggal Kawin"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_kawin"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="Pilih Tanggal Kawin"
                  />
                </base-input>
              </div>

              <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Indukan" label="ID Indukan" required>
                  <multi-select v-model="input.id_ternak" :options="g$kawinList" label="id_ternak" track-by="id_ternak" placeholder="Pilih/Masukan ID Indukan Betina" :show-labels="false" />
                </base-input>
              </div>
              <!-- Input Pemacek -->
              <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Pemacek" label="ID Pemacek" required>
                  <multi-select v-model="input.id_ternak" :options="g$ddListPejantan" label="name" track-by="id" placeholder="Pilih/Masukan ID Indukan Pejantan" :show-labels="false" />
                </base-input>
              </div>
              <!-- Input kode kandang -->
              <div class="col-12">
                <base-input name="id_kandang" placeholder="ID Kandang" label="ID Kandang" required>
                  <multi-select v-model="input.id_kandang" :options="g$ddKandang" label="name" track-by="id" placeholder="Pilih/Masukan ID Kandang" :show-labels="false" />
                </base-input>
              </div>

            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addKawin = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addKawin()">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>

      <!-- Ubah kawin -->
      <modal-comp v-model:show="modal.ubahKawin" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahKawin" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <base-input
                  name="tanggal_kawin"
                  class=""
                  placeholder="Pilih tanggal"
                  label="Tanggal Kawin"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_kawin"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="Pilih Tanggal Kawin"
                  />
                </base-input>
              </div>
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.id_pemacek"
                  type="text"
                  name="id_pemacek"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Masukan ID Indukan Pejantan"
                    label="ID Pemacek"
                    required
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahKawin = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editKawin()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>

      <!-- Hapus kawin -->
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}:
            <strong>{{ input.id_ternak }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.confirm = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="delKawin()">Hapus</base-button>
        </template>
      </modal-comp>

    </template>
  </main-layout>
</template>