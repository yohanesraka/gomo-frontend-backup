<template>
  <div>
    <base-nav v-model="showMenu" type="light" :transparent="true" menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main" expand="lg">
      <template #brand>
        <div class="navbar-wrapper text-lg-center">
          <router-link class="navbar-brand" :to="{ name: isLoggedIn ? 'Home' : 'Login' }">
            <p class="lead m-0">{{ siteMeta.title }}</p>
          </router-link>
        </div>
      </template>

      <div class="navbar-collapse-header">
        <div class="row">
          <div class="col-6 collapse-brand">
            <router-link to="/">
              <img :src="siteMeta.logo" />
            </router-link>
          </div>
          <div class="col-6 collapse-close">
            <button type="button" class="navbar-toggler" @click="showMenu = false">
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </base-nav>
    <div class="main-content">
      <router-view></router-view>
    </div>
      <content-footer />
    </div>
</template>
<script>
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    ContentFooter,
  },
  beforeRouteUpdate(to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu();
      setTimeout(() => {
        next();
      }, this.menuTransitionDuration);
    } else {
      next();
    }
  },
  props: {
    backgroundColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
      year: new Date().getFullYear(),
      pageClass: "login-page",
    };
  },
  computed: {
    title() {
      return `${this.$route.name} Page`;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.updateBackground();
      },
    },
  },
  beforeUnmount() {
    this.removeBackgroundColor();
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      this.showMenu = false;
    },
    setBackgroundColor() {
      document.body.classList.add("bg-light_blue");
    },
    removeBackgroundColor() {
      document.body.classList.remove("bg-white");
    },
    updateBackground() {
      if (!this.$route.meta.noBodyBackground) {
        this.setBackgroundColor();
      } else {
        this.removeBackgroundColor();
      }
    },
  },
};
</script>
<style lang="scss">
$scaleSize: 0.8;

@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }

  100% {
    opacity: 1;
  }
}

.main-content .zoomIn {
  animation-name: zoomIn8;
}

.background-image {
  background-image: url("../../../public/images/BG WEB GOMO-1.png");
  background-size: cover;
}

@keyframes zoomOut8 {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-content .zoomOut {
  animation-name: zoomOut8;
}
</style>
