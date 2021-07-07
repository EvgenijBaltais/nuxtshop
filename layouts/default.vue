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
	  mounted(){

		this.$store.dispatch('get_products')
		this.$store.dispatch('get_categories_data')

		document.addEventListener('DOMContentLoaded', function(){

			let wrapper = document.querySelector('.wrapper'),
				siteHeader = document.querySelector('.site-header'),
				menuHeight = siteHeader.offsetHeight

			document.addEventListener('scroll', function(){
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

		  // Определить данные клиента при заходе на сайт и сохранить их в таблицу клиентов, чтобы потом присвоить номер и идентифицировать его
		/*
		(function(){
/*
			let client_id = 0

			if (localStorage.getItem('client_id')) {
			client_id = localStorage.getItem('client_id')
			document.body.setAttribute('client_id', client_id)
			return false
			}
				axios
				.get('//flowers.home-trees.ru')
				.then(response => {

					if (!response.data) return false

					axios.get('//79.174.12.75:3001/save_client_data', {
					params: {
						'ip': response.data.REMOTE_ADDR,
						'user_agent': response.data.HTTP_USER_AGENT
					}
					}).then(res => {
					client_id = res.data[1][0]['LAST_INSERT_ID()']
					localStorage.setItem('client_id', res.data[1][0]['LAST_INSERT_ID()'])
					document.body.setAttribute('client_id', client_id)
					})
				})
        
		})()
		*/

		// Хранение данных в localstorage

		// Данные корзины заказов

		if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length > 0) {
			this.$store.dispatch({
                type: 'existingCart',
                data: JSON.parse(localStorage.getItem('cart'))
            })
		}

		// Избранное

		//if (localStorage.getItem('favorite')) {
		//	JSON.parse(localStorage.getItem('favorite')).length > 0 ? this.$store.state.favorite = JSON.parse(localStorage.getItem('favorite')) : ''
		//}

	}
}

</script>