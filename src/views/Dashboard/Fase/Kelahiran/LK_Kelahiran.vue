<script>
export default {
  metaInfo: () => ({
    title: "Fase Kelahiran",
  }),
  data: () => ({
    pageTitle: "Langkah Kerja",
  }),
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
              <base-button type="secondary" class="btn-lg text-dark">
                Fase Kelahiran
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="langkah-kerja">
              <base-button type="success1" class="btn-lg text-white">
                Langkah Kerja
              </base-button>
            </router-link>
          </span>
        </div>
      </div>
      <div class="mt-3">
        <h3>Langkah Kerja Fase Kebuntingan :</h3>
      </div>
    </template>

    <template #body>
      <div>
        <card-comp>
          <ol>
            <li class="mb-1">
              Pasangkan Kalung RFID dan daftarkan menggunakan RFID mobile pada
              cempe yang baru lahir. Selanjutnya akan terbentuk ID ternak yang
              baru.
            </li>
            <li class="mb-1">Klik lembar kerja kelahiran.</li>
            <li class="mb-1">Isi form.</li>
            <li class="mb-1">Submit data.</li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
