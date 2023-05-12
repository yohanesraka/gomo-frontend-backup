<script>
export default {
  metaInfo: () => ({
    title: "Fase Perkawinan",
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
            <router-link to="../perkawinan" >
            <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-perkawinan" >
            <base-button type="secondary" class="btn-lg text-dark">
                Fase Perkawinan
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
        <h3>Langkah Kerja Fase Perkawinan :</h3>
      </div>
    </template>

    <template #body>
      <div>
        <card-comp>
          <ol>
            <li class="mb-1">Masuk ke menu proses persiapan.</li>
            <li class="mb-1">Pilih domba indukan yang siap dikawinkan.</li>
            <li class="mb-1">Isikan ID pejantan.</li>
            <li class="mb-1">
              Isi kan kode kandang apabila domba tersebut akan dipindahkan ke
              kandang baru.
            </li>
            <li class="mb-1">Masuk ke menu proses kawin.</li>
            <li class="mb-1">
              Pilih domba yang sudah melakukan proses kawin selama 30 hari (USG
              1) dan 60 hari (USG 2).
            </li>
            <li class="mb-1">
              Domba yang sudah di cek USG harus di cat pilox dan ceklis USG
              untuk memudahkan pengecekan USG.
            </li>
            <li class="mb-1">
              Apabila terdapat domba yang terindikasi bunting maka ubah status
              domba tersebut menjadi bunting.
            </li>
            <li class="mb-1">
              Apabila setelah masa koloni berakhir atau setelah pengecekan USG 2
              domba tidak terindikasi bunting maka ubah status domba tersebut
              menjadi tidak bunting.
            </li>
            <li class="mb-1">Submit Data.</li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
