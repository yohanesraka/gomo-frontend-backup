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
            <router-link to="../pemasukan" >
            <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-pemasukan" >
            <base-button type="secondary" class="btn-lg text-dark">
                Fase Pemasukan
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
      <div class="mt-3">
        <h3>Langkah Kerja Fase Pemasukan :</h3>
      </div>
    </template>

    <template #body>
      <div>
        <card-comp>
          <ol>
            <li class="mb-1">
              Periksa domba secara visual untuk mendapatkan identitas ternak
              yang terdiri dari bangsa dan jenis kelamin.
            </li>
            <li class="mb-1">
              Periksa kondisi ternak, apakah terdapat cacat atau sakit yang
              berpotensi mempersulit proses budidaya. Pengecekan terdiri dari
              cek poel, cek mulut, cek telinga, kuku kaki, cek kondisi fisik
              lainnya, dan BCS domba tersebut.
            </li>
            <li class="mb-1">
              Apabila domba dalam kondisi baik dan memenuhi kriteria, domba akan
              diterima.
            </li>
            <li class="mb-1">
              Pasangkan kalung RFID dan daftarkan menggunakan RFID mobile.
              Selanjutnya akan terbentuk ID ternak yang baru.
            </li>
            <li class="mb-1">
              Buka SOP pemasukan pada mobile apps untuk melengkapi data ternak
              yang baru saja dimasukkan sesuai indikator yang ditetapkan.
            </li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
