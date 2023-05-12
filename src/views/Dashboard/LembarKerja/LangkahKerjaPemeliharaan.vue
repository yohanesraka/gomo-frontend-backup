<script>
export default {
  metaInfo: () => ({
    title: "Fase Pemasukan",
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
            <router-link to="../pemeliharaan">
              <base-button type="secondary" class="btn-lg text-dark">
                Lembar Kerja Pemeliharaan
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
      <div>
        <h3>Langkah Kerja Lembar Kerja Pemeliharaan:</h3>
      </div>
    </template>

    <template #body>
      <div>
        <card-comp>
          <ol>
            <li class="mb-1">Buka monitor Kandang.</li>
            <li class="mb-1">Lihat kebutuhan pakan pada kandang yang akan dikerjakan.</li>
            <li class="mb-1">Sanitasi kandang ternak serta berikan pakan sesuai porsi.</li>
            <li class="mb-1">Tambah lembar kerja pemeliharaan.</li>
            <li class="mb-1">Isi form.</li>
            <li class="mb-1">Submit Data.</li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
