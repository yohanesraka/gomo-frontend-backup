<script>
export default {
  metaInfo: () => ({
    title: "Fase Pemerahan",
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
            <router-link to="../pemerahan">
              <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-pemerahan">
              <base-button type="secondary" class="btn-lg text-dark">
                Fase pemerahan
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
        <h3>Langkah Kerja Fase Pemerahan :</h3>
      </div>
    </template>

    <template #body>
      <div>
        <card-comp>
          <ol>
            <li class="mb-1">
              Setelah seluruh domba dicek USG, domba yang bunting tetap
              dikandang kawin
            </li>
            <li class="mb-1">
              Jika terdapat domba mengalami abortus maka domba akan, kembali
              masuk ke data halaman "Proses Persiapan" di halaman lembar kerja "Perkawinan"
            </li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
