<template>
  <nav class="menu">
    <p v-if="user.username" :title="user.username" class="menu__link">
      @{{ cutStr(user.username) }}
    </p>
    <div @click="toggleMobildeSearch" class="menu__link menu__link-serach">
       <img src="@/assets/images/menu-search.svg" alt="Поиск" />
    </div>
    <router-link
      :to="{ name: 'links-form' }"
      class="menu__link"
      title="Создать ссылку"
    >
      <img src="@/assets/images/menu-link-add.svg" alt="Новая ссылка" />
    </router-link>
    <router-link
      :to="{ name: 'folder-form' }"
      href=""
      class="menu__link"
      title="Создать папку"
    >
      <img src="@/assets/images/menu-folder-add.svg" alt="Новая папка" />
    </router-link>
    <button @click.prevent="logout" class="menu__link" title="Выйти из системы">
      <img src="@/assets/images/menu-logout.svg" alt="Выйти" />
    </button>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'
import cutStr from '@/utils/cut-str'
export default {
  data() {
    return {
      cutStr,
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/')
        location.reload()
      })
    },
    toggleMobildeSearch() {
      this.$store.commit('TOGGLE_MOBILE_SEARCH')
    },
  },
}
</script>
