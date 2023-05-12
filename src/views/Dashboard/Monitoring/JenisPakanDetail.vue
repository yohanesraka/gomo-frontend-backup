<script>
import { mapActions, mapState } from "pinia";
import d$pakan from "@/stores/monitoring/pakan";
import d$dropdown from "@/stores/dropdown";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Detail Data Pakan",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Detail Pakan",
    // Input
    input: {
      id: null,
      status: null,
      tanggal_pembuatan: null,
      tanggal_konsumsi: null,
    },
    // UI
    modal: {
      addDetailPakan: false,
      kosongkanModal: false,
      isiModal: false,
      ubahModal: false,
      hapusModal: false,
    },
    loading: false,
    // DataTable
    dt: {
      column: [
        {
          name: "id",
          th: "ID",
        },
        {
          name: "status",
          th: "Status",
        },
        {
          name: "tanggal_pembuatan",
          th: "Tanggal Pembuatan",
          render: ({ tanggal_pembuatan }) =>
            tanggal_pembuatan ? ubahTanggal(tanggal_pembuatan) : null,
        },
        {
          name: "tanggal_konsumsi",
          th: "Tanggal Konsumsi",
          render: ({ tanggal_konsumsi }) =>
            tanggal_konsumsi ? ubahTanggal(tanggal_konsumsi) : null,
        },
      ],
      action: [
        {
          text: "Isi",
          color: "primary",
          event: "isi-pakan",
          show: ({ tanggal_pembuatan }) => !tanggal_pembuatan,
        },
        {
          text: "Kosongkan",
          color: "primary",
          event: "kosongkan-pakan",
          show: ({ tanggal_pembuatan }) => tanggal_pembuatan,
        },
        {
          text: "Ubah",
          color: "warning",
          event: "ubah-pakan",
        },
        {
          text: "Hapus",
          color: "danger",
          event: "hapus-pakan",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$pakan, ["g$detailPakan", "g$detailName"]),
    ...mapState(d$dropdown, ["g$ddKeteranganDetailPakan", "g$ddSatuanPakan"]),
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
    await this.a$pakanList(`?id_jenis_pakan=${this.$route.params.id}`).catch(
      (error) => this.notify(error, false)
    );
    await this.a$pakanDetail(this.$route.params.id).catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$pakan, [
      "a$pakanDetail",
      "a$pakanList",
      "a$tambahPakan",
      "a$kosongkanPakan",
      "a$isiPakan",
      "a$ubahPakan",
      "a$deletePakan",
    ]),
    clearInput() {
      this.input = {
        id: null,
      };
    },

    async addDetailPakan() {
      this.loading = true;
      try {
        const id_jenis_pakan = this.$route.params.id;
        const { id } = this.input;
        const data = {
          id_jenis_pakan,
          id,
        };
        await this.a$tambahPakan(data).catch((error) =>
          this.notify(error, false)
        );
        await this.a$pakanDetail(this.$route.params.id).catch((error) =>
          this.notify(error, false)
        );
        this.modal.addDetailPakan = false;
        this.notify("Berhasil menambahkan data", true);
      } catch (error) {
        this.notify(error, false);
      }
      this.loading = false;
    },

    async triggerKosongkan(row) {
      try {
        this.input = { ...row };
        this.modal.kosongkanModal = true;
      } catch (error) {}
    },
    async triggerIsi(row) {
      try {
        this.input = { ...row };
        this.modal.isiModal = true;
      } catch (error) {}
    },
    async triggerUbah(row) {
      try {
        this.input = { ...row };
        this.modal.ubahModal = true;
      } catch (error) {}
    },
    async triggerHapus(row) {
      try {
        this.input = { ...row };
        this.modal.hapusModal = true;
      } catch (error) {}
    },
    async kosongkanPakan() {
      this.loading = true;
      try {
        const { id_pakan } = this.input;
        const data = {
          id_pakan,
        };
        await this.a$kosongkanPakan(data).catch((error) =>
          this.notify(error, false)
        );
        await this.a$pakanDetail(this.$route.params.id).catch((error) =>
          this.notify(error, false)
        );
        this.modal.kosongkanModal = false;
        this.notify("Berhasil mengosongkan pakan", true);
      } catch (error) {}
      this.loading = false;
    },
    async isiPakan() {
      this.loading = true;
      try {
        const { id_pakan } = this.input;
        const data = {
          id_pakan,
          tanggal_pembuatan: null,
          tanggal_konsumsi: null,
        };
        await this.a$isiPakan(data).catch((error) => this.notify(error, false));
        await this.a$pakanDetail(this.$route.params.id).catch((error) =>
          this.notify(error, false)
        );
        this.modal.isiModal = false;
        this.notify("Berhasil mengisi pakan", true);
      } catch (error) {}
      this.loading = false;
    },

    async ubahPakan() {
      this.loading = true;
      try {
        const { id_pakan, tanggal_pembuatan, tanggal_konsumsi } = this.input;
        const data = {
          id_pakan,
          tanggal_pembuatan,
          tanggal_konsumsi,
        };
        await this.a$ubahPakan(data).catch((error) =>
          this.notify(error, false)
        );
        await this.a$pakanDetail(this.$route.params.id).catch((error) =>
          this.notify(error, false)
        );
        this.modal.ubahModal = false;
        this.notify("Berhasil mengubah pakan", true);
      } catch (error) {}
      this.loading = false;
    },

    async hapusPakan() {
      this.loading = true;
      try {
        const { id_pakan } = this.input;
        const data = {
          id_pakan,
        };
        await this.a$deletePakan(data).catch((error) =>
          this.notify(error, false)
        );
        await this.a$pakanDetail(this.$route.params.id).catch((error) =>
          this.notify(error, false)
        );
        this.modal.hapusModal = false;
        this.notify("Berhasil menghapus pakan", true);
      } catch (error) {}
      this.loading = false;
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle + ' ' + g$detailName" disable-padding>
    <template #header>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>

        <!-- Tambah detail pakan -->
        <div class="col text-right">
          <base-button type="success" @click="modal.addDetailPakan = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$detailPakan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$detailPakan"
        :columns="dt.column"
        :actions="dt.action"
        @isi-pakan="triggerIsi"
        @kosongkan-pakan="triggerKosongkan"
        @ubah-pakan="triggerUbah"
        @hapus-pakan="triggerHapus"
      />
    </template>

    <template #modal>
      <!-- Tambah detail pakan -->
      <modal-comp v-model:show="modal.addDetailPakan" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addDetailPakan" :validation-schema="schema">
            <div class="row">
              <!-- ID -->
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.id"
                  type="number"
                  name="id"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Masukan ID"
                    label="ID"
                    required
                  />
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addDetailPakan = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addDetailPakan()">
            <span v-if="!loading">Tambah {{ pageTitle }}</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menambahkan...
            </span>
          </base-button>
        </template>
      </modal-comp>

      <!-- Kosongkan pakan -->
      <modal-comp v-model:show="modal.kosongkanModal" modal-classes="modal-sm">
        <template #header>
          <h3 class="modal-title">Kosongkan {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin mengosongkan {{ pageTitle }}:
            <strong>{{ input.id }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.kosongkanModal = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="kosongkanPakan"
            ><span v-if="!loading">Kosongkan</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang mengosongkan...
            </span></base-button
          >
        </template>
      </modal-comp>

      <!-- Isi pakan -->
      <modal-comp v-model:show="modal.isiModal" modal-classes="modal-sm">
        <template #header>
          <h3 class="modal-title">Isi {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin mengisi {{ pageTitle }}:
            <strong>{{ input.id }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.isiModal = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="isiPakan"
            ><span v-if="!loading">Isi</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang mengisi...
            </span></base-button
          >
        </template>
      </modal-comp>

      <!-- Ubah pakan -->
      <modal-comp v-model:show="modal.ubahModal" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Ubah {{ pageTitle }} {{ input.id }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahModal" :validation-schema="schema">
            <div class="row">
              <!-- Tanggal pembuatan -->
              <div class="col-12">
                <base-input
                  name="tanggal"
                  class=""
                  placeholder="Tanggal Pembuatan"
                  label="Tanggal Pembuatan"
                  required
                >
                  <flat-pickr
                    v-model="input.tanggal_pembuatan"
                    :config="{
                      mode: 'single',
                      allowInput: true,
                      maxDate: new Date(),
                    }"
                    class="form-control datepicker"
                    placeholder="Pilih Tanggal Pembuatan"
                  />
                </base-input>
              </div>

              <!-- Tanggal konsumsi -->
              <div class="col-12">
                <base-input
                  name="tanggal"
                  class=""
                  placeholder="Tanggal Konsumsi"
                  label="Tanggal Konsumsi"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_konsumsi"
                    :config="{
                      mode: 'single',
                      allowInput: true,
                      minDate: this.input.tanggal_pembuatan,
                    }"
                    class="form-control datepicker"
                    placeholder="Pilih Tanggal Konsumsi"
                  />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahPakan = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="ubahPakan">
            <span v-if="!loading">Simpan perubahan</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menyimpan...
            </span>
          </base-button>
        </template>
      </modal-comp>

      <!-- Hapus pakan -->
      <modal-comp v-model:show="modal.hapusModal" modal-classes="modal-sm">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}:
            <strong>{{ input.id }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.hapusModal = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="hapusPakan"
            ><span v-if="!loading">Hapus</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menghapus...
            </span></base-button
          >
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
