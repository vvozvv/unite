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
      },
      {
        path: '/auth/register',
        name: 'register',
        component: Register,
      }
    ]
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    redirect: '/dashboard/main',
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
      },
      {
        path: '/dashboard/links/form',
        name: 'links-form',
        component: LinksForm,
      },
      {
        path: '/dashboard/folder/form',
        name: 'folder-form',
        component: FolderForm,
      },
      {
        path: '/dashboard/folder/:id',
        name: 'folder-links',
        component: FolderLinks,
      },
    ],
    meta: {
      requiresAuth: true,
    }
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
