<template>
  <div class="auth__form">
    <h1 class="auth__title">Войти в аккаунт</h1>
    <h2 class="auth__subtitle">
      У вас нет аккаунта?
      <router-link to="/auth/register" class="auth__link">
        Регистрация
      </router-link>
    </h2>
    <ErrorList v-if="errors" :errors="errors" />
    <form class="auth-form" @submit.prevent="authorizationUser">
      <input
        type="text"
        class="auth-form__input"
        placeholder="Введите юзернейм"
        v-model="form.identifier"
      />
      <div class="auth-form__row">
        <input
          :type="passwordType"
          class="auth-form__input"
          placeholder="Введите пароль"
          v-model="form.password"
        />
        <div class="auth-form__show-password">
          <img
            v-if="showPassword"
            @click.prevent="togglePassword"
            src="@/assets/images/eye.svg"
            alt=""
            class="auth-form__icon"
          />
          <img
            v-else
            @click.prevent="togglePassword"
            src="@/assets/images/eye-off.svg"
            alt=""
            class="auth-form__icon"
          />
        </div>
      </div>
      <button
        v-if="!loading"
        class="btn btn--secondary btn--large auth-form__btn"
      >
        Войти
      </button>
      <button v-else class="btn btn--secondary btn--large auth-form__btn">
        <Spinner :color="['loader--white', 'loader--small']" />
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ErrorList from '@/components/ErrorList'
import Spinner from '@/components/Spinner'
export default {
  data() {
    return {
      form: {
        identifier: null,
        password: null,
      },
      showPassword: false,
      passwordType: 'password',
      loading: false,
    }
  },
  components: {
    ErrorList,
    Spinner,
  },
  computed: {
    ...mapGetters({ user: 'auth/user', errors: 'auth/errors' }),
  },
  methods: {
    authorizationUser() {
      this.loading = true
      this.$store.dispatch('auth/login', this.form)
        .then(() => this.$router.push('/dashboard'))
        .then(() => (this.loading = false))
        .catch(() => (this.loading = false))
    },
    togglePassword() {
      this.showPassword = this.showPassword ? false : true
      this.passwordType = this.showPassword ? 'text' : 'password'
    },
  },
}
</script>
