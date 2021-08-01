<template>
    <div>
        <div class="favorite-warning">
            <span class = "bold-text">Здесь <span v-if = "!favorite_items.length">будут</span> собраны понравившиеся Вам товары.</span>
        </div>
        <div class="favorite-items-w"><!--
            <Catalog_item
                v-for = "item in favorite_items"
                :key = "item.id"
                :items = 'item'
            />-->
           <div class = "no-search-results" v-if = !favorite_items.length>
               <p class = "no-data-catalog">Здесь пока пусто.</p>
               <p class = "no-data-catalog">
                   В <a href = "/catalog" class = "clear-filters-user">нашем каталоге</a> 
                   много интересных товаров. Если какой-то из них понравится Вам, то
                   просто добавьте его в избранное. Он будет ждать Вас в этом разделе и Вы сможете вернуться к нему позднее.
                </p>
           </div>
        </div>
    </div>
</template>

<script>

import Catalog_item from '../components/Catalog_item'
import closeMenu from '~/mixins/closeMenu.js'

export default {

    name: 'Favorite',
    mixins: [closeMenu],
    data(){
        return {}
    },
    components: {
        Catalog_item
    },
    mounted(){
        // Закрыть меню
        this.closeMenu()

        //console.log(localStorage.getItem('favorite'))

    
        // Найти в массиве товаров по id нужный объект с данными по элементу и отправить в state с избранным

        // Убрать отсюда массив и добавить только id нужных элементов, а далее искать их в state, иначе массив хранится в странном виде
        this.$store.dispatch({
            type: 'setFavorite',
            product: localStorage.getItem('favorite')
        })

        //console.log(this.$store.state.favorite)
    },
    computed: {
        favorite_items(){
            return this.$store.state.favorite
        }
    }
}
</script>