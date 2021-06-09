<template>
    <div class = "favorite-item">
        <div class="fav-pic">
            <NuxtLink :to = "{path: `/catalog/${items.category_url}/${items.id}`}">
                <img class="fav-img" :src = 'require("../assets/pics/bouquets/" + items.img + "/1.webp")' alt="">
            </NuxtLink>
        </div>
        <div class="fav-title">
            <NuxtLink :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "">{{items.title}}</NuxtLink>
        </div>
        <div class="fav-price">
            <span>{{items.price}} руб.</span>
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