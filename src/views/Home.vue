<template>
  <section class="home">
    <div class="container">
      <div id="parallax-fade" class="home__box">
        <img src="@/assets/images/logo-large.svg" alt="" class="home__logo">
        <h1 class="home__title">Объедени все ссылки в одном месте</h1>
        <div class="home__row">
          <router-link to="/auth/login" class="btn home__btn">Войти</router-link>
          <router-link to="/register" class="btn">Регистрация</router-link>
        </div>
      </div>
      <img src="@/assets/images/preview-page.png" alt="" id="parallax-01" class="home__preview">
      <router-link to="/register" class="text-circle">
        <p id="animate-text" class="text-circle__text">Регистрация Регистрация Регистрация</p>
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.06.94a1.5 1.5 0 00-2.12 0l-9.547 9.545a1.5 1.5 0 102.122 2.122L12 4.12l8.485 8.486a1.5 1.5 0 102.122-2.122L13.06.94zM13.5 24V2h-3v22h3z" fill="#838383"/></svg>
      </router-link>
      <div class="footer">
        <div class="footer__about-author">
          <div class="footer__img">
            <img src="@/assets/images/author.png" alt="">
          </div>
          <div class="footer__info">
            <p class="footer__author">Aleksei Vazhov</p>
            <p class="footer__special">Web.dev & design</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import CircleType from 'circletype'
import toggleMobileMenu from '@/mixins/toggle-mobile-menu.mixins'
export default {
  name: 'Home',
  mixins: [toggleMobileMenu],
  mounted() {
    const animateText = document.getElementById('animate-text')
    const parallaxImage = document.getElementById('parallax-01')
    const parallaxFade = document.getElementById('parallax-fade')
    new CircleType(animateText)

    if (!this.isMobile) {
      document.addEventListener('scroll', function () {
        const scrollPos = window.pageYOffset
        document.getElementById('animate-text').style.transform = `rotate(${ scrollPos / 4 }deg)`
        parallaxImage.style.top = `${scrollPos / -2.8}px`
        parallaxFade.style.opacity = `${ 1 - (scrollPos / 700) }`
      })
    }
  },
}
</script>