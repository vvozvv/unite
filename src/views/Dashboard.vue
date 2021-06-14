<template>
  <div class="container">
    <Header />
    <router-view />
    <router-view name="favorite" />
    <router-view name="folders" />
    <router-view name="statistic" />
  </div>
</template>
<script>
import Header from '@/components/TheHeader'
export default {
  components: {
    Header,
  },
};
</script>
