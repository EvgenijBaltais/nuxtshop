<template>
    <div class = "top-stripe">
        <div class = "logo-block__search">
            <div class = "logo-block__input">
                <div class="logo-block__close"></div>
                <form action="">
                    <input type="text" name = "main-search" class = "main-search" placeholder="Поиск...">
                    <button class = "main-search-btn" @click.prevent = "searchInfo"></button>
                </form>
            </div>
        </div>
        <div class = "logo-block__other">
            <div class = "alt-search" @click = "showSearch()"></div>
            <div class = "main-basket">
                <div class = "basket-content-wrap">
                    <div class = "basket-content">
                        <div class = "basket-item" v-for = "item in getCart" :key = "item.id" :data-id = "item.id">
                            <div class="basket-pic">
                                <img :src="require('../assets/pics/bouquets/' + item.img + '/1.jpg')" alt="" class = "basket-pic-img">
                            </div>
                            <div class="basket-title">
                                <span>{{item.title}}</span>
                            </div>
                            <div class = "basket-amount">
                                <div class = "cart-item-minus">
                                    <a class = "cart-item-minus-a" @click = "changeCart('minus')">-</a>
                                </div>
                                <div class = "cart-item-amount">
                                    <a class = "cart-item-amount-a">{{item.amount}}</a>
                                </div>
                                <div class = "cart-item-plus">
                                    <a class = "cart-item-plus-a" @click = "changeCart('plus')">+</a>
                                </div>
                            </div>
                            <div class="basket-price">
                                <span>{{item.price}} руб</span>
                            </div>
                            <a class="basket-remove" title = "Удалить" @click = removeFromCart></a>
                        </div>
                        <div class = "basket-item-final" v-if = getCart.length>
                            <div class = "basket-result-text">Итого:</div>
                            <div class = "basket-result-price">
                                <span class = "basket-final-number" id = "basket-final-number">{{basketFinalPrice}}</span> <span>руб</span>
                            </div>
                        </div>
                        <div class = "basket-final-tocart-w" v-if = getCart.length>
                            <NuxtLink to = "/cart" class = "basket-final-tocart">Перейти в корзину</NuxtLink>
                        </div>
                        <div class = "empty-basket" v-else>
                            <span>Корзина пока пуста</span>
                        </div>
                    </div>
                </div>
                <p class = "main-basket__text">
                    <NuxtLink to = "/cart" class = "main-basket__link">
                        <span class = "main-basket__span">Корзина товаров</span><span class = "main-basket__value">{{getCart.length}}</span>
                    </NuxtLink>
                </p>
            </div>
            <div class = "main-phone">
                <a href="tel:+79057777777" class = "main-phone__number">+7 (905) 777-77-77</a>
            </div>
            <div class = "menu-area" id = "menu-area" @click = "showBurgerMenu">
                <div class="menu-icon" id = "menu-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'TopHeaderBlock',
  components: {

  },
  data(){
      return {}
  },
  methods: {
    changeCart: function(value){
        
        this.$store.dispatch('changeCart', {
            id: this.getParent(event.target, 'basket-item').getAttribute('data-id'),
            value: value
        })
    },
    removeFromCart: function(){
        
        this.$store.dispatch('removeFromCart', {
            id: this.getParent(event.target, 'basket-item').getAttribute('data-id')
        })
    },
    getParent: function(el, cls){
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    },
    showBurgerMenu(){

        let nav = document.querySelector('.main-navigation'),
            menu = document.querySelector('.menu-icon')

        if (!nav) return false

        if (nav.classList.contains('opened-menu')) {
            nav.classList.remove('opened-menu')
            menu.classList.remove('open')
            document.querySelector('.dark-screen').remove()
            return false
        }
        
        nav.classList.add('opened-menu')
        menu.classList.add('open')
        document.querySelector('body').insertAdjacentHTML('beforeEnd', '<div class = "dark-screen"></div>')
    },
    searchInfo(){

      let search = event.target.parentNode.querySelector('.main-search')

        if (search.value == '') {
            return false
        }

        axios.get('//79.174.12.75:3001/clients_search', {
            params: {
                text: search.value
            }
        }).then(response => {

            this.$store.dispatch({
                type: 'changeSearchData',
                items: response.data
            })
        }).then(() => {
            this.$router.push('search')
        })
    },

    showSearch() {

        if (document.querySelector('.logo-block__search').classList.contains('visible-el')) {
            document.querySelector('.logo-block__search').classList.remove('visible-el')
        }
        else {
            document.querySelector('.logo-block__search').classList.add('visible-el')
        }
    }
  },
  computed: {
    getCart(){
        return this.$store.state.cart || []
    },
    basketFinalPrice(){
        let value = 0;
        if (this.getCart.length > 0) {
            for (let i = 0; i < this.getCart.length; i++) {
            value += this.getCart[i].price * this.getCart[i].amount
            }
        }
        return value
    }
  },
  mounted(){

    document.querySelector('.logo-block__close').addEventListener('click', function(){

        document.querySelector('.main-search').value = ''
        document.querySelector('.logo-block__search').classList.remove('visible-el')
    })
  }
}
</script>