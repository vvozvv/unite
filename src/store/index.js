import { createStore } from 'vuex'
import authModule from './auth.module'
import linksModule from './links.module'
import folderModule from './folder.module'
import { API_URL } from '@/common/config'

export default createStore({
  state: {
    icons: [],
    colors: [],
    mobileSearch: false,
  },
  getters: {
    icons: (state) => state.icons,
    colors: (state) => state.colors,
    mobileSearch: (state) => state.mobileSearch,
  },
  mutations: {
    SET_ICON: (state, payload) => {
      state.icons = payload.map((item) => ({
        id: item.id,
        url: API_URL + item.image.url,
      }))
    },
    SET_COLORS: (state, payload) => {
      state.colors = payload.map((item) => ({
        id: item.id,
        hex: `#${item.hex}`,
      }))
    },
    TOGGLE_MOBILE_SEARCH: (state) => {
      state.mobileSearch = !state.mobileSearch
    }
  },
  actions: {
    getIcons({ commit }, payload) {
      commit('SET_ICON', payload)
    },
    getColors({ commit }, payload) {
      commit('SET_COLORS', payload)
    },
  },
  modules: {
    auth: authModule,
    links: linksModule,
    folder: folderModule,
  },
})
