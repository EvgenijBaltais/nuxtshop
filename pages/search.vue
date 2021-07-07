<template>
<div class = "search-wrapper">
    <div class="search-warning">
        <span class = "bold-text">Результаты поиска по вашему запросу:</span>
    </div>
    <Search_item v-for = "(item, index) in searchData" :key = 'item.id' :items = "item" :number="index"/>
    <div v-if = "!searchData.length">
        <span class = "search-not-found">
            Ничего не найдено!<br>
            Воспользуйтесь поиском в шапке сайта, чтобы подобрать интересующие Вас товары.
        </span>
    </div>
</div>
</template>

<script>
import Search_item from '../components/Search_item'
import closeMenu from '~/mixins/closeMenu.js'

export default {

    name: 'SearchPage',
    mixins: [closeMenu],
    data(){
        return {}
    },
    components: {
        Search_item
    },
    mounted(){
        // Закрыть меню
        this.closeMenu()
    },
    computed: {
        searchData(){
            return this.$store.state.search
        }
    }
}

</script>