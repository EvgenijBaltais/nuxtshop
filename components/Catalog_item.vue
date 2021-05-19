<template>
<div class = "catalog__item" :data-id = 'items.id'>
    <router-link :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "catalog__piclink">
        <div class = "catalog__pic" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/' + items.img + '/1.jpg')})`}"></div>
    </router-link>
    <div class="product-nav">
        <div class = "item-add-remove">
            <div class = "decrease-value" @click = decreaseValue>−</div>
            <div class = "item-value-block">
                <input type="text" class = "item-value" value = "1" readonly = "readonly">
            </div>
            <div class = "increase-value" @click = increaseValue>+</div>
            <div class = "item-order-options">
                <div :class = "['product-button', 'product-favorite', {'product-favorite-active': favoriteItems.includes(items.id)}]" @click = "checkActive" data-info = "В избранное">
                    <div class = "product-button-inset">
                        <div class = "product-button-anim-first"></div>
                        <div class = "product-button-anim-second"></div>
                    </div>
                </div>
                <div class = "product-button product-loupe" data-info = "Смотреть фото">
                    <div class = "product-button-inset">
                        <div class = "product-button-anim-first"></div>
                        <div class = "product-button-anim-second"></div>
                    </div>
                </div>
                <router-link :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "product-button product-watch" data-info = "Подробнее">
                    <div class = "product-button-inset">
                        <div class = "product-button-anim-first"></div>
                        <div class = "product-button-anim-second"></div>
                    </div>
                </router-link>
                <div class = "product-button product-order" data-info = "Заказать!" @click = addToCart>
                    <div class = "product-button-inset">
                        <div class = "product-button-anim-first"></div>
                        <div class = "product-button-anim-second"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-link :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "catalog__titlelink">
        <div class = "catalog__title">{{items.title}}</div>
    </router-link>
        <div class = "catalog__description">{{items.short_description}}</div>
    <div class = "catalog__price">{{items.price}} руб.</div>
</div>
</template>

