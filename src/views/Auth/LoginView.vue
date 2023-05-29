<script>
import { object as y$object, string as y$string } from "yup";

import { inject } from "vue";
import d$auth from "@/stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  metaInfo: () => ({
    title: "Login",
  }),
  setup() {
    const router = useRouter();
    const auth = d$auth();
    const notify = inject("notify");

    async function onSubmit(values) {
      try {
        const login = await auth.a$login(values);

        if (login === "Login Berhasil!") {
          notify(login);
          router.push({ name: "Home" });
        } else if (login === "Login Superadmin Berhasil!") {
          notify(login);
          router.push({ name: "Superadmin" });
        } else {
          throw new Error(login);
        }
      } catch (error) {
        notify(error, false);
      }
    }

    const schema = y$object({
      email: y$string().required().label("Email"),
      kata_sandi: y$string().min(5).required().label("Kata Sandi"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>

<template>
  <!-- Header -->
  <div class="header py-7 pt-lg-6">
    <div class="container">
      <div class="header-body text-center mb-5">
        <div class="row justify-content-center">
          <div class="col-md-8 px-5">
            <!-- <h1 class="text-black">Selamat Datang di {{ siteMeta.title }}!</h1>
              <br /> -->
            <img style="width: 204px" src="../../../public/images/GOMOLOGO.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mx-0 justify-content-center mt--7">
      <div class="col-lg-6 col-md-8">
        <div class="card bg-secondary shadow border-0">
          <div class="card-header bg-transparent pb-6">
            <div class="text-center mt-2 mb-3">
              <h1 class="display-4 text-black">Masuk Ke Akun Anda</h1>
              <small class="text-muted" style="word-wrap: break-word;">Selamat Datang Di Website
                Goat Milk Monitoring Dashboard</small>
            </div>
            <form-comp :validation-schema="schema" @submit="onSubmit">
              <base-input name="email" addon-left-icon="fas fa-envelope" placeholder="Email">
              </base-input>
              <base-input name="kata_sandi" addon-left-icon="fas fa-lock" type="password" placeholder="Kata Sandi"
                password>
              </base-input>
              <div class="text-center">
                <base-button type="success1" native-type="submit" class="my-2 btn-lg px-6 rounded-lg text-white">
                  Masuk
                </base-button>
              </div>
              <div class="text-center mt-4">
                <div>
                  <span class="text-muted"><small>Belum Punya Akun? </small></span>
                  <router-link to="/auth/register" class="text-primary">
                    <small>Daftar Disini</small>
                  </router-link>
                </div>
                <div>
                  <router-link to="/auth/reset" class="text-primary">
                    <small>Lupa Password?</small>
                  </router-link>
                </div>
              </div>
            </form-comp>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
