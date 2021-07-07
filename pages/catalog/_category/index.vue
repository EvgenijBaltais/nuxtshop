<template>
<div class = "catalog-wrapper">
    <Dashboard_menu/>
    <div class = "catalog">
        <Catalog_filters />
        <div class = "catalog-section">
            <Catalog_item
                v-for = 'item in products.slice(0, visibleProduct)'
                :key = 'item.id'
                :items = 'item'
            />
           <div class = "no-search-results" v-if = !products.length>
               <p class = "no-data-catalog">Не удалось найти товары по выбранным параметрам.</p>
               <p class = "no-data-catalog">
                   <a href = "/catalog" class = "clear-filters-user">Обновите страницу</a> 
                   чтобы попробовать снова или выберите другие значения фильтров.
                </p>
           </div>
        </div>
        <div class = "preloader-wrapper"></div>
    </div>
</div>
</template>

<script>

import Catalog_item from '@/components/Catalog_item'
import Dashboard_menu from '@/components/Dashboard_menu'
import Catalog_filters from '@/components/Catalog_filters'
import closeMenu from '~/mixins/closeMenu.js'

export default {
    mixins: [closeMenu],
    data(){
        return {
            preloader: require('/assets/icons/2.gif'),
            bottom_pic: require('/assets/icons/to-bottom-pic.svg'),
            loading: 0,
            visibleProduct: 9999//this.$store.state.visibleProducts
        }
    },
    components: {
        Catalog_item, Dashboard_menu, Catalog_filters
    },
    mounted() {

        // Закрыть меню
        this.closeMenu()

        this.$store.dispatch('get_catalog_state', {
            category: this.$route.params.category
        })
    },
    computed: {
        products(){
            return this.$store.state.catalog_state
        }
    },
    watch: {
        $route() {
            this.$store.dispatch('get_catalog_state', {
                category: this.$route.params.category
            })
        }
    },
    methods: {
        addPreloader(){

            let preloader = document.createElement('img')
                preloader.classList.add('catalog-preloader')
                preloader.setAttribute('src', this.preloader)

            document.querySelector('.preloader-wrapper').append(preloader)
        },
        removePreloaders(){
            for (let i = 0; i < document.querySelectorAll('.catalog-preloader').length; i++) {
                document.querySelectorAll('.catalog-preloader')[i].remove()
            }
        },
        getMoreItems(){

            let allProducts = this.products

            if (this.isInViewport(document.querySelector('.preloader-wrapper'))) {
                return false
            }
            
            this.loading++

                window.removeEventListener('scroll', this.getMoreItems)
                this.addPreloader()
                this.loading = 0

            if (this.loading > 0) return false

            new Promise((resolve) => {
                setTimeout(() => {

                    this.visibleProduct < allProducts.length - 6
                    ? this.visibleProduct += 6
                    : this.visibleProduct = allProducts.length
                    resolve()
                }, 1000)
            }).then(() => {

                this.removePreloaders()

                if (this.visibleProduct != allProducts.length) {
                    window.addEventListener('scroll', this.getMoreItems)
                }
            })
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
    unmounted(){
        window.removeEventListener('scroll', this.getMoreItems)
    }
}
</script>