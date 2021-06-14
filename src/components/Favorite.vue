<template>
  <div class="box box--mt100">
    <div class="header-block">
      <h2 class="title header-block__title">Избранное</h2>
      <router-link
        :to="{ name: 'links' }"
        class="header-block__icon-block"
        title="Добавить в избранное"
      >      
        <svg class="header-block__icon" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 2H3.333C2.597 2 2 2.597 2 3.333v9.334C2 13.403 2.597 14 3.333 14h9.334c.736 0 1.333-.597 1.333-1.333V3.333C14 2.597 13.403 2 12.667 2zM8 5.333v5.334M5.333 8h5.334" stroke="#E5E5E5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </router-link>
    </div>
    <div class="favorite box__content">
      <template v-if="loader">
        <div
          v-for="item in 3"
          :key="item"
          class="favorite__item favorite__item--skeleton"
        >
          <div class="favorite__box"></div>
          <p class="favorite__title"></p>
        </div>
      </template>
      <template v-else>
        <FavoriteItem
          v-for="(item, index) in links"
          :key="index"
          :id="item.id"
          :title="item.name"
          :link="item.link"
          :color="item.color ? item.color.hex : ''"
          :icon="item.icon.image"
        />
      </template>
      <p v-if="!loader && !links.length" class="favorite__text">
        У вас пока нет избранных ссылок.
        <router-link :to="{ name: 'links' }" class="favorite__link">
          Добавить?
        </router-link>
      </p>
    </div>
  </div>
</template>
<script>
import FavoriteItem from '@/components/FavoriteItem'
import { mapGetters } from 'vuex'
export default {
  components: {
    FavoriteItem,
  },
  mounted() {
    this.$store.dispatch('links/getFavoriteLinks')
  },
  computed: {
    ...mapGetters({
      links: 'links/favoriteLinks',
      loader: 'links/linkLoader',
    }),
  },
}
</script>
