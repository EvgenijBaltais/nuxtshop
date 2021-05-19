<template>
    <div>
        <div class="favorite-warning">
            <span class = "bold-text">Здесь <span v-if = "!favorite_items.length">будут</span> собраны понравившиеся Вам товары.</span>
        </div>
        <div class="favorite-items-w">
            <Catalog_item
                v-for = "item in favorite_items"
                :key = "item.id"
                :items = 'item'
            />
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

export default {

    name: 'Favorite',
    data(){
        return {
            
        }
    },
    components: {
        Catalog_item
    },
    computed: {
        favorite_items(){
            return this.$store.state.favorite
        }
    }
}
</script>