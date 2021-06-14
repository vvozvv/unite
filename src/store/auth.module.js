import {
  getToken,
  setToken,
  removeToken,
  getUserId,
  setUserId,
  removeUserId,
} from '@/utils/auth'
import ApiService from '@/common/api.service'
import getError from '@/utils/error'

const state = {
  token: getToken() || null,
  user: {},
  id: getUserId() || null,
  error: [],
}
const getters = {
  token: (state) => state.token,
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user,
  id: (state) => state.id,
  errors: (state) => state.error,
}
const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload
    state.id = payload.id
    setUserId(payload.id)
  },
  PURGE_AUTH: (state) => {
    state.user = {}
    state.id = null
    removeToken()
    removeUserId()
  },
  SET_ERROR: (state, payload) => {
    state.error.push(payload)
  },
  CLEAR_ERROR: (state) => {
    state.error = []
  },
}
const actions = {
  getAuthUser({ commit }, payload) {
    commit('SET_USER', payload)
  },
  login({ commit }, condidate) {
    return new Promise((resolve, reject) => {
      ApiService.post('/auth/local', condidate)
      .then(({ data }) => {
        commit('SET_USER', data.user)
        setToken(data.jwt)
        resolve(data)
      })
      .catch((error) => {
        commit('SET_ERROR', getError(error.response))
        reject(error)
      })
    })
  },
  register({ commit }, condidate) {
    return new Promise((resolve, reject) => {
      ApiService.post('/auth/local/register', condidate)
      .then(({ data }) => {
        commit('SET_USER', data.user)
        setToken(data.jwt)
        resolve(data)
      })
      .catch((error) => {
        commit('SET_ERROR', getError(error.response, 'register'))
        reject(error)
      })
    })
  },
  checkAuth({ commit }) {
    if (getToken() && getUserId() !== 'undefined') {
      ApiService.setHeader()
      ApiService.get('users', getUserId())
      .then(({ data }) => {
        commit('SET_USER', data)
      })
      .catch(({ response }) => {
        commit('SET_ERROR', response.data.errors)
      })
    } else {
      commit('PURGE_AUTH')
    }
  },
  logout({ commit }) {
    commit('PURGE_AUTH')
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
