<script>
import { mapActions, mapState } from "pinia";
import d$daftarkandang from "@/stores/monitoring/daftarkandang";

import { object as y$object, string as y$string, ref as y$ref } from "yup";
import router from "../../../router";
import d$dropdown from "@/stores/dropdown";

export default {
  metaInfo: () => ({
    title: "Data Kandang",
  }),
  setup() {
    const schema = y$object({
      kode_kandang: y$string().required().label("Jenis Kandang"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Data Kandang",
    // Input
    input: {
      id_kandang: null,
      kode_kandang: "",
      jenis_kandang: "",
      jenis_pakan: "",
      persentase_kebutuhan_pakan: 5,
    },
    // UI
    modal: {
      addKandang: false,
      ubahKandang: false,
      confirm: false,
    },
    loading: false,
    loadingModal: false,
    // DataTable
    dt: {
      column: [
        {
          name: "kode_kandang",
          th: "Kode Kandang",
        },
        {
          name: "jeniskandang",
          th: "Jenis Kandang",
          render: ({ jenis_kandang }) =>
            jenis_kandang ? jenis_kandang.jenis_kandang : "-",
        },
        {
          name: "populasi",
          th: "Jumlah Populasi Ternak",
        },
        {
          name: "jenispakan",
          th: "Jenis Pakan",
          render: ({ jenis_pakan }) =>
            jenis_pakan ? jenis_pakan.jenis_pakan : null,
        },
        {
          name: "kebutuhan_pakan",
          th: "Kebutuhan Pakan (kg)",
          render: ({ kebutuhan_pakan }) => kebutuhan_pakan.toFixed(2) + " Kg",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-kandang",
        },
        {
          text: "Ubah",
          color: "warning",
          event: "ubah-kandang",
        },
        {
          text: "Hapus",
          color: "danger",
          event: "hapus-kandang",
        },
      ],
    },
    totalKandang: 0,
  }),
  computed: {
    ...mapState(d$daftarkandang, ["g$kandangList", "g$totalKandang"]),
    ...mapState(d$dropdown, ["g$ddJenisKandang", "g$ddListJenisPakan"]),
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
    this.a$kandangList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$daftarkandang, [
      "a$kandangAdd",
      "a$kandangList",
      "a$kandangDelete",
      "a$kandangEdit",
    ]),
    ...mapActions(d$dropdown, ["a$ddListJenisPakan", "a$ddJenisKandang"]),
    clearInput() {
      this.input = {
        id_kandang: null,
        kode_kandang: "",
      };
    },

    //tambah kandang
    async addKandang() {
      this.loading = true;
      try {
        const {
          kode_kandang,
          jenis_kandang,
          jenis_pakan,
          persentase_kebutuhan_pakan,
        } = this.input;
        const data = {
          kode_kandang,
          id_jenis_kandang: jenis_kandang.id,
          id_jenis_pakan: jenis_pakan.id,
          persentase_kebutuhan_pakan,
        };
        await this.schema.validate(data);
        await this.a$kandangAdd(data);
        this.modal.addKandang = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kandangList();
      }
      this.loading = false;
    },

    //ubah kandang
    async editKandang() {
      this.loading = true;
      try {
        const {
          id_kandang,
          kode_kandang,
          jenis_kandang,
          jenis_pakan,
          persentase_kebutuhan_pakan,
        } = this.input;
        const data = {
          id_kandang,
          kode_kandang,
          id_jenis_kandang: jenis_kandang.id,
          id_jenis_pakan: jenis_pakan.id,
          persentase_kebutuhan_pakan,
        };
        await this.schema.validate(data);
        await this.a$kandangEdit(data);
        this.modal.ubahKandang = false;
        this.notify(`Edit ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kandangList();
      }
      this.loading = false;
    },

    //hapus kandang
    async delKandang() {
      this.loading = true;
      try {
        const { id_kandang } = this.input;
        const data = {
          id_kandang,
        };
        await this.a$kandangDelete(data);
        this.modal.confirm = false;
        this.notify(`Hapus ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kandangList();
      }
      this.loading = false;
    },

    async triggerCreate() {
      this.modal.addKandang = true;
      this.loadingModal = true;
      await this.a$ddListJenisPakan("").catch((error) =>
        this.notify(error, false)
      );
      await this.a$ddJenisKandang().catch((error) => this.notify(error, false));
      this.loadingModal = false;
    },

    async triggerEditModal(row) {
      this.modal.ubahKandang = true;
      this.loadingModal = true;
      await this.a$ddListJenisPakan("").catch((error) =>
        this.notify(error, false)
      );
      await this.a$ddJenisKandang().catch((error) => this.notify(error, false));
      try {
        const {
          id_kandang,
          kode_kandang,
          jenis_kandang,
          jenis_pakan,
          persentase_kebutuhan_pakan,
        } = row;
        this.input = {
          id_kandang,
          kode_kandang,
          jenis_kandang: {
            id: jenis_kandang ? jenis_kandang.id_jenis_kandang : null,
            name: jenis_kandang ? jenis_kandang.jenis_kandang : null,
          },
          jenis_pakan: {
            id: jenis_pakan ? jenis_pakan.id_jenis_pakan : null,
            name: jenis_pakan ? jenis_pakan.jenis_pakan : null,
          },
          persentase_kebutuhan_pakan,
        };
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
      this.loadingModal = false;
    },

    async triggerDelete(row) {
      try {
        const { id_kandang, kode_kandang } = row;
        this.input = {
          id_kandang,
          kode_kandang,
        };
        this.modal.confirm = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },

    async triggerDetail(row) {
      try {
        const { id_kandang } = row;
        router.push({
          name: "Detail Kandang",
          params: {
            id: id_kandang,
          },
        });
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
      <div class="row align-items-center">
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
      <empty-result v-if="!g$kandangList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$kandangList"
        :columns="dt.column"
        :actions="dt.action"
        @ubah-kandang="triggerEditModal"
        @hapus-kandang="triggerDelete"
        @detail-kandang="triggerDetail"
      />
    </template>

    <template #modal>
      <!-- Tambah kandang -->
      <modal-comp v-model:show="modal.addKandang" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.addKandang" :validation-schema="schema">
              <div class="row">
                <!-- Kode kandang -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.kode_kandang"
                    type="text"
                    name="kode_kandang"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Kode Kandang"
                      label="Kode Kandang"
                      required
                    ></base-input>
                  </field-form>
                </div>

                <!-- Jenis Kandang -->
                <div class="col-12">
                  <base-input
                    name="jeniskandang"
                    placeholder="Jenis Kandang"
                    label="Jenis Kandang"
                    required
                  >
                    <multi-select
                      v-model="input.jenis_kandang"
                      :options="g$ddJenisKandang"
                      label="name"
                      track-by="id"
                      placeholder="Pilih Jenis Kandang"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- jenis pakan -->
                <div class="col-12">
                  <base-input
                    name="jenispakan"
                    placeholder="Jenis Pakan"
                    label="Jenis Pakan"
                    required
                  >
                    <multi-select
                      v-model="input.jenis_pakan"
                      :options="g$ddListJenisPakan"
                      label="name"
                      track-by="id"
                      placeholder="Pilih Jenis Pakan"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- persentase kebutuhan pakan -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.persentase_kebutuhan_pakan"
                    name="persentase_kebutuhan_pakan"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Masukkan persentase kebutuhan pakan kandang "
                      label="Persentase Kebutuhan Pakan (%)"
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
          <base-button type="secondary" @click="modal.addKandang = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addKandang()">
            <span v-if="!loading">Tambah {{ pageTitle }}</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menambahkan...
            </span>
          </base-button>
        </template>
      </modal-comp>

      <!-- Ubah kandang -->
      <modal-comp v-model:show="modal.ubahKandang" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.ubahKandang" :validation-schema="schema">
              <div class="row">
                <!-- Kode kandang -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.kode_kandang"
                    type="text"
                    name="kode_kandang"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Kode Kandang"
                      label="Kode Kandang"
                      required
                    ></base-input>
                  </field-form>
                </div>

                <!-- Jenis kandang -->
                <div class="col-12">
                  <base-input
                    name="jeniskandang"
                    placeholder="Jenis Kandang"
                    label="Jenis Kandang"
                    required
                  >
                    <multi-select
                      v-model="input.jenis_kandang"
                      :options="g$ddJenisKandang"
                      label="name"
                      track-by="id"
                      placeholder="Pilih Jenis Kandang"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- jenis pakan -->
                <div class="col-12">
                  <base-input
                    name="jenispakan"
                    placeholder="Jenis Pakan"
                    label="Jenis Pakan"
                    required
                  >
                    <multi-select
                      v-model="input.jenis_pakan"
                      :options="g$ddListJenisPakan"
                      label="name"
                      track-by="id"
                      placeholder="Pilih Jenis Pakan"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- persentase kebutuhan pakan -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.persentase_kebutuhan_pakan"
                    name="persentase_kebutuhan_pakan"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Masukkan persentase kebutuhan pakan kandang "
                      label="Persentase Kebutuhan Pakan (%)"
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
          <base-button type="secondary" @click="modal.ubahKandang = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editKandang()">
            <span v-if="!loading">Simpan perubahan</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menyimpan...
            </span>
          </base-button>
        </template>
      </modal-comp>

      <!-- Hapus kandang -->
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}:
            <strong>{{ input.kode_kandang }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.confirm = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="delKandang()"
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
