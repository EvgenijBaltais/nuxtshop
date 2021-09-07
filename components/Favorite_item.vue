<template>
    <div class = "favorite-item">
        <div class="fav-pic" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/' + items.img + '/1.webp')})`}">
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
            <a class = "favorites-remove" href="">Удалить</a>
            <a class = "favorites-bron" href="">Заказать</a>
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
    }
}
</script>