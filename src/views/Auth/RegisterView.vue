<script>
import d$auth from "@/stores/auth";
import { useRouter } from "vue-router";
import { inject } from "vue";
import {
  object as y$object,
  string as y$string,
  ref as y$ref,
  number as y$number,
} from "yup";

export default {
  metaInfo: () => ({
    title: "Pendaftaran",
  }),
  setup() {
    const router = useRouter();
    const auth = d$auth();
    const notify = inject("notify");

    async function onSubmit(values) {
      try {
        const register = await auth.a$register(values);
        if (register === "Register Berhasil!") {
          notify(register);
          router.push({ name: "Cek Email" });
        } else {
          throw new Error(register);
        }
      } catch (error) {
        notify(error, false);
      }
    }

    const schema = y$object({
      nama_pengguna: y$string()
        .min(4)
        .max(30)
        .required()
        .label("Nama pengguna"),
      email: y$string().required().email().label("Email"),
      nomor_telepon: y$string().required().label("Nomor Telepon"),
      postcode: y$number().required().label("Kode Pos"),
      nama_peternakan: y$string().required().label("Nama Peternakan"),
      kata_sandi: y$string().min(8).required().label("Kata Sandi"),
      ulangi_kata_sandi: y$string()
        .oneOf([y$ref("kata_sandi")], "Kata Sandi Tidak Cocok")
        .required()
        .label("Ulangi Kata Sandi"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>

<template>
  <div class="header py-5 pt-sm-5"></div>
  <div class="container">
    <div class="row mx-0 justify-content-center">
      <div class="col-sm-8 mt--6">
        <div class="text-center mt-5 mb-5">
          <img width="204" src="../../../public/images/GOMO LOGO.png" alt="email" />
        </div>
        <div class="card bg-secondary shadow border-0">
          <h1 class="text-center display-4 pt-4">Daftar Akun Anda</h1>
          <div class="card-header bg-transparent pb-5">
            <form-comp :validation-schema="schema" @submit="onSubmit">
              <div class="row">
                <div class="col-sm-6">
                  <base-input
                    name="nama_pengguna"
                    form-classes="input-group-alternative"
                    label="Nama Pengguna"
                    placeholder="Nama Pengguna"
                    addon-left-icon="fas fa-user"
                    required
                  >
                  </base-input>
                </div>
                <div class="col-sm-6">
                  <base-input
                    name="email"
                    form-classes="input-group-alternative"
                    placeholder="Email"
                    label="Email"
                    addon-left-icon="fas fa-envelope"
                    focused
                    required
                  >
                  </base-input>
                </div>
                <div class="col-sm-6">
                  <base-input
                    name="nomor_telepon"
                    form-classes="input-group-alternative"
                    placeholder="Nomor Telepon"
                    label="Nomor Telepon"
                    addon-left-icon="fas fa-phone"
                    focused
                    required
                  >
                  </base-input>
                </div>
                <div class="col-sm-6">
                  <base-input
                    name="nama_peternakan"
                    form-classes="input-group-alternative"
                    label="Nama Peternakan"
                    placeholder="Nama Peternakan"
                    addon-left-icon="fas fa-house"
                    required
                  >
                  </base-input>
                </div>
                <div class="col-sm-6">
                  <base-input
                    name="alamat"
                    form-classes="input-group-alternative"
                    placeholder="Alamat"
                    label="Alamat"
                    addon-left-icon="fas fa-location-arrow"
                    focused
                    required
                  >
                  </base-input>
                </div>
                <div class="col-sm-6">
                  <base-input
                    name="postcode"
                    form-classes="input-group-alternative"
                    placeholder="Kode Pos"
                    label="Kode Pos"
                    addon-left-icon="fas fa-signs-post"
                    focused
                    required
                  >
                  </base-input>
                </div>
                <div class="col-sm-6">
                  <base-input
                    name="kata_sandi"
                    form-classes="input-group-alternative"
                    placeholder="Kata Sandi"
                    label="Kata Sandi"
                    type="password"
                    addon-left-icon="fas fa-lock"
                    password
                    required
                  >
                  </base-input>
                </div>
                <div class="col-sm-6">
                  <base-input
                    name="ulangi_kata_sandi"
                    form-classes="input-group-alternative"
                    placeholder="Ulangi Kata Sandi"
                    label="Ulangi Kata Sandi"
                    type="password"
                    addon-left-icon="fas fa-lock"
                    password
                    required
                  >
                  </base-input>
                </div>
              </div>

              <div class="text-center">
                <base-button
                  type="success1"
                  class="my-2 btn-lg px-6 rounded-lg text-white"
                  native-type="submit"
                >
                  Buat Akun
                </base-button>
              </div>
            </form-comp>
            <div class="text-center mt-2">
              <small>Sudah punya akun? </small>
              <router-link to="/auth/login" class="text-primary">
                <small>Masuk disini</small>
              </router-link>
            <div class="text-center mt-3">
                <router-link to="/auth/reset" class="text-primary">
                  <small>Lupa Password?</small>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


