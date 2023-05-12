<script>
export default {
  metaInfo: () => ({
    title: "Fase Adaptasi",
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
            <router-link to="../adaptasi" >
            <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-adaptasi" >
            <base-button type="secondary" class="btn-lg text-dark">
                Fase Adaptasi
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="langkah-kerja" >
            <base-button type="success1" class="btn-lg text-white">
                {{ pageTitle }}
              </base-button>
            </router-link>
          </span>
        </div>
      </div>
      <div>
        <h3>{{ pageTitle }} Fase Adaptasi :</h3>
      </div>
    </template>

    <template #body>
      <div>
        <card-comp>
          <ol>
            <li class="mb-1">
              Pastikan seluruh domba terseleksi dengan baik kemudian masukkan ke
              kandang umbaran.
            </li>
            <li class="mb-1">Isi form pada aplikasi.</li>
            <li class="mb-1">
              Berikan perlakukan sesuai dengan arahan dan centang jika sudah
              memberikan perlakuan.
            </li>
            <li class="mb-1">Submit data.</li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