<script>
export default {
    name: 'Catalog_item',
    props: {
            items: {
            type: Object,
            default(){}
        }
    },
    data(){
        return {}
    },
    methods: {

        increaseValue: function(){
            let parent = this.getParent(event.target, 'item-add-remove'),
                value = parseInt(parent.querySelector('.item-value').value)
                value < 100 ? parent.querySelector('.item-value').value = value + 1 : ''
        },
        decreaseValue: function(){
            let parent = this.getParent(event.target, 'item-add-remove'),
                value = parseInt(parent.querySelector('.item-value').value)
                value < 1 ? '' : parent.querySelector('.item-value').value = value - 1
        },
        addToCart() {

            let parent = this.getParent(event.target, 'catalog__item'),
                id = parent.getAttribute('data-id'),
                amount = parseInt(parent.querySelector('.item-value').value)

            if (amount <= 0) return false

            new Promise((resolve) => {
                this.$store.dispatch({
                    type: 'addToCart',
                    id: id,
                    amount: amount
                })
                resolve()
            }).then(() => {

                let wrapper, success

                    new Promise(resolve => {

                        if (document.querySelectorAll('.cart-status-wrap').length == 0) {
                            wrapper = `<div class = "cart-status-wrap"></div>`
                            document.getElementById('app').insertAdjacentHTML('afterbegin', wrapper)
                        }

                        success = `<div class = "wrap-success">
                                        <div>${parent.querySelector('.catalog__title').innerText + " в корзине!"}</div>
                                    </div>`

                        document.querySelector('.cart-status-wrap').insertAdjacentHTML('afterbegin', success)
                        document.querySelector('.cart-status-wrap')
                            .querySelector('.wrap-success')
                            .querySelector('div')
                            .classList.add('cart-success')

                        resolve()
                    }).then(() => {
                        setTimeout(() => {
                            let wrapper = document.querySelector('.cart-status-wrap'),
                                lastSuccess = wrapper.querySelectorAll('.cart-success')[wrapper.querySelectorAll('.cart-success').length - 1]
                                lastSuccess.parentNode.removeChild(lastSuccess);

                                if (wrapper.querySelectorAll('.cart-success').length == 0) wrapper.parentNode.removeChild(wrapper);
                        }, 2000)
                    })
            })
        },
        checkActive(){

            let parent = this.getParent(event.target, 'product-button')
            
                parent.classList.contains('product-favorite-active') ?
                parent.classList.remove('product-favorite-active') :
                parent.classList.add('product-favorite-active')

                this.addToFavorite(event.target)
        },
        addToFavorite(){

            // Найти в массиве товаров по id нужный объект с данными по элементу и отправить в state с избранным
            this.$store.dispatch({
                type: 'changeFavorite',
                product: this.items
            })
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    },
    computed: {
        favoriteItems(){

            let arr = []

            for (let i = 0; i < this.$store.state.favorite.length; i++) {
                arr.push(this.$store.state.favorite[i].id)
            }
            return arr
        }
    }
}

</script>

<style scoped>

.catalog__item {
    box-sizing: border-box;
    flex-basis: 295px;
    margin-bottom: 25px;
}

.catalog__piclink {
    color: #000;
    text-decoration: none;
}
.catalog__titlelink {
    color: #000;
    text-decoration: none;
}

.catalog__pic {
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    height: 250px;
    margin-bottom: 20px;
}

.catalog__title {
    text-align: center;
    margin: 20px 0 10px 0;
    font-weight: bold;
}

.catalog__price {
    margin: 10px 0;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
}

.catalog__description {
    text-align: center;
}

.catalog:after {
    content: '';
    flex-basis: 265px;
}

.product-nav {
    margin: 5px 0;
}
.item-add-remove {
    width: 220px;
    margin: 0 auto;
    display: flex;
}
.item-value-block {
    width: 34px;
    height: 30px;
    user-select: none;
}
.item-value-block .item-value {
    display: block;
    margin: 0% auto;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    font-family: Arial, Helvetica, sans-serif;
    width: 34px;
    height: 30px;
    outline: 0;
    border: 0;
    user-select: none;
    color:000;
}
.decrease-value {
    width: 20px;
    height: 30px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    line-height: 32px;
    cursor: pointer;
    user-select: none;
}
.increase-value {
    width: 20px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
}
.item-order-options {
    width: 132px;
    display: flex;
    margin-left: auto;
    justify-content: space-between;
}
.watch-item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #94cbe0;
    background-image: url('../assets/icons//eye.svg');
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
}
.order-item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #94cbe0;
    background-image: url('../assets/icons/cart-white.svg');
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
}
.product-button-inset {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    background-color: #94CBE0;
    -webkit-transition: .3s ease;
    -moz-transition: .3s ease;
    -o-transition: .3s ease;
    transition: .3s ease;
}
.product-button-inset:hover {
    bottom: -30px;
    background: #6FA6BB;
    transition: background-color .3s;
    transition: bottom .3s;
}
.product-button-anim-first {
    width: 30px;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
}
.product-button-anim-second {
    width: 30px;
    height: 30px;
    font-size: 15px;
}
.product-buttons-container {
    position: relative;
    width: 200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
}
.product-button {
    display: block;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
}

/* Кнопки в карточке продуктов */

.products-amount {
    color: #fff;
    line-height: 30px;
}

.product-plus {
    font-size: 16px;
    line-height: 30px;
}

.product-watch {
    display: block;
    text-decoration: none;
}

.product-order {
    display: block;
    text-decoration: none;
}

.product-watch .product-button-anim-first {
    background-image: url('../assets/icons/eye.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-watch .product-button-anim-second {
    background-image: url('../assets/icons/eye.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-order .product-button-anim-first {
    background-image: url('../assets/icons/cart-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-order .product-button-anim-second {
    background-image: url('../assets/icons/cart-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-favorite .product-button-anim-first {
    background-image: url('../assets/icons/heart.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-favorite .product-button-anim-second {
    background-image: url('../assets/icons/heart.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-favorite-active .product-button-anim-first {
    background-image: url('../assets/icons/heart-red.svg');
}

.product-favorite-active .product-button-anim-second {
    background-image: url('../assets/icons/heart-red.svg');
}

.product-loupe .product-button-anim-first {
    background-image: url('../assets/icons/loupe-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

.product-loupe .product-button-anim-second {
    background-image: url('../assets/icons/loupe-white.svg');
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: center;
}

/* Кнопки в карточке продуктов */

</style>