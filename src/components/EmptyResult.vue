<template>
  <div class="mx-auto m-5 p-5">
    <h3 class="text-danger text-center">Data <strong>{{text}}</strong> kosong!</h3>
  </div>
</template>

<script>
export default {
  name: 'EmptyResult',
  props: {
    // Text
    text: {
      type: String,
      default: 'ini',
    },
  },
  data: () => ({}),
};
</script>
