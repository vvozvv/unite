import { API_URL, DEFAULT_ICON } from '@/common/config'
export default (image) => {
  return (image) ? API_URL + image.url : API_URL + DEFAULT_ICON
}