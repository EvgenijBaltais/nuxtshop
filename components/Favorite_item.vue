<template>
    <div class = "favorite-item">
        <div class="fav-pic">
            <router-link :to = "{path: `/catalog/${items.category_url}/${items.id}`}">
                <img class="fav-img" :src = 'require("../assets/pics/bouquets/" + items.img + "/1.jpg")' alt="">
            </router-link>
        </div>
        <div class="fav-title">
            <router-link :to = "{path: `/catalog/${items.category_url}/${items.id}`}" class = "">{{items.title}}</router-link>
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

<style>

.favorite-items-w:after {
    content: "";
    flex-basis: 32%;
}

.favorite-item {
    flex-basis: 32%;
    margin-bottom: 30px;
}
.fav-pic {
    height: 350px;
    align-items: center;
}
.fav-pic a {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
}
.fav-img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
}

.fav-title {
    padding: 30px 10px 10px 10px;
    text-align: center;
    font-size: 18px;
    line-height: 24px;
    color:#363D40!important;
}
.fav-title a {
    color: #363D40!important;
}

.fav-price {
    padding: 0 10px 10px 10px;
    text-align: center;
    font-size: 20px;
    line-height: 24px;
    font-weight: bold;
    color: #363D40!important;
}

</style>