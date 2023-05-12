<script>
export default {
  metaInfo: () => ({
    title: "Lembar Kerja Penanganan Penyakit",
  }),
  data: () => ({
    pageTitle: "Langkah Kerja Penanganan Penyakit",
  }),
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <router-link to="../penanganan-penyakit" >
            <base-button type="secondary" class="btn-lg text-dark">
                Penanganan Penyakit
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="langkah-kerja" >
            <base-button type="success1" class="btn-lg text-white">
                Langkah Kerja
              </base-button>
            </router-link>
          </span>
        </div>
      </div>
      <div>
        <h3>Langkah Kerja Penanganan Penyakit :</h3>
      </div>
    </template>

    <template #body>
      <div>
        <card-comp>
          <ol>
            <li class="mb-1">Temukan domba yang terindikasi penyakit.</li>
            <li class="mb-1">Buka menu fitur kesehatan</li>
            <li class="mb-1">Klik sub-menu daftar penyakit.</li>
            <li class="mb-1">Setelah diketahui terdapat penyakit, isi form ID ternak dan pilih penyakit.</li>
            <li class="mb-1">Submit data.</li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
