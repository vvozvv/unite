export default {
  data() {
    return {
      isMobile: /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent),
    }
  },
  methods: {
    toggleMobildeSearch() {
      this.$store.commit('TOGGLE_MOBILE_SEARCH')
    },
  },
}
