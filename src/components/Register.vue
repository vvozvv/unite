<template>
  <div class="auth__form">
    <h1 class="auth__title">Регистрация</h1>
    <h2 class="auth__subtitle">
      У вас уже есть аккаунт?
      <router-link to="/auth/login" class="auth__link">Войти</router-link>
    </h2>
    <ErrorList v-if="errors" :errors="errors" />
    <form class="auth-form" @submit.prevent="registerUser">
      <input
        type="text"
        class="auth-form__input"
        placeholder="Введите юзернейм"
        v-model.trim="form.username"
      />
      <input
        type="email"
        class="auth-form__input"
        placeholder="Введите вашу почту"
        v-model="form.email"
      />
      <input
        type="password"
        class="auth-form__input"
        placeholder="Введите пароль"
        v-model="form.password"
      />
      <button
        v-if="!loading"
        class="btn btn--secondary btn--large auth-form__btn"
      >
        Регистрация
      </button>
      <button v-else class="btn btn--secondary btn--large auth-form__btn">
        <Spinner :color="['loader--white', 'loader--small']" />
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Messages from '@/utils/messages'
import ErrorList from '@/components/ErrorList'
import Spinner from '@/components/Spinner'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
      },
      loading: false,
    }
  },
  components: {
    ErrorList,
    Spinner,
  },
  watch: {
    'form.username': function (val) {
      this.form.username = val.toLowerCase().trim().replace(/\s/, '')
    },
  },
  computed: {
    ...mapGetters({
      errors: 'auth/errors',
    }),
  },
  methods: {
    checkForm() {
      this.$store.commit('auth/CLEAR_ERROR')
      if (this.form.username.length < 5) {
        this.$store.commit('auth/SET_ERROR', Messages.errorUsername)
      }
      if (this.form.password.length < 8) {
        this.$store.commit('auth/SET_ERROR', Messages.errorPassword)
      }
      if (/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(this.email)) {
        this.$store.commit('auth/SET_ERROR', Messages.errorEmail)
      }
    },
    registerUser() {
      this.checkForm()
      if (!this.errors.length) {
        this.loading = true
        this.$store.dispatch('auth/register', this.form)
          .then(() => this.$router.push('/dashboard'))
          .then(() => (this.loading = false))
          .catch(() => (this.loading = false))
      } else {
        return false
      }
    },
  },
}
</script>
