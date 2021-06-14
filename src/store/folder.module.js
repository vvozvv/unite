import { FolderService } from '@/common/api.service'
import { getUserId } from '@/utils/auth'

const state = {
  folder: [],
  currentFolder: {},
  links: [],
  loading: false,
}
const getters = {
  folders: (state) => state.folder,
  currentFolder: (state) => state.currentFolder,
  currentFolderLinks: (state) => state.links,
  loading: (state) => state.loading,
}
const mutations = {
  SET_FOLDER: (state, payload) => {
    state.folder = payload
  },
  SET_CURRENT_FOLDER: (state, payload) => {
    state.currentFolder = payload
  },
  ADD_FOLDER: (state, payload) => {
    state.folder.push(payload)
  },
  FOLDER_LOADER_TOGGLE: (state) => {
    state.loading = !state.loading
  },
}
const actions = {
  getFolder({ commit }) {
    commit('FOLDER_LOADER_TOGGLE')
    return FolderService.query(`?user.id=${getUserId()}`)
      .then((res) => {
        commit('FOLDER_LOADER_TOGGLE')
        commit('SET_FOLDER', res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getCurrentFolder({ commit }, id) {
    return FolderService.get(id)
      .then((res) => {
        commit('SET_CURRENT_FOLDER', res.data)
        return res.data
      })
      .catch((error) => {
        console.error(error)
      })
  },
  deleteFolder({ commit, state }, id) {
    return FolderService.destroy(id)
      .then((response) => {
        const folder = state.folder.filter((item) => item.id !== response.id)
        commit('SET_FOLDER', folder)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  createFolder({ commit }, payload) {
    commit('ADD_FOLDER', payload)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
