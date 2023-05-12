<template>
  <!-- Header -->
  <div class="mt-9">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card bg-secondary shadow border-0">
            <div class="card-header bg-transparent pb-5 text-center">
              <h1 class="text-dark">Cek Email Kamu</h1>
              <img
                width="200"
                style="margin: 20px 0 20px 60px"
                src="../../../public/images/email.svg"
                alt="email"
              />
              <p class="text-lead text-dark">
                Link verifikasi telah dikirim ke email kamu. Silahkan cek email
                kamu untuk melakukan verifikasi.
              </p>

              <router-link to="/auth/login"
                ><base-button
                  type="success1"
                  class="my-2 btn-lg px-4 rounded-lg text-white"
                  >Kembali Ke Halaman Login</base-button
                ></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Verify",
  metaInfo: () => ({
    title: "Verifikasi Email",
  }),
};
</script>
