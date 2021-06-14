<template v-cloak>
  <div class="box">
    <div class="header-block">
      <h2 class="title header-block__title">Папки</h2>
      <router-link
        :to="{name: 'folder-form'}"
        class="header-block__icon-block"
        title="Добавить новую папку"
      >
        <svg class="header-block__icon" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 2H3.333C2.597 2 2 2.597 2 3.333v9.334C2 13.403 2.597 14 3.333 14h9.334c.736 0 1.333-.597 1.333-1.333V3.333C14 2.597 13.403 2 12.667 2zM8 5.333v5.334M5.333 8h5.334" stroke="#E5E5E5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </router-link>
    </div>
    <div class="folder box__content">
      <template v-if="loading">
        <div
          v-for="item in 3"
          :key="item"
          class="folder__item folder__item--skeleton"
        ></div>
      </template>
      <template v-else>
        <router-link
          v-for="(folder, index) in folders"
          :key="index"
          :to="{ name: 'folder-links', params: {id: folder.id }}"
          class="folder__item"
        >
          <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.667 12.667A1.333 1.333 0 0113.333 14H2.667a1.334 1.334 0 01-1.334-1.333V3.333A1.333 1.333 0 012.667 2H6l1.333 2h6a1.333 1.333 0 011.334 1.333v7.334z" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="folder__text">{{ folder.name }}</span>
        </router-link>
      </template>
      <p v-if="!loading && !folders.length">
        У вас еще нет своих папок.
        <router-link :to="{ name: 'folder-form' }">Добавить?</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  mounted() {
    this.fetchFolder()
  },
  computed: {
    ...mapGetters({
      folders: 'folder/folders',
      loading: 'folder/loading',
    }),
  },
  methods: {
    fetchFolder() {
      this.$store.dispatch('folder/getFolder')
    },
  },
}
</script>
