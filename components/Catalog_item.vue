<template>
<div class = "catalog__item" :data-id = 'items.id'>
    <NuxtLink :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "catalog__piclink">
        <div class = "catalog__pic" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/' + items.img + '/1.jpg')})`}"></div>
    </NuxtLink>
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
                <NuxtLink :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "product-button product-watch" data-info = "Подробнее">
                    <div class = "product-button-inset">
                        <div class = "product-button-anim-first"></div>
                        <div class = "product-button-anim-second"></div>
                    </div>
                </NuxtLink>
                <div class = "product-button product-order" data-info = "Заказать!" @click = addToCart>
                    <div class = "product-button-inset">
                        <div class = "product-button-anim-first"></div>
                        <div class = "product-button-anim-second"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <NuxtLink :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "catalog__titlelink">
        <div class = "catalog__title">{{items.title}}</div>
    </NuxtLink>
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