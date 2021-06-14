<template>
  <GoBack />
  <form @submit.prevent="sendForm" class="form form-link">
    <p v-if="isEdit" class="form-link__title">
      Редактирование: {{ form.name }}
    </p>
    <input
      v-model="form.name"
      type="text"
      class="form-link__input"
      placeholder="Введите название папки"
    />
    <button class="btn btn--secondary btn--full-width" type="submit">
      {{ isEdit ? 'Обновить папку' : 'Создать папку' }}
    </button>
  </form>
</template>
<script>
import { FolderService } from '@/common/api.service'
import { getUserId } from '@/utils/auth'
import Messages from '@/utils/messages'
import GoBack from '@/components/GoBack'
export default {
  data() {
    return {
      isEdit: false,
      id: null,
      form: {
        name: '',
        user: getUserId(),
      },
    }
  },
  components: {
    GoBack,
  },
  mounted() {
    if (this.$route.params.id) {
      this.fetchFolder(this.$route.params.id)
    }
  },
  methods: {
    sendForm() {
      const action = this.isEdit
        ? FolderService.update(this.id, this.form)
        : FolderService.create(this.form)
      action
        .then((res) => {
          this.$store.dispatch('folder/createFolder', res.data)
          this.isEdit
            ? this.$toast.success(Messages.folderUpdate)
            : this.$toast.success(Messages.folderCreate)
          this.$router.push('/dashboard')
        })
        .catch((e) => {
          console.error(e)
          this.$toast.warning(Messages.requestErrror)
        })
    },
    fetchFolder(id) {
      this.isEdit = true
      if (id) {
        FolderService.get(id).then((res) => {
          this.id = res.data.id
          this.form.name = res.data.name
        })
      }
    },
  },
}
</script>
