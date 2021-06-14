<template>
  <div class="loader-box">
    <div class="loader" :class="[color, type]" title="Загрузка"></div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'loader--accent',
    },
    type: {
      type: String,
    },
  },
}
</script>
