<template>
    <div class = "logo-block">
        <div class = "logo-block__search">
            <div class = "logo-block__input">
                <form action="">
                    <input type="text" name = "main-search" class = "main-search" placeholder="Поиск...">
                    <button class = "main-search-btn" @click.prevent = "searchInfo"></button>
                </form>
            </div>
        </div>
        <div class="logo-block__main-logo">
            <p class = "logo-title">
                <NuxtLink to = "/" class = "logo-link">ЦВЕТЫ И БУКЕТЫ</NuxtLink>
            </p>
            <p class = "logo-title-text">Лучшие цветы в Подмосковье</p>
        </div>
        <div class = "logo-block__top-info">
            <span>Бесплатная доставка по Красногорску от 1500 рублей!</span>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'TopHeaderLogoBlock',
  components: {

  },
  data(){
      return {}
  },
  methods: {
      searchInfo(){

          let search = event.target.parentNode.querySelector('.main-search')

            if (search.value == '') {
                return false
            }

            axios.get('//localhost:3001/clients_search', {
                params: {
                    text: search.value
                }
            }).then(response => {

                this.$store.dispatch({
                    type: 'changeSearchData',
                    items: response.data
                })
            }).then(() => {
                this.$router.push({ name: 'SearchPage'})
            })
      }
    }
}
</script>