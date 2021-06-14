import { LinksService } from '@/common/api.service'
import { getUserId } from '@/utils/auth'
const state = {
  links: [],
  favoriteLinks: [],
  currentLinkFolder: {},
  linkLoader: false,
}
const getters = {
  links: (state) => state.links,
  favoriteLinks: (state) => state.favoriteLinks,
  linkLoader: (state) => state.linkLoader,
  currentLinkFolder: (state) => state.currentLinkFolder,
}
const mutations = {
  SET_LINKS: (state, payload) => {
    state.links = payload
  },
  SET_LINKS_CURRENT_FOLDER: (state, payload) => {
    state.currentLinkFolder = payload
  },
  SET_FAVORITE_LINKS: (state, payload) => {
    state.favoriteLinks = payload
  },
  DESTROY_LINK: (state, payload) => {
    state.links = state.links.filter((item) => item.id !== payload.id)
  },
  UPDATE_LINK: (state, payload) => {
    console.log(payload)
    let idx = state.links.findIndex((item) => item.id == payload.id)
    console.log(state.links[idx])
    state.links[idx].favorite = payload.favorite
  },
  LINK_LOADER_TOGGLE: (state) => {
    state.linkLoader = !state.linkLoader
  },
}
const actions = {
  getLinks({ commit }) {
    commit('LINK_LOADER_TOGGLE')
    return LinksService.query(`?user=${getUserId()}`)
      .then(({ data }) => {
        commit('SET_LINKS', data)
        commit('LINK_LOADER_TOGGLE')
      })
      .catch((error) => {
        return error
      })
  },
  getCurrentFolderLinks({ commit }, id) {
    return LinksService.query(`?folder=${id}`)
      .then(({ data }) => {
        commit('SET_LINKS_CURRENT_FOLDER', data)
        return data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getFavoriteLinks({ commit }) {
    commit('LINK_LOADER_TOGGLE')
    LinksService.query(`?user.id=${getUserId()}&favorite=true`)
      .then(({ data }) => {
        commit('LINK_LOADER_TOGGLE')
        commit('SET_FAVORITE_LINKS', data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  destroyLink({ commit }, id) {
    console.log(id)
    return LinksService.destroy(id)
      .then(({ data }) => {
        commit('DESTROY_LINK', data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  updateLink({ commit }, payload) {
    return new Promise((resolve, reject) => {
      LinksService.update(payload.id, payload)
        .then(({ data }) => {
          commit('UPDATE_LINK', data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
