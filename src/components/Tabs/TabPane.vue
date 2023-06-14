<template>
  <div
    v-show="active"
    :id="id || label"
    class="tab-pane fade"
    :class="{ 'active show': active }"
    :aria-expanded="active"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabPane",
  inject: ["addTab", "removeTab"],
  props: {
    label: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      active: false,
    };
  },
  mounted() {
    this.addTab(this);
  },
  unmounted() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    this.removeTab(this);
  },
};
</script>
<style>

</style>
