import { createApp } from 'vue'
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ApiService from '@/common/api.service'
import Toaster from '@meforma/vue-toaster'
import '@/assets/css/main.scss'

ApiService.init()

router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch('auth/checkAuth')])
  .then(() => {
    next()
  })
);

createApp(App)
.use(Toaster)
.use(store)
.use(router)
.mount("#app");
