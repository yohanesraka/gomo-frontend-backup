<script>
import { mapActions, mapState } from "pinia";
import useAuthStore from "@/stores/auth";
import d$superadmin from "@/stores/superadmin/superadmin";
import d$auth from "@/stores/auth";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Peternakan",
  }),
  data: () => ({
    pageTitle: "Peternakan",
    // DataTable
    dt: {
      column: [
        {
          name: "nama_peternakan",
          th: "Nama Peternakan",
        },
        {
          name: "alamat",
          th: "Alamat Peternakan",
        },
        {
          name: "subscribe",
          th: "Premium sampai",
          render: ({ subscribe }) => subscribe ? ubahTanggal(subscribe) : null,
        },
      ],
      action: [
        {
          text: "Set Premium",
          color: "primary",
          event: "set-premium",
          show: ({ subscribe }) => !subscribe,
        },
        {
          text: "Set Free",
          color: "danger",
          event: "set-free",
          show: ({ subscribe }) => subscribe,
        },
        {
          text: "Lihat Peternakan",
          color: "info",
          event: "lihat-peternakan",
        },
        {
          text: "Lihat Pengguna",
          color: "warning",
          event: "lihat-pengguna",
        },
      ],
    },
    modal: {
      setPremium: false,
      setFree: false,
      lihatPengguna: false,
    },
    input: {
      peternakan: null,
      months: 3,
    }
  }),
  computed: {
    ...mapState(d$superadmin, ["g$users", "g$peternakan"]),
  },
  async mounted() {
    this.a$getPeternakan().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(useAuthStore, ["a$logout"]),
    ...mapActions(d$superadmin, ["a$getDataUsers", "a$getNewToken", "a$getPeternakan", "a$setPremiumFarm", "a$setFreeFarm"]),
    ...mapActions(d$auth, ["a$login"]),
    async logout() {
      await this.a$logout();
      this.notify("Logout Berhasil!");
      this.$router.push({ name: "Login" });
    },
    async lihatPeternakan(row) {
      const { id_peternakan, nama_peternakan } = row;
      const data = {
        id_peternakan,
      };
      try {
        const login = await this.a$getNewToken(data);
        if (login === "Login Berhasil!") {
          this.$router.push({ name: "Home" });
          this.notify(`Lihat ${nama_peternakan} berhasil!`);
        }
      } catch (error) {
        this.notify(error, false);
      }
    },
    triggerSetPremium(row) {
      this.input.peternakan = row;
      this.modal.setPremium = true;
    },
    triggerSetFree(row) {
      this.input.peternakan = row;
      this.modal.setFree = true;
    },
    triggerLihatPengguna(row) {
      this.input.peternakan = row;
      this.modal.lihatPengguna = true;
    },
    async setPremium() {
      const { peternakan, months } = this.input;
      const data = {
        id_peternakan: peternakan.id_peternakan,
        months,
      };
      try {
        await this.a$setPremiumFarm(data);
        this.notify(`Berhasil set premium ${peternakan.nama_peternakan}!`);
        this.a$getPeternakan().catch((error) => this.notify(error, false));
        this.modal.setPremium = false;
      } catch (error) {
        this.notify(error, false);
      }
    },
    async setFree() {
      const { peternakan } = this.input;
      const data = {
        id_peternakan: peternakan.id_peternakan,
      };
      try {
        await this.a$setFreeFarm(data);
        this.notify(`Berhasil membatalkan berlangganan ${peternakan.nama_peternakan}!`);
        this.a$getPeternakan().catch((error) => this.notify(error, false));
        this.modal.setFree = false;
      } catch (error) {
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
          <base-button type="danger" @click="logout">
            <i class="fas fa-arrow-right-from-bracket"></i>
            <span>Keluar</span>
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$peternakan.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$peternakan" :columns="dt.column" :actions="dt.action"
        @lihat-peternakan="lihatPeternakan" @set-premium="triggerSetPremium" @set-free="triggerSetFree"
        @lihat-pengguna="triggerLihatPengguna" />
    </template>

    <template #modal>
      <!-- Set premium -->
      <modal-comp v-model:show="modal.setPremium" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Set Premium</h3>
        </template>
        <template v-if="modal.setPremium" #body>
          <div class="col-12">
            <field-form v-slot="{ field }" v-model="input.months" name="months">
              <base-input v-bind="field" placeholder="Masukkan durasi berlangganan dalam jumlah bulan"
                label="Durasi berlangganan (bulan)" required type="number"></base-input>
            </field-form>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.setPremium = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="setPremium">Set Premium</base-button>
        </template>
      </modal-comp>

      <!-- Set free -->
      <modal-comp v-model:show="modal.setFree" modal-classes="modal-sm">
        <template #header>
          <h3 class="modal-title">Hapus Premium</h3>
        </template>
        <template v-if="modal.setFree" #body>
          <p>
            Yakin ingin menghapus langganan dari <strong>{{ input.peternakan.nama_peternakan }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.setFree = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="setFree">Hapus</base-button>
        </template>
      </modal-comp>

      <!-- Lihat pengguna -->
      <modal-comp v-model:show="modal.lihatPengguna" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Daftar Pengguna</h3>
        </template>
        <template v-if="modal.lihatPengguna" #body>
          <div style="max-height: 500px; overflow-y: 800px; overflow-x: hidden">
            <h3 class="my-3">Daftar Pengguna {{input.peternakan.nama_peternakan}}</h3>
            <empty-result v-if="!input.peternakan.user.length" :text="`Pengguna`" />
            <div class="m-3" v-for="item in input.peternakan.user">
              <hr class="m-0" />
              <!-- Nama pengguna -->
              <div class="row">
                <div class="col-5">
                  <span style="font-weight: 400">Nama Pengguna</span>
                </div>
                <div class="col">
                  :
                  <span style="font-weight: 200">{{ item.nama_pengguna }}</span>
                </div>
              </div>

              <!-- Email -->
              <div class="row">
                <div class="col-5">
                  <span style="font-weight: 400">Email</span>
                </div>
                <div class="col">
                  :
                  <span style="font-weight: 200">{{
                      item.email
                  }}</span>
                </div>
              </div>

              <!-- Nomor telepon -->
              <div class="row">
                <div class="col-5">
                  <span style="font-weight: 400">Nomor Telepon</span>
                </div>
                <div class="col">
                  :
                  <span style="font-weight: 200">{{
                      item.nomor_telepon
                  }}</span>
                </div>
              </div>

              <!-- Role -->
              <div class="row">
                <div class="col-5">
                  <span style="font-weight: 400">Peran</span>
                </div>
                <div class="col">
                  :
                  <span style="font-weight: 200">{{
                      item.role
                  }}</span>
                </div>
              </div>

              <!-- Status -->
              <div class="row">
                <div class="col-5">
                  <span style="font-weight: 400">Status</span>
                </div>
                <div class="col">
                  :
                  <span style="font-weight: 200">{{
                      item.status
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.lihatPengguna = false">
            Tutup
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>