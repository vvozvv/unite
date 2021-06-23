import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'
import Home from '@/views/Home.vue'
import Auth from '@/views/Auth.vue'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Links from '@/components/Links.vue'
import Favorite from '@/components/Favorite'
import Statistics from '@/components/Statistics'
import Folder from '@/components/Folder/Folder'
import LinksForm from '@/components/form/FormLink'
import FolderForm from '@/components/form/FormFolder'
import FolderLinks from '@/components/Folder/FolderLinks'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: 'UNITE' },
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    children: [
      {
        path: '/auth/login',
        name: 'login',
        component: Login,
        meta: { title: 'UNITE - Войти' },
      },
      {
        path: '/auth/register',
        name: 'register',
        component: Register,
        meta: { title: 'UNITE - регистрация' },
      }
    ]
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    redirect: '/dashboard/main',
    meta: { title: 'UNITE - Панель управления' },
    children: [
      {
        path: '/dashboard/main',
        name: 'dashboard-main',
        components: {
          favorite: Favorite,
          folders: Folder,
          statistic: Statistics,
        },
      },
      {
        path: '/dashboard/links',
        name: 'links',
        component: Links,
        meta: { title: 'UNITE - Ссылки' },
      },
      {
        path: '/dashboard/links/form',
        name: 'links-form',
        component: LinksForm,
        meta: { title: 'UNITE - Создать ссылку' },
      },
      {
        path: '/dashboard/folder/form',
        name: 'folder-form',
        component: FolderForm,
        meta: { title: 'UNITE - Создать папку' },
      },
      {
        path: '/dashboard/folder/:id',
        name: 'folder-links',
        component: FolderLinks,
        meta: { title: 'UNITE - Папка' },
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!getToken()) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (getToken()) {
    next({name: 'dashboard-main'}) 
  } else {
    next()
  }
})


export default router;
