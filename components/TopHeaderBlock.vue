<template>
		<div class = "top-stripe">
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
                                <span class = "basket-final-number" id = "basket-final-number">{{basketFinalPrice}}</span> руб
                            </div>
                        </div>
                        <div class = "basket-final-tocart-w" v-if = getCart.length>
                            <NuxtLink to = "/cart" class = "basket-final-tocart">Перейти в корзину</NuxtLink>
                        </div>
                        <div class = "empty-basket" v-if = !getCart.length>
                            <span>Корзина пока пуста</span>
                        </div>
                    </div>
                </div>
				<p class = "main-basket__text">
                    <NuxtLink to = "/cart" class = "main-basket__link">
						<span>Корзина товаров</span><span class = "main-basket__value">({{getCart.length}})</span>
                    </NuxtLink>
				</p>
			</div>
			<div class = "main-phone">
				<a href="tel:+79057777777" class = "main-phone__number">+7 (905) 777-77-77</a>
			</div>
		</div>
</template>

<script>
//import {mapGetters} from 'vuex'

export default {
  name: 'TopHeaderBlock',
  components: {

  },
  data(){
      return {}
  },
  methods: {
    changeCart: function(value){
        
        /*await store.dispatch('products/changeCart', {
            id: this.getParent(event.target, 'basket-item').getAttribute('data-id'),
            value: value
        })*/
        
    },
    removeFromCart: function(){
        
        /*await store.dispatch('products/removeFromCart', {
            id: this.getParent(event.target, 'basket-item').getAttribute('data-id')
        })*/
        
    },
    getParent: function(el, cls){
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
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
  }
}
</script>