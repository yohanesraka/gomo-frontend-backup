<script>
export default {
  metaInfo: () => ({
    title: 'Tentang',
  }),
  data: () => ({
    pageTitle: 'Tentang',
  }),
};
</script>

<template>
  <main-layout :title="pageTitle">
    <template #header>
      <div class="row align-items-center">
        <div class="col">
          <h3>{{ pageTitle }}</h3>
        </div>
      </div>
    </template>
    <template #body>
      <h1>This is an about page</h1>
    </template>
  </main-layout>
</template>
