<template>
	<div class = "site-content">
	    <div class = "wrapper">
	        <div class = "site-header">
				<div class = "site-header-inside">
					<TopHeaderBlock />
					<TopHeaderLogoBlock />
					<MainNavigation />
				</div>
	        </div>
          <Nuxt />
	    </div>
	    <Footer />
    </div>
</template>

<script>

import TopHeaderBlock from '@/components/TopHeaderBlock'
import TopHeaderLogoBlock from '@/components/TopHeaderLogoBlock'
import MainNavigation from '@/components/MainNavigation'
import Footer from '@/components/Footer'

import axios from 'axios'

export default {
    name: "Mainlayout",
    data(){
        return {
        }
    },
	watch: {
		'$route' (to, from) {
		}
	},
	mounted(){

		//this.$store.dispatch('get_products')
		//this.$store.dispatch('get_categories_data')

		this.$nextTick(function () {

			document.body.classList.add('fadeIn')
		})

		window.addEventListener('load', () => {

			let wrapper = document.querySelector('.wrapper'),
				siteHeader = document.querySelector('.site-header'),
				menuHeight = siteHeader.offsetHeight

				if (window.scrollY > menuHeight) {
					
					new Promise(resolve => {
						wrapper.style.paddingTop = menuHeight + 20 + 'px'
						resolve()
					}).then(() => {
						siteHeader.classList.add('site-header-static')
					})
				}
				else {

					new Promise(resolve => {
						wrapper.style.paddingTop = 0
						resolve()
					}).then(() => {
						siteHeader.classList.remove('site-header-static')
					})
				}

			document.addEventListener('scroll', () => {

				// Статичное меню при скролле

				if (window.scrollY > menuHeight) {
					
					new Promise(resolve => {
						wrapper.style.paddingTop = menuHeight + 20 + 'px'
						resolve()
					}).then(() => {
						siteHeader.classList.add('site-header-static')
					})
				}
				else {

					new Promise(resolve => {
						wrapper.style.paddingTop = 0
						resolve()
					}).then(() => {
						siteHeader.classList.remove('site-header-static')
					})
				}
			})
		})

		// Хранение данных в localstorage

		// Данные корзины заказов

		if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length > 0) {
			this.$store.dispatch({
                type: 'existingCart',
                data: JSON.parse(localStorage.getItem('cart'))
            })
		}

		// Избранное

		if (localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites')).length > 0) {
			this.$store.dispatch({
                type: 'setFavorites',
                data: JSON.parse(localStorage.getItem('favorites'))
            })
		}
	}
}

</script>