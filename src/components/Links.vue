<template>
  <div class="link">
    <GoBack />
    <div class="header-block">
      <h1 class="title header-block__title">
        Все ссылки
        <small v-if="links.length" class="header-block__count">
          {{ links.length }}
        </small>
      </h1>
      <router-link
        :to="{ name: 'links-form' }"
        class="header-block__icon-block"
        title="Добавить ссылку"
      >
        <svg class="header-block__icon" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 2H3.333C2.597 2 2 2.597 2 3.333v9.334C2 13.403 2.597 14 3.333 14h9.334c.736 0 1.333-.597 1.333-1.333V3.333C14 2.597 13.403 2 12.667 2zM8 5.333v5.334M5.333 8h5.334" stroke="#E5E5E5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </router-link>
    </div>
    <div class="link__header">
      <span class="link__header-item">Иконка</span>
      <span class="link__header-item">Цвет</span>
      <span class="link__header-item">Название</span>
      <span class="link__header-item">Папка</span>
      <span class="link__header-item">Ссылка</span>
      <span class="link__header-item">Дата создания</span>
      <span class="link__header-item"></span>
    </div>
    <Spinner v-if="linkLoader" />
    <div class="link__list" :class="{ 'link__list--load': linkLoader }">
      <links-item
        v-for="(link, index) in links"
        :key="index"
        :id="link.id"
        :title="link.name"
        :link="link.link"
        :folder="link.folder"
        :color="link.color ? link.color.hex : ''"
        :icon="link.icon.image"
        :favorite="link.favorite"
        :created="link.created_at"
      />
    </div>
    <div v-if="links.length" class="link__count">
      Количество записей: {{ links.length }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LinksItem from '@/components/LinksItem'
import GoBack from '@/components/GoBack'
import Spinner from '@/components/Spinner'
export default {
  created() {
    this.fetchLinks()
  },
  components: {
    LinksItem,
    GoBack,
    Spinner,
  },
  computed: {
    ...mapGetters({
      links: 'links/links',
      linkLoader: 'links/linkLoader',
    }),
  },
  methods: {
    fetchLinks() {
      this.$store.dispatch('links/getLinks')
    },
  },
}
</script>
