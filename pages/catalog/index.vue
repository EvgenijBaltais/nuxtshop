<template>
<div class = "catalog-wrapper">
    <Dashboard_menu/>
    <div class = "catalog">
        <Catalog_filters />
        <div class = "catalog-section">
            <Catalog_item
                v-for = '(item, i) in products'
                :key = 'i'
                :items = 'item'
            />
            <div class = "preloader-wrapper"></div>
            <div class = "no-search-results">
                <p class = "no-data-catalog">Не удалось найти товары по выбранным параметрам.</p>
                <p class = "no-data-catalog">
                   <a href = "/catalog" class = "clear-filters-user">Обновите страницу</a> 
                   чтобы попробовать снова или выберите другие значения фильтров.
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import Catalog_item from '../../components/Catalog_item'
import Catalog_filters from '../../components/Catalog_filters'
import Dashboard_menu from '../../components/Dashboard_menu'
import closeMenu from '~/mixins/closeMenu.js'

export default {
    mixins: [closeMenu],
    data(){
        return {
            preloader: require('../../assets/icons/1.gif'),
            bottom_pic: require('../../assets/icons/to-bottom-pic.svg'),
            loading: 0,
            visibleProduct: this.$store.state.visibleProducts
        }
    },
    components: {
        Catalog_item, Dashboard_menu, Catalog_filters
    },
    computed: {
        products(){
            return this.$store.state.catalog_state
        }
    },
    methods: {
        addPreloader(){

            document.querySelector('.preloader-wrapper').style.display = 'block'
        },
        removePreloader(){
            document.querySelector('.preloader-wrapper').style.display = 'none'
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    },
    mounted() {
        // Закрыть меню
        this.closeMenu()
    }
}
</script>