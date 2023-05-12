<template>
  <nav :class="classes" class="navbar">
    <div :class="containerClasses">
      <slot name="brand"></slot>

      <slot name="toggle-button">
        <button
          v-if="hasMenu"
          class="navbar-toggler collapsed"
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
        </button>
      </slot>

      <button class="navbar-toggler" @click.stop="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div v-show="show" v-click-outside="closeMenu" class="navbar-collapse navbar-custom-collapse collapse show" :class="menuClasses">
        <slot :close-menu="closeMenu"></slot>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'BaseNav',
  model: {
    prop: 'show',
    event: 'change',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      description: 'Whether navbar menu is shown (valid for viewports < specified by `expand` prop)',
    },
    transparent: {
      type: Boolean,
      default: false,
      description: 'Whether navbar is transparent',
    },
    expand: {
      type: String,
      default: 'lg',
      description: 'Breakpoint where nav should expand',
    },
    menuClasses: {
      type: [String, Object, Array],
      default: '',
      description: 'Navbar menu (items) classes. Can be used to align menu items to the right/left',
    },
    containerClasses: {
      type: [String, Object, Array],
      default: 'container',
      description: 'Container classes. Can be used to control container classes (contains both navbar brand and menu items)',
    },
    position: {
      type: String,
      default: 'absolute',
    },
    type: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'dark', 'success', 'danger', 'warning', 'white', 'primary', 'light', 'info', 'vue'].includes(value);
      },
      description: 'Navbar color type',
    },
  },
  emits: ['change'],
  computed: {
    classes() {
      const color = `bg-${this.type}`;
      const classes = [{ 'navbar-transparent': this.transparent }, { [`navbar-expand-${this.expand}`]: this.expand }];
      if (this.position) {
        classes.push(`navbar-${this.position}`);
      }
      if (!this.transparent) {
        classes.push(color);
      }
      return classes;
    },
    hasMenu() {
      return this.$slots.default;
    },
  },
  methods: {
    toggleMenu() {
      this.$emit('change', !this.show);
    },
    closeMenu() {
      this.$emit('change', false);
    },
  },
};
</script>
<style></style>
