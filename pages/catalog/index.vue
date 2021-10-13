<template>
<div class = "catalog-wrapper">
    <Dashboard_menu :categories = "categories"/>
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
            products: [],
            categories: []
        }
    },
    async fetch() {
        this.categories = await fetch('http://79.174.12.75:3001/get_categories').then(res => res.json())
        this.products = await fetch('http://79.174.12.75:3001/catalog_products').then(res => res.json())
    },
    components: {
        Catalog_item, Dashboard_menu, Catalog_filters
    },
    methods: {
        addPreloader(){

            document.querySelector('.preloader-wrapper').style.display = 'block'
        },
        removePreloader(){
            document.querySelector('.preloader-wrapper').style.display = 'none'
        },
        isInViewport(element) {
            let rect = element.getBoundingClientRect();
            let html = document.documentElement;
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || html.clientHeight) &&
                rect.right <= (window.innerWidth || html.clientWidth)
            )
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