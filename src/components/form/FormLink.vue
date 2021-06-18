<template>
  <form class="form form-link" @submit.prevent="sendForm">
    <p v-if="isEdit" class="form-link__title">
      Редактирование:
      <span class="form-link__title--thin">{{ form.name }}</span>
    </p>
    <ErrorList v-if="errors" :errors="errors" />
    <input
      v-model="form.name"
      type="text"
      class="form-link__input"
      placeholder="Введите название ссылки"
    />
    <input
      v-model="form.link"
      type="text"
      class="form-link__input"
      placeholder="Введите url"
    />
    <div class="form-link__row">
      <div class="form-icon">
        <div
          class="form-icon__color-box form-icon__placeholder"
          :style="{ background: selectColor.hex }"
          @click="toggleList('color')"
        >
          {{ !selectColor.hex ? 'Цвет' : '' }}
        </div>
        <img
          @click="toggleList('color')"
          src="@/assets/images/arrow-down-circle.svg"
          class="form-icon__arrow"
          :class="{ 'form-icon__arrow--active': lists.color }"
          alt="color"
        />
        <div v-if="lists.color" class="form-icon__list">
          <div
            v-for="(color, index) in colors"
            :key="index"
            :data-id="color.id"
            :data-hex="color.hex"
            :style="{ background: color.hex }"
            @click="toggleColor"
            class="form-icon__color"
          ></div>
        </div>
      </div>

      <div class="form-icon">
        <img
          :src="selectIcon.url"
          v-if="selectIcon.url"
          :alt="selectIcon.name"
          class="form-icon__select"
        />
        <p
          v-if="!selectIcon.url"
          @click="toggleList('icons')"
          class="form-icon__placeholder"
        >
          Иконка
        </p>
        <img
          @click="toggleList('icons')"
          src="@/assets/images/arrow-down-circle.svg"
          class="form-icon__arrow"
          :class="{ 'form-icon__arrow--active': lists.icons }"
          alt=""
        />
        <div v-if="lists.icons" class="form-icon__list">
          <div
            v-for="(icon, index) in icons"
            :key="index"
            class="form-icon__item"
          >
            <img
              @click.prevent="toggleSelectIcon"
              :data-id="icon.id"
              :data-url="icon.url"
              :src="icon.url"
              :alt="icon.name"
              class="form-icon__img"
            />
          </div>
        </div>
      </div>
    </div>
    <Select @input="toggleSelect" :selectValue="form.folder" />
    <div class="checkbox" @click="toggleChechbox">
      <p class="checkbox__text">Добавить в избранное?</p>
      <div class="checkbox__value">
        <img
          v-if="form.favorite"
          src="@/assets/images/star-fill.svg"
          alt=""
          class="checkbox__icon"
        />
        <img
          v-else
          src="@/assets/images/star.svg"
          alt=""
          class="checkbox__icon"
        />
      </div>
    </div>
    <button
      class="btn btn--large btn--full-width btn--secondary form-link__btn"
    >
      {{ isEdit ? 'Обновить ссылку' : 'Создать' }}
    </button>
  </form>
</template>
<script>
import { mapGetters } from 'vuex'
import Select from '@/components/Select'
import ErrorList from '@/components/ErrorList'
import { LinksService, IconService, ColorService } from '@/common/api.service'
import imageGenerate from '@/utils/image-generate'
import { getUserId } from '@/utils/auth'
import Messages from '@/utils/messages'
export default {
  data() {
    return {
      selectIcon: {},
      selectColor: {},
      colorPlaceholder: 'Выберите цвет',
      isEdit: false,
      folderOptions: [],
      errors: [],
      lists: {
        icons: false,
        color: false,
      },
      form: {
        id: null,
        name: '',
        link: '',
        favorite: false,
        color: '',
        icon: '',
        folder: null,
        user: getUserId(),
      },
      getUserId,
    }
  },
  components: {
    Select,
    ErrorList,
  },
  mounted() {
    this.fetchLinkInfo(this.$route.params.id)
    window.addEventListener('mouseup', (e) => {
      if ( e.target.closest('.form-icon__arrow') || !e.target.closest('.form-icon__list')) {
        this.lists.color = false
        this.lists.icons = false
      }
    })
    IconService.get().then((res) => {
      this.$store.dispatch('getIcons', res.data)
    })
    ColorService.get().then((res) => {
      this.$store.dispatch('getColors', res.data)
    })
  },
  computed: {
    ...mapGetters({ folders: 'folder/folders' }),
    ...mapGetters(['icons', 'colors']),
  },
  methods: {
    toggleList(type) {
      if (type === 'icons') {
        this.lists.icons = !this.lists.icons
      } else {
        this.lists.color = !this.lists.color
      }
    },
    toggleColor(e) {
      this.selectColor = {
        id: e.target.dataset.id,
        hex: e.target.dataset.hex,
      }
      this.form.color = e.target.dataset.id
    },
    toggleChechbox() {
      this.form.favorite = !this.form.favorite
    },
    toggleSelectIcon(e) {
      this.selectIcon = {
        id: e.target.dataset.id,
        url: e.target.dataset.url,
      }
      this.form.icon = e.target.dataset.id
    },
    checkForm() {
      this.errors = []
      if (this.form.name === '') {
        this.errors.push(Messages.errorName)
      }
      if (this.form.link === '') {
        this.errors.push(Messages.errorLinkName)
      }
      if (this.form.icon === '' && this.isEdit !== true) {
        this.errors.push(Messages.errorIcon)
      }
      if (this.form.color === '' && this.isEdit !== true) {
        this.errors.push(Messages.errorColor)
      }
    },
    sendForm() {
      this.checkForm()
      if (!this.errors.length) {
        const action = this.isEdit
          ? LinksService.update(this.form.id, this.form)
          : LinksService.create(this.form)
        action.then(() => {
          this.isEdit
            ? this.$toast.success(Messages.linkUpdate)
            : this.$toast.success(Messages.linkCreate)
          this.$router.push('/dashboard/links')
        })
      }
    },
    fetchLinkInfo(itemId) {
      if (itemId) {
        LinksService.get(itemId).then((res) => {
          this.isEdit = true
          this.form.id = res.data.id
          this.form.name = res.data.name
          this.form.link = res.data.link
          this.form.favorite = res.data.favorite
          this.form.icon = res.data.icon.id
          this.form.color = res.data.color.id
          this.form.folder = res.data.folder.id
          this.selectIcon = {
            id: res.data.icon.id,
            url: imageGenerate(res.data.icon.image),
            name: res.data.icon.name,
          }
          this.selectColor = {
            id: res.data.color.id,
            hex: `#${res.data.color.hex}`,
          }
        })
      }
    },
    toggleSelect(val) {
      this.form.folder = val
    },
  },
}
</script>
