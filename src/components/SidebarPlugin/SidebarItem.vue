<template>
  <component :is="baseComponent" :to="link.path ? link.path : '/'" class="nav-item" :class="{ active: isActive }" tag="li">
    <a
      v-if="isMenu"
      :href="'#' + linkName"
      class="sidebar-menu-item nav-link"
      :aria-expanded="isActive"
      data-toggle="collapse"
      role="button"
      :aria-controls="linkName"
      @click.prevent="collapseMenu"
    >
      <template v-if="addLink">
        <span class="nav-link-text"> {{ link.name }} <b class="caret"></b> </span>
      </template>
      <template v-else>
        <i :class="link.icon"></i>
        <span class="nav-link-text">{{ link.name }} <b class="caret"></b></span>
      </template>
    </a>

    <div v-if="$slots.default || isMenu" :id="linkName" class="collapse" :class="{ show: isActive }">
      <ul class="nav nav-sm flex-column">
        <slot></slot>
      </ul>
    </div>

    <slot v-if="children.length === 0 && !$slots.default && link.path" name="title">
      <component
        :is="elementType(link, false)"
        :to="link.path"
        class="nav-link"
        :class="{ active: link.active }"
        :target="link.target"
        :href="link.path"
        @click="linkClick"
      >
        <template v-if="addLink">
          <span class="nav-link-text">{{ link.name }}</span>
        </template>
        <template v-else>
          <i :class="link.icon"></i>
          <span class="nav-link-text">{{ link.name }}</span>
        </template>
      </component>
    </slot>
  </component>
</template>
<script>
export default {
  name: 'SidebarItem',
  provide() {
    return {
      addLink: this.addChild,
      removeLink: this.removeChild,
    };
  },
  inject: {
    addLink: { default: null },
    removeLink: { default: null },
    autoClose: {
      default: true,
    },
  },
  props: {
    menu: {
      type: Boolean,
      default: false,
      description: "Whether the item is a menu. Most of the item it's not used and should be used only if you want to override the default behavior.",
    },
    link: {
      type: Object,
      default: () => ({
        name: '',
        path: '',
        children: [],
      }),
      description: 'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info',
    },
  },
  data() {
    return {
      children: [],
      collapsed: true,
    };
  },
  computed: {
    baseComponent() {
      return this.isMenu || this.link.isRoute ? 'li' : 'router-link';
    },
    linkName() {
      return this.link.name.split(' ').length > 1 ? this.link.name.split(' ').filter((s) => s.length > 1).join('') : this.link.name;
    },
    linkPrefix() {
      if (this.link.name) {
        const words = this.link.name.split(' ');
        return words.map((word) => word.substring(0, 1)).join('');
      }
      return '';
    },
    isMenu() {
      return this.children.length > 0 || this.menu === true;
    },
    isActive() {
      if (this.$route && this.$route.path) {
        const matchingRoute = this.children.find((c) => this.$route.path.startsWith(c.link.path));
        if (matchingRoute !== undefined) {
          return true;
        }
      }
      return false;
    },
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
    if (this.link.collapsed !== undefined) {
      this.collapsed = this.link.collapsed;
    }
    if (this.isActive && this.isMenu) {
      this.collapsed = false;
    }
  },
  unmounted() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.removeLink) {
      this.removeLink(this);
    }
  },
  methods: {
    addChild(item) {
      const index = this.$slots.default().indexOf(item.$vnode);
      this.children.splice(index, 0, item);
    },
    removeChild(item) {
      const tabs = this.children;
      const index = tabs.indexOf(item);
      tabs.splice(index, 1);
    },
    elementType(link, isParent = true) {
      if (link.isRoute === false) {
        return isParent ? 'li' : 'a';
      }
      return 'router-link';
    },
    linkAbbreviation(name) {
      const matches = name.match(/\b(\w)/g);
      return matches.join('');
    },
    linkClick() {
      if (this.autoClose && this.$sidebar && this.$sidebar.showSidebar === true) {
        this.$sidebar.displaySidebar(false);
      }
    },
    collapseMenu() {
      this.collapsed = !this.collapsed;
    },
    collapseSubMenu(link) {
      const ctx = link;
      ctx.collapsed = !ctx.collapsed;
    },
  },
};
</script>
<style>
.sidebar-menu-item {
  cursor: pointer;
}
.sidebar ul.links__nav {
  margin-top: 0;
  padding-top: 10px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
  height: auto !important;
}

.slide-fade-leave-active {
  transition: all 0.8s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  height: 0 !important;
}

.navbar-dark .sidebar-menu-item.active .nav-link-text {
  color: #09444E;
}
</style>
