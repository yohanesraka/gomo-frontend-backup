<template>
  <div
    class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-light_blue"
    @mouseenter="$sidebar.onMouseEnter()"
    @mouseleave="$sidebar.onMouseLeave()"
  >
    <div ref="sidebarScrollArea" class="scrollbar-inner">
      <div class="sidenav-header d-flex align-items-center">
        <router-link class="navbar-brand" :to="{ name: isLoggedIn ? 'Home' : 'Login' }">
          <div class="center-md-4 px-4">
            <img style="width: 100px" src="../../../public/images/GOMOLOGO.png" alt="" />
          </div>
        </router-link>
        <div class="ml-auto">
          <!-- Sidenav toggler -->
          <div class="sidenav-toggler d-none d-xl-block" :class="{ active: !$sidebar.isMinimized }" @click="minimizeSidebar">
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
      <div class="navbar-inner">
        <ul class="navbar-nav">
          <slot name="links">
            <sidebar-item v-for="(link, index) in sidebarLinks" :key="link.name + index" :link="link">
              <sidebar-item v-for="(subLink, i) in link.children" :key="subLink.name + i" :link="subLink"> </sidebar-item>
            </sidebar-item>
          </slot>
        </ul>
        <slot name="links-after"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SideBar',
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  props: {
    title: {
      type: String,
      default: 'Creative Tim',
      description: 'Sidebar title',
    },
    shortTitle: {
      type: String,
      default: 'CT',
      description: 'Sidebar short title',
    },
    logo: {
      type: String,
      default: '',
      description: 'Sidebar app logo',
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description: "List of sidebar links as an array if you don't want to use components for these.",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description: 'Whether sidebar should autoclose on mobile when clicking an item',
    },
  },
  mounted() {
    this.$sidebar.isMinimized = this.$sidebar.breakpoint < window.innerWidth;
    this.minimizeSidebar();
  },
  beforeUnmount() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
  methods: {
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
  },
};
</script>
