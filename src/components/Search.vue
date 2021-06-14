<template>
  <div class="search" :class="{ 'search--active': mobileSearch }">
    <input
      v-model="keyword"
      type="text"
      class="search__input"
      placeholder="Поиск по ссылкам"
    />
    <div class="search__clear" @click="clearInput" title="Отчистить">
      <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2v0zM18 9l-6 6M12 9l6 6" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div
      @click="toggleMobildeSearch"
      v-if="isMobile"
      class="search__close-mobile"
    >
      <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div v-if="showResultList" class="search-result search__result">
      <p v-if="showNoResultMessage" class="seacrr-result__text">
        {{ Messages.noResultForSearch }}
      </p>
      <template v-else>
        <a
          v-for="(item, index) in linkList"
          :key="index"
          :href="item.link"
          target="blank"
          class="search-result__item"
        >
          <div
            :style="ColorGenerate(item.color.hex)"
            class="search-result__color"
          ></div>
          <img
            :src="IconGenerate(item.icon.image)"
            alt=""
            class="search-result__icon"
          />
          <span class="search-result__title">{{ CutStr(item.name, 30) }}</span>
        </a>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Messages from '@/utils/messages'
import CutStr from '@/utils/cut-str'
import ColorGenerate from '@/utils/color-generate'
import IconGenerate from '@/utils/image-generate'
import toggleMobileMenu from '@/mixins/toggle-mobile-menu.mixins'
export default {
  mixins: [toggleMobileMenu],
  data() {
    return {
      linkList: [],
      keyword: [],
      Messages,
      ColorGenerate,
      CutStr,
      IconGenerate,
    }
  },
  watch: {
    keyword() {
      if (this.keyword.trim().length === 0) {
        return this.linkList
      }
      this.linkList = this.links.filter((item) => {
        return item.name.toLowerCase().includes(this.keyword.toLowerCase())
      })
    },
  },
  computed: {
    ...mapGetters({ links: 'links/links' }),
    ...mapGetters(['mobileSearch']),
    showResultList() {
      return this.keyword.length > 0
    },
    showNoResultMessage() {
      return this.linkList.length === 0
    },
  },
  methods: {
    clearInput() {
      this.keyword = ''
    },
    toggleMobildeSearch() {
      this.$store.commit('TOGGLE_MOBILE_SEARCH')
    },
  },
}
</script>
