<template>
    <div>
        <div class="favorite-warning">
           <span class = "bold-text">Здесь <span v-if = "!favorites.length">будут</span> собраны понравившиеся Вам товары.</span>
        </div>
        <div class = "no-search-results" v-if = "!favorites.length">
            <p class = "no-data-catalog">Здесь пока пусто.</p>
            <p class = "no-data-catalog">
                В <a href = "/catalog" class = "clear-filters-user">нашем каталоге</a> 
                много интересных товаров. Если какой-то из них понравится Вам, то
                просто добавьте его в избранное. Он будет ждать Вас в этом разделе и Вы сможете вернуться к нему позднее.
            </p>
        </div>
        <div class="favorite-items-w" v-else>
            <Catalog_item
                v-for = "item in favorites"
                :key = "item.id"
                :items = 'item'
            />
        </div>
    </div>
</template>

<script>

import Catalog_item from '../components/Favorite_item'
import closeMenu from '~/mixins/closeMenu.js'

export default {

    name: 'Favorite',
    mixins: [closeMenu],
    data(){
        return {
           
        }
    },
    components: {
        Catalog_item
    },
    mounted(){
        // Закрыть меню
        this.closeMenu()

    },
    computed: {
        favorites(){

            let products = this.$store.state.products,
                favorites = this.$store.state.favorites,
                newFavorites = []
                
            if (products.length) {
                newFavorites = products.filter((elem, i) => {
                    for (let i = 0; i < favorites.length; i++) {
                        if (elem.id == favorites[i]) return elem 
                    }
                })
            }

            return newFavorites
        }
    }
}
</script>