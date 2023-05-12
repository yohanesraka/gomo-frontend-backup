<template>
  <div class="custom-control custom-radio" :class="[inlineClass, { disabled: disabled }]">
    <input :id="cbId" v-model="model" class="custom-control-input" type="radio" :disabled="disabled" :value="name" />
    <label :for="cbId" class="custom-control-label">
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>
<script>
export default {
  name: 'BaseRadio',
  model: {
    prop: 'modelValue',
  },
  props: {
    modelValue: {
      type: [Array, Boolean, String],
      description: 'Whether radio is checked',
      default: false,
    },
    name: {
      type: [String, Number],
      description: 'Radio label',
      default: '',
    },
    disabled: {
      type: Boolean,
      description: 'Whether radio is disabled',
    },
    value: {
      type: [String, Boolean],
      description: 'Radio value',
      default: false,
    },
    inline: {
      type: Boolean,
      description: 'Whether radio is inline',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      cbId: '',
    };
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
    inlineClass() {
      if (this.inline) {
        return 'form-check-inline';
      }
      return '';
    },
  },
  created() {
    this.cbId = Math.random().toString(16).slice(2);
  },
};
</script>
