<template>
  <div class="statistics">
    <h2 class="title">Статистика</h2>
    <div class="statistics__list" :class="{ 'statistics__list--load': loader }">
      <div class="statistics__item">
        <Spinner v-if="loader" />
        <p class="statistics__title">Всего добавленно ссылок</p>
        <div class="statistics__row">
          <p class="statistics__num">{{ countLinks || 0 }}</p>
          <img
            src="@/assets/images/statistics-link.svg"
            alt="Всего добавленно ссылок"
            class="statistics__icon"
          />
        </div>
      </div>
      <div class="statistics__item">
        <Spinner v-if="loader" />
        <p class="statistics__title">Всего добавленно папок</p>
        <div class="statistics__row">
          <p class="statistics__num">{{ countFolder || 0 }}</p>
          <img
            src="@/assets/images/statistics-folder.svg"
            alt="Всего добавленно папок"
            class="statistics__icon"
          />
        </div>
      </div>
      <div class="statistics__item">
        <Spinner v-if="loader" />
        <p class="statistics__title">Всего в избранном</p>
        <div class="statistics__row">
          <p class="statistics__num">{{ favoriteLinks.length || 0 }}</p>
          <img
            src="@/assets/images/statistics-star.svg"
            alt="Всего в избранном"
            class="statistics__icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LinksService, FolderService } from '@/common/api.service'
import { mapGetters } from 'vuex'
import Spinner from '@/components/Spinner'
export default {
  data() {
    return {
      countLinks: null,
      countFolder: null,
      loader: false,
    }
  },
  components: {
    Spinner,
  },
  mounted() {
    this.loader = true
    const links = LinksService.count().then((res) => {
      this.countLinks = res.data.length
    })
    const folders = FolderService.count().then(
      (res) => (this.countFolder = res.data.length)
    )
    Promise.all([links, folders]).then(
      () => (this.loader = false),
      (reason) => reason
    )
  },
  computed: {
    ...mapGetters({
      links: 'links/links',
      favoriteLinks: 'links/favoriteLinks',
    }),
  },
}
</script>
