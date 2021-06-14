<template>
  <header class="header">
    <div class="header__row">
      <router-link to="/" class="header__link">
        <img src="@/assets/images/logo.svg" alt="unite" />
      </router-link>
      <Search class="header__search" />
      <router-link v-if="!isMobile" to="/" class="header__link">
        <img src="@/assets/images/home.svg" alt="На главную" />
      </router-link>
    </div>
    <Menu />
  </header>
</template>
<script>
import Menu from '@/components/TheMenu'
import Search from '@/components/Search'
import toggleMobileMenu from '@/mixins/toggle-mobile-menu.mixins'
export default {
  mixins: [toggleMobileMenu],
  components: {
    Menu,
    Search,
  },
}
</script>
