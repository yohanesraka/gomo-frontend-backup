<template>
  <label class="custom-toggle" :class="switchClass">
    <input v-model="model" type="checkbox" />
    <span class="custom-toggle-slider rounded-circle" :data-label-off="offText" :data-label-on="onText"> </span>
  </label>
</template>
<script>
export default {
  name: 'BaseSwitch',
  props: {
    modelValue: {
      type: [String, Array, Number],
      default: null,
    },
    type: {
      type: String,
      default: '',
    },
    onText: {
      type: String,
      default: 'Yes',
    },
    offText: {
      type: String,
      default: 'No',
    },
  },
  emits: ['input'],
  computed: {
    switchClass() {
      const baseClass = 'custom-toggle-';
      if (this.type) {
        return baseClass + this.type;
      }
      return '';
    },
    model: {
      get() {
        return this.modelValue;
      },
      set(modelValue) {
        this.$emit('input', modelValue);
      },
    },
  },
  methods: {
    triggerToggle() {
      this.model = !this.model;
    },
  },
};
</script>
<style></style>
