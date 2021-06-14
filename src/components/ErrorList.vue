<template>
  <div v-if="errors.length" class="error-message">
    <li
      v-for="(error, index) in errors"
      :key="index"
      class="error-message__text"
    >
      {{ error }}
    </li>
  </div>
</template>
<script>
export default {
  props: {
    errors: Array,
  },
}
</script>
