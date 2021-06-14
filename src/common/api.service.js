import axios from 'axios'
import { API_URL } from '@/common/config.js'
import { getToken, getUserId } from '../utils/auth'

export const api = axios.create()

const ApiService = {
  init() {
    api.defaults.baseURL = API_URL
  },
  setHeader() {
    api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
  },
  get(resource, slug = "") {
    return api.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    });
  },
  query(resource) {
    return api.get(resource)
  },
  post(resource, params) {
    return api.post(`${resource}`, params)
  },
  update(resource, slug, params) {
    return api.put(`${resource}/${slug}`, params)
  },
  put(resource, params) {
    return api.put(`${resource}`, params)
  },
  delete(resource) {
    return api.delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    });
  },
  count(resource) {
    return api.get(`${resource}?user=${getUserId()}`)
  },
}
export default ApiService

export const LinksService = {
  query(params) {
    return ApiService.query(`links${params}`)
  },
  get(slug) {
    return ApiService.get('links', slug)
  },
  create(params) {
    let obj = JSON.parse(JSON.stringify(params))
    return ApiService.post('links', obj)
  },
  update(slug, params) {
    return api.put(`links/${slug}`, JSON.parse(JSON.stringify(params)))
  },
  destroy(slug) {
    return ApiService.delete(`links/${slug}`)
  },
  count() {
    return ApiService.count('links')
  },
}
export const FolderService = {
  query(params) {
    return ApiService.query(`folders${params}`)
  },
  get(slug) {
    return ApiService.get('folders', slug)
  },
  create(params) {
    return ApiService.post('folders', params)
  },
  update(slug, params) {
    return ApiService.put(`folders/${slug}`, params)
  },
  destroy(slug) {
    return ApiService.delete(`folders/${slug}`)
  },
  count() {
    return ApiService.count('folders')
  },
}
export const IconService = {
  get() {
    return ApiService.get(`icons`)
  },
}
export const ColorService = {
  get(slug) {
    return ApiService.get('colors', slug)
  },
}
