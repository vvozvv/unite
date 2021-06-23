import { createApp, Vue } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ApiService from '@/common/api.service'
import Toaster from '@meforma/vue-toaster'
import '@/assets/css/main.scss'
const DEFAULT_TITLE = 'UNITE'

ApiService.init()

router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch('auth/checkAuth')]).then(() => {
    next()
  })
)
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  })
})

createApp(App).use(Toaster).use(store).use(router).mount('#app')
