export default {
    methods: {
      closeMenu () {
        if( window.screen.width > 768) return false
        document.querySelector('.main-navigation') ? document.querySelector('.main-navigation').classList.remove('opened-menu') : ''
        document.querySelector('.menu-icon') ? document.querySelector('.menu-icon').classList.remove('open') : ''
        document.querySelector('.dark-screen') ? document.querySelector('.dark-screen').remove() : ''
      }
    }
  }