<template>
  <a :href="link" class="favorite__item" target="blank">
    <div class="favorite__delete" @click.prevent="deleteItem">
      <svg width="16" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.79 5.1l-6.737 6.8M5.053 5.1l6.737 6.8" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="favorite__box" :style="colorGenerate(color)">
      <img :src="iconBuild(icon)" :alt="icon.name">
    </div>
    <h3 class="favorite__title" :title="title">{{ cutStr(title) }}</h3>
  </a>
</template>
<script>
import iconBuild from '@/utils/image-generate'
import cutStr from '@/utils/cut-str'
import colorGenerate from '@/utils/color-generate'
import message from '@/utils/messages'
export default {
  props: {
    id: Number,
    title: String,
    link: String,
    color: String,
    icon: Object,
  },
  data() {
    return {
      iconBuild,
      cutStr,
      colorGenerate,
    }
  },
  methods: {
    deleteItem() {
      if (confirm(message.deleteFavoriteLink)) {
        this.$store.dispatch('links/updateLink', { id: this.id, favorite: false })
          .then(() => {
            this.$toast.success(message.linkDelete)
            location.reload()
          })
      }
    },
  },
}
</script>