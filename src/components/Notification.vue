<template>
  <div class="alert alert-dismissible d-flex" :class="'alert-' + type" data-notify="container">
    <button type="button" data-dismiss="alert" aria-label="Close" class="close">
      <span aria-hidden="true">×</span>
    </button>
    <span v-if="icon && !ownIcon" data-notify="icon" class="alert-icon" :class="icon"></span>
    <span v-else data-notify="icon" class="alert-icon" :class="ownIcon"></span>
    <span v-if="text && !ownText" data-notify="message">{{ text }}</span>
    <span v-else data-notify="message">{{ ownText }}</span>
  </div>
</template>
<script>
export default {
  name: 'NotificationComp',
  props: {
    ownText: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    ownIcon: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss"></style>
