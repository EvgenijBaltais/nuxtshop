<template>
    <div class = "favorite-item" :data-id = "items.id">
        <div class="fav-pic" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/' + items.img + '/1.jpg')})`}">
            <NuxtLink :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "fav-pic-link"></NuxtLink>
        </div>
        <div class = "fav-title-w">
            <div class="fav-title">
                <NuxtLink :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "">{{items.title}}</NuxtLink>
            </div>
            <div class="fav-price">
                <span>{{items.price}} руб.</span>
            </div>
        </div>
        <div class = "fav-btns-w">
            <a class = "favorites-action favorites-remove" @click.prevent = "removeFromFavorites">Удалить</a>
            <a class = "favorites-action favorites-bron" @click.prevent = "addToCart">В корзину</a>
        </div>
    </div>
</template>

<script>
export default {

    name: 'Favorite_item',
    props: {
        items: {
            type: Object,
            default(){}
        }
    },
    data(){
        return {

        }
    },
    methods: {

        removeFromFavorites(){

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [],
                arr = []
                
                for (let i = 0; i < favorites.length; i++) {
                    if (favorites[i] == this.getParent(event.target, 'favorite-item').getAttribute('data-id')) continue
                    arr.push(favorites[i])
                }

                localStorage.setItem('favorites', JSON.stringify(arr))

            this.$store.dispatch({
                type: 'setFavorites',
                data: arr
            })
        },
        addToCart() {

            let parent = this.getParent(event.target, 'favorite-item'),
                id = parent.getAttribute('data-id')

            new Promise((resolve) => {
                    this.$store.dispatch({
                    type: 'addToCart',
                    id: id,
                    amount: 1
                })
                resolve()
            }).then(() => {

                let wrapper, success

                    new Promise(resolve => {

                        if (document.querySelectorAll('.cart-status-wrap').length == 0) {
                            wrapper = `<div class = "cart-status-wrap"></div>`
                            document.querySelector('body').insertAdjacentHTML('afterbegin', wrapper)
                        }

                        success = `<div class = "wrap-success">
                                        <div>${parent.querySelector('.fav-title').innerText + " в корзине!"}</div>
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
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    }
}
</script>