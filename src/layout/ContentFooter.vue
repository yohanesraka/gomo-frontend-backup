<template>
  <footer
    class="px-4 mx-auto mb-4"
    :class="[
      isLoggedIn && $route.name !== '404' ? 'container-fluid' : 'container',
    ]"
  >
    <div class="row align-items-center justify-content-center">
      <div class="col">
        <div class="copyright text-center text-white">
          {{ year }} &mdash; <strong>{{ siteMeta.title }}</strong>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: 2023,
    };
  },
};
</script>
<style>

</style>
