<template>
    <div class="search-item" @click = "goToProduct">
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
            <img class="search-img" :src = 'require("../assets/pics/bouquets/" + items.img + "/1.jpg")' alt="">
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
    },
    computed(){

    },
    mounted(){
        //console.log(this.items)
    },
    methods: {
        goToProduct(){
            window.location.href = '/catalog/' + this.items.id
        }
    }
}
</script>

<style>
.search-item {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 3px;
    transition: background .2s;
}

.search-item:hover {
    transition: background .2s;
    background: #DBDDDE;
}

.search-column-1 {
    width: calc(100% - 270px);
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.search-item-number {
    width: 30px;
    font-size: 20px;
    line-height: 24px;
    color: #363D40!important;
}

.search-item-title {
    width: calc(100% - 30px);
    padding-bottom: 5px;
}

.search-item-link {
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    color: #363D40!important;
}

.search-description {
    width: calc(100% - 30px);
    padding-right: 20px;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 22px;
}

.search-pics {
    width: calc(100% - 30px);
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
}

.search-img {
    max-width: 100px;
    max-height: 100px;
}

.search-column-2 {
    width: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}

.search-column-3 {
    width: 150px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
}

.search-item-price {
    font-size: 20px;
}
</style>