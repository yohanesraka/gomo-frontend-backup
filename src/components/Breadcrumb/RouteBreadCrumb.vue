<template>
  <bread-crumb list-classes="breadcrumb-links breadcrumb-dark">
    <breadcrumb-item>
      <li class="breadcrumb-item">
        <router-link to="/">
          <i class="fas fa-home"></i>
        </router-link>
      </li>
    </breadcrumb-item>
    <breadcrumb-item
      v-for="(route, index) in $route.matched.slice()"
      :key="route.name"
      :active="index === $route.matched.length - 1"
      style="display: inline-block"
    >
      <router-link
        v-if="index < $route.matched.length - 1"
        :to="{ path: route.path }"
      >
        {{ route.path.substring(1, 2).toUpperCase() + route.path.substring(2) }}
      </router-link>
      <span v-else>{{ route.name }}</span>
    </breadcrumb-item>
  </bread-crumb>
</template>

<script>
import BreadCrumb from './BreadCrumb.vue';
import BreadcrumbItem from './BreadcrumbItem.vue';

export default {
  name: 'RouteBreadcrumb',
  components: {
    BreadCrumb,
    BreadcrumbItem,
  },
  methods: {
    getBreadName(route) {
      return route.name;
    },
  },
};
</script>

<style scoped></style>
