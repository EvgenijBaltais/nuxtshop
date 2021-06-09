<template>
    <div class="search-item">
        <NuxtLink :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "search-item-to" target = "_blank"></NuxtLink>
        <div class="search-column-1">
            <div class = "search-item-number">{{number + 1}}.</div>
            <div class="search-item-title">
                <NuxtLink :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "search-item-link">{{items.title}}</NuxtLink>
            </div>
            <div class = "search-description">
                {{items.description}}
            </div>
        </div>
        <div class="search-column-2">
            <img class="search-img" :src = 'require("../assets/pics/bouquets/" + items.img + "/1.webp")' alt="">
        </div>
        <div class="search-column-3">
            <div class = "search-item-price">
                <span class = "bold-text">{{items.price}}</span> руб.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search_item',
    props: {
        items: {
            type: Object,
            default(){}
        },
        number: {
            type: Number
        }
    },
    data(){
        return {}
    }
}
</script>