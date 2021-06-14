<template>
  <div class="link" v-cloak>
    <GoBack />
    <div class="header-block">
      <div class="header-block__row">
        <img
          src="@/assets/images/folder-large.svg"
          :alt="'Папка' + currentFolder.name"
        />
        <h1
          class="title header-block__title"
          :class="{ 'header-block__title--loaded': loader }"
        >
          {{ currentFolder.name }}
        </h1>
        <router-link
          :to="{ name: 'folder-form', params: { id: currentFolder.id } }"
          class="header-edit"
        >
          <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.583 2.75a2.593 2.593 0 013.667 3.667L6.875 18.792l-5.042 1.375 1.375-5.042L15.583 2.75z" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="header-edit__text">Изменить</span>
        </router-link>
        <p class="header-block__delete header-edit" @click="deleteFolder">
          <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.75 5.5h16.5M7.333 5.5V3.667a1.833 1.833 0 011.834-1.834h3.666a1.833 1.833 0 011.834 1.834V5.5m2.75 0v12.833a1.833 1.833 0 01-1.834 1.834H6.417a1.833 1.833 0 01-1.834-1.834V5.5h12.834zM9.167 10.083v5.5M12.833 10.083v5.5" stroke="#C6C6C6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="header-edit__text">Удалить</span>
        </p>
      </div>
    </div>
    <Spinner v-if="loader" />
    <div class="link__header">
      <span class="link__header-item">Иконка</span>
      <span class="link__header-item">Цвет</span>
      <span class="link__header-item">Название</span>
      <span class="link__header-item">Папка</span>
      <span class="link__header-item">Ссылка</span>
      <span class="link__header-item">Дата создания</span>
      <span class="link__header-item"></span>
    </div>
    <div class="link__list">
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Spinner from '@/components/Spinner'
import LinksItem from '@/components/LinksItem'
import GoBack from '@/components/GoBack'
import Message from '@/utils/messages'
export default {
  data() {
    return {
      id: null,
      linksCount: 0,
      loader: false,
    }
  },
  async created() {
    this.loader = true
    await this.$store.dispatch('folder/getCurrentFolder', this.$route.params.id)
      .then((response) => {
        this.id = response.id
      })

    await this.$store.dispatch('links/getCurrentFolderLinks', this.id)
      .then((response) => {
        this.linksCount = response.length
      })
    this.loader = false
  },
  components: {
    LinksItem,
    GoBack,
    Spinner,
  },
  computed: {
    ...mapGetters({
      currentFolder: 'folder/currentFolder',
      links: 'links/currentLinkFolder',
    }),
  },
  methods: {
    deleteFolder() {
      this.alertBeforeDelete()
      if (!this.linksCount) {
        this.$store.dispatch('folder/deleteFolder', this.id).then(() => {
          this.$toast.success(Message.folderDelete)
          this.$router.push('/dashboard')
        })
      } else {
        alert(Message.folderIsNotEmpty)
      }
    },
    alertBeforeDelete() {
      confirm(Message.beforeDeleteFolder) ? true : false
    },
  },
}
</script>
