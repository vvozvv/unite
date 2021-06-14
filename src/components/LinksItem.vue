<template>
  <div class="link-item">
    <div class="link-item__image-block">
      <img :src="iconBuild(icon)" alt="" class="link-item__icon" />
    </div>
    <div class="link-item__color" :style="colorGenerate(color)"></div>
    <p class="link-item__title">{{ title }}</p>
    <p class="link-item__text" :title="folderName">{{ cutStr(folderName, 15) }}</p>
    <a :href="link" :title="link" class="link-item__link">
      <img src="@/assets/images/link.svg" :alt="link" />
      <span>{{ cutStr(link, 15) }}</span>
    </a>
    <p
      class="link-item__date"
      :title="'Запись созданна ' + dataFilter(created)"
    >
      {{ dataFilter(created) }}
    </p>
    <div class="link-item__controlls">
      <button
        class="link-item__btn"
        @click.prevent="changeFavorite"
        :title="favorite ? messages.favoriteRemove : messages.favoriteAdd"
      >
        <img v-if="favorite" src="../assets/images/star-fill.svg" alt="" />
        <img v-else src="../assets/images/star.svg" alt="" />
      </button>
      <router-link
        :to="{ name: 'links-form', params: { id: id } }"
        class="link-item__btn"
      >
        <img src="../assets/images/edit.svg" alt="" />
      </router-link>
      <button @click.prevent="deleteItem" class="link-item__btn">
        <img src="../assets/images/destroy.svg" alt="" />
      </button>
    </div>
  </div>
</template>
<script>
import dataFilter from '@/utils/data-filter'
import iconBuild from '@/utils/image-generate'
import colorGenerate from '@/utils/color-generate'
import cutStr from '@/utils/cut-str'
import messages from '@/utils/messages'
export default {
  props: {
    id: [Number, String],
    title: String,
    link: String,
    color: String,
    icon: Object,
    favorite: Boolean,
    folder: Object,
    created: String,
  },
  data() {
    return {
      iconBuild,
      cutStr,
      dataFilter,
      colorGenerate,
      messages,
    }
  },
  computed: {
    folderName() {
      return this.folder !== null ? this.folder.name : ''
    },
  },
  methods: {
    changeFavorite() {
      this.$store.dispatch('links/updateLink', {
          id: this.id,
          favorite: !this.favorite,
        })
        .then(() => {
          this.$toast.success(messages.linkUpdate)
        })
    },
    deleteItem() {
      if (confirm(messages.deleteFavoriteLink)) {
        this.$store.dispatch('links/destroyLink', this.id).then(() => {
          this.$toast.success(messages.linkDelete)
        })
      }
    },
  },
}
</script>
