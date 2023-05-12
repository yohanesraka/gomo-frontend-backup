<script>
import { mapActions, mapState } from "pinia";
import d$kawin from "@/stores/monitoring/kawin";
import d$dropdown from "@/stores/dropdown";
import { object as y$object, string as y$string, ref as y$ref } from "yup";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Riwayat Kawin",
  }),
  setup() {
    const schema = y$object({
      // id_ternak: y$string().required().label("ID Dam (Ibu)"),
      tanggal_kawin: y$string().nullable().label("Tanggal Kawin"),
      id_pemacek: y$string().nullable().label("ID Pemacek"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Riwayat Kawin",
    // Input
    input: {
      tanggal_kawin: "",
      id_pemacek: "",
      fase_pemeliharaan: "",
    },
    // UI
    modal: {
      addKawin: false,
      ubahKawin: false,
      confirm: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "tanggal_perkawinan",
          th: "Tanggal Kawin",
          render: ({ tanggal_perkawinan }) => tanggal_perkawinan ? ubahTanggal(tanggal_perkawinan) : null,
        },
        {
          name: "id_indukan",
          th: "ID Indukan",
        },
        {
          name: "id_pejantan",
          th: "ID Pemacek",
        },
        {
          name: "status",
          th: "Status",
        },
        {
          name: "id_cempe",
          th: "ID Cempe",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kawin, ["g$kawinList", "g$betina", "g$jantan"]),
    ...mapState(d$dropdown, ["g$ddFasePemeliharaan"]),
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
    await this.a$kawinList(this.$route.params.id).catch((error) =>
      this.notify(error, false)
    );
    // await this.a$betinaList(`id_ternak=${this.$route.params.id}`).catch((error) =>
    //   this.notify(error, false)
    // );
    // await this.a$jantanList(`kecuali=${this.g$betina[0].id_pejantan}`).catch((error) =>
    //   this.notify(error, false)
    // );
    // await this.a$ddFasePemeliharaan().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kawin, [
      "a$kawinList",
      "a$kawinAdd",
      "a$kawinEdit",
      "a$kawinDelete",
      "a$betinaList",
      "a$jantanList",
    ]),
    ...mapActions(d$dropdown, ["a$ddFasePemeliharaan"]),
    clearInput() {
      this.input = {
        id: null,
        tanggal_kawin: "",
        // id_ternak: "",
        id_pemacek: "",
        id_users: null,
      };
    },
    async addKawin() {
      try {
        const { tanggal_kawin, id_pemacek } = this.input;
        const data = {
          tanggal_kawin,
          id_ternak: this.$route.params.id,
          id_pemacek,
        };
        await this.schema.validate(data);
        await this.a$kawinAdd(data);
        this.modal.addKawin = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kawinList(this.$route.params.id).catch((error) =>
          this.notify(error, false)
        );
      }
    },
    async editKawin() {
      try {
        const { id, tanggal_kawin, id_pemacek } = this.input;
        const data = {
          id,
          tanggal_kawin,
          id_ternak: this.$route.params.id,
          id_pemacek,
        };
        await this.schema.validate(data);
        await this.a$kawinEdit(data);
        this.modal.ubahKawin = false;
        this.notify(`Edit ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kawinList(this.$route.params.id).catch((error) =>
          this.notify(error, false)
        );
      }
    },
    async delKawin() {
      try {
        const { id } = this.input;
        await this.a$kawinDelete(id);
        this.modal.confirm = false;
        this.notify(`Hapus ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kawinList(this.$route.params.id).catch((error) =>
          this.notify(error, false)
        );
      }
    },
    async triggerEditModal(row) {
      try {
        const { id_kawin, tanggal_kawin, id_pemacek } = row;
        this.input = {
          id: id_kawin,
          tanggal_kawin,
          id_pemacek,
        };
        this.modal.ubahKawin = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
    async triggerDelete(row) {
      try {
        const { id_kawin, id_ternak } = row;
        this.input = {
          id: id_kawin,
          id_ternak,
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
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <!-- <div class="col text-right">
          <base-button type="success" @click="modal.addKawin = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div> -->
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kawinList.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$kawinList" :columns="dt.column" :actions="dt.action"
        @ubah-kawin="triggerEditModal" @hapus-kawin="triggerDelete" />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addKawin" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addKawin" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <base-input name="tanggal_kawin" class="" placeholder="Pilih tanggal" label="Tanggal Kawin" required>
                  <flat-pickr v-model.lazy="input.tanggal_kawin" :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker" placeholder="Pilih Tanggal Kawin" />
                </base-input>
              </div>
              <!-- <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Masukan ID Indukan Betina" label="ID Indukan" required></base-input>
                </field-form>
              </div> -->

              <!-- Pilih pejantan -->
              <div class="col-12">
                <base-input name="pemacek" placeholder="Pemacek" label="Pemacek" required>
                  <multi-select v-model="input.id_pemacek" :options="g$jantan" label="id_ternak" track-by="id_ternak"
                    placeholder="Pilih Pemacek" :show-labels="false" />
                </base-input>
              </div>

              <!-- Fase pemeliharaan -->
              <div class="col-12">
                <base-input name="fase" placeholder="Fase Pemeliharaan" label="Fase Pemeliharaan" required>
                  <multi-select v-model="input.fase" :options="g$ddFasePemeliharaan" label="name" track-by="id"
                    placeholder="Pilih Fase Pemeliharaan" :show-labels="false" />
                </base-input>
              </div>

              <!-- <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Indukan" label="ID Indukan" required>
                  <multi-select v-model="input.id_ternak" :options="g$ddListBetina" label="name" track-by="id" placeholder="Pilih/Masukan ID Indukan Betina" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Pemacek" label="ID Pemacek" required>
                  <multi-select v-model="input.id_ternak" :options="g$ddListPejantan" label="name" track-by="id" placeholder="Pilih/Masukan ID Indukan Pejantan" :show-labels="false" />
                </base-input>
              </div> -->
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
      <modal-comp v-model:show="modal.ubahKawin" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahKawin" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <base-input name="tanggal_kawin" class="" placeholder="Pilih tanggal" label="Tanggal Kawin" required>
                  <flat-pickr v-model.lazy="input.tanggal_kawin" :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker" placeholder="Pilih Tanggal Kawin" />
                </base-input>
              </div>
              <!-- <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Masukan ID Indukan Betina" label="ID Indukan" required></base-input>
                </field-form>
              </div> -->
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_pemacek" type="text" name="id_pemacek">
                  <base-input v-bind="field" placeholder="Masukan ID Indukan Pejantan" label="ID Pemacek" required>
                  </base-input>
                </field-form>
              </div>
              <!-- <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Indukan" label="ID Indukan" required>
                  <multi-select v-model="input.id_ternak" :options="g$ddListBetina" label="name" track-by="id" placeholder="Pilih/Masukan ID Indukan Betina" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Pemacek" label="ID Pemacek" required>
                  <multi-select v-model="input.id_ternak" :options="g$ddListPejantan" label="name" track-by="id" placeholder="Pilih/Masukan ID Indukan Pejantan" :show-labels="false" />
                </base-input>
              </div> -->
              <!-- <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_cempe" type="text" name="id_cempe">
                  <base-input v-bind="field" placeholder="Masukan ID Cempe" label="ID Cempe" required></base-input>
                </field-form>
              </div> -->
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
