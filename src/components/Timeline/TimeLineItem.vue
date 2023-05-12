<template>
  <div class="timeline-block" :class="{ 'timeline-inverted': inverted }">
    <slot name="badge">
      <span class="timeline-step" :class="`badge-${badgeType}`">
        <i :class="badgeIcon"></i>
      </span>
    </slot>
    <div class="timeline-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TimeLineItem',
  props: {
    inverted: Boolean,
    title: {
      type: String,
      default: '',
    },
    badgeType: {
      type: String,
      default: 'success',
    },
    badgeIcon: {
      type: String,
      default: '',
    },
  },
};
</script>
<style></style>
