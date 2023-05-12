<template>
  <div class="custom-file">
    <input
      id="customFileLang"
      type="file"
      class="custom-file-input"
      lang="en"
      v-bind="$attrs"
      v-on="listeners"
    />
    <label class="custom-file-label" for="customFileLang">
      {{ label }}
    </label>
  </div>
</template>
<script>
export default {
  name: 'FileInput',
  inheritAttrs: false,
  props: {
    initialLabel: {
      type: String,
      default: 'Select file',
    },
  },
  emits: ['change'],
  data() {
    return {
      files: [],
    };
  },
  computed: {
    listeners() {
      return {
        change: this.fileChange,
      };
    },
    label() {
      const fileNames = this.files.map((file) => file.name);
      return fileNames.length ? fileNames.join(', ') : this.initialLabel;
    },
  },
  methods: {
    fileChange(evt) {
      this.files = evt.target.files;
      this.$emit('change', this.files);
    },
  },
};
</script>
<style></style>
