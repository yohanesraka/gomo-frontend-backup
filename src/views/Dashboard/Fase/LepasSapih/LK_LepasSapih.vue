<script>
export default {
  metaInfo: () => ({
    title: "Fase Lepas Sapih",
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
            <router-link to="../lepas-sapih">
              <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-lepas-sapih">
              <base-button type="secondary" class="btn-lg text-dark">
                Fase Lepas Sapih
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
        <h3>Langkah Kerja Fase Lepas Sapih :</h3>
      </div>
    </template>

    <template #body>
      <div>
        <card-comp>
          <ol>
            <li class="mb-1">
              Cempe yang berumur 12 Minggu pisahkan dari indukan.
            </li>
            <li class="mb-1">
              Dilanjutkan dengan memasukan cempe ke kandang baru.
            </li>
            <li class="mb-1">
              Mengisi Form pendataan awal pemisahan cempe dari indukan.
            </li>
            <li class="mb-1">
              Seleksi domba yang akan dijadikan calon pejantan, calon indukan
              dan calon bakalan.
            </li>
            <li class="mb-1">Setelah diseleksi dimasukan ke dalam form.</li>
            <li class="mb-1">Submit Data.</li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
