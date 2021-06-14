import { JWT_TOKEN_STORAGE_ITEM_NAME } from '@/common/config.js'
export function getToken() {
  return localStorage.getItem(JWT_TOKEN_STORAGE_ITEM_NAME)
}
export function setToken(token) {
  return localStorage.setItem(JWT_TOKEN_STORAGE_ITEM_NAME, token)
}
export function removeToken() {
  return localStorage.removeItem(JWT_TOKEN_STORAGE_ITEM_NAME)
}
export function getUserId() {
  return localStorage.getItem('user_id')
}
export function setUserId(user_id) {
  return localStorage.setItem('user_id', user_id)
}
export function removeUserId() {
  return localStorage.removeItem('user_id')
}