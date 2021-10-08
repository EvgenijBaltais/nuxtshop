<template>
        <div class="catalog-filters">
            <div class = "show-vars-w">
                <span class = "filters-title">Уточнить условия поиска:</span>
                <a class = "show-filter-variants" @click.prevent = "showFilterVariants">Показать</a>
            </div>
            <div class = "filters-form-w" id = "filters-form-w">
                <form action="" class = "filters-form" id = "filters-form">
                    <div class="form_radio">
                        <input id="radio-1" type="radio" name="filter-default" value="1" @change = "remakeCatalog" checked>
                        <label for="radio-1" class = "price-change" id = "price-default">По умолчанию</label>
                    </div>
                    <div class="form_radio">
                        <input id="radio-2" type="radio" name="filter-default" value="2" @change = "remakeCatalog">
                        <label for="radio-2" class = "price-change" id = "price-min-to-max">По цене (от <span class = "min-val"></span> до <span class = "max-val"></span> рублей)</label>
                    </div>
                    <div class="form_radio">
                        <input id="radio-3" type="radio" name="filter-default" value="3" @change = "remakeCatalog">
                        <label for="radio-3" class = "price-change" id = "price-max-to-min">По цене (от <span class = "max-val"></span> до <span class = "min-val"></span> рублей)</label>
                    </div>
                    <div class="form_radio">
                        <input id="radio-4" type="radio" name="filter-default" value="4" @change = "remakeCatalog">
                        <label for="radio-4" class = "price-change" id = "price-alfabet">По алфавиту</label>
                    </div>
                    <div class="range-wrapper">
                        <p class = "filters-title">Выбрать по цене:</p>
                        <div id = "range-slider" class = "range-slider"></div>
                        <div class="range-slide-prices">
                            <label for="price-range-from">
                                <div class = "price-range-v">Цена от:</div>
                                <div class = "price-range-p">руб.</div>
                                <input type="text" class = "price-range price-range-from" id = "price-range-from">
                            </label>
                            <label for="price-range-to">
                                <div class = "price-range-v">Цена до:</div>
                                <div class = "price-range-p">руб.</div>
                                <input type="text" class = "price-range price-range-to" id = "price-range-to">
                            </label>
                            <button type = "button" class = "get-range-query" id = "get-range-query">Подобрать</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
</template>

<script>

import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'

export default {
    data(){
        return {}
    },
    methods: {
        showFilterVariants(){

            let parent = this.getParent(event.target, 'catalog-filters')

            if (parent.classList.contains('opened-item')) {

                document.getElementById('filters-form-w').style.height = 0

                parent.classList.remove('opened-item')
                event.target.innerText = "Показать"
            }
            else {
                document.getElementById('filters-form-w').style.height = document.getElementById('filters-form').clientHeight + 'px'
                parent.classList.add('opened-item')
                event.target.innerText = "Скрыть"
            }
        },
        remakeCatalog(){

            new Promise((resolve) => {

                this.remakeBackground(document.querySelector('.catalog-section'))

                setTimeout(() => {
                    resolve()
                }, 250)
            }).then(() => {
                this.$store.dispatch('sort_catalog', {
                    'filters': this.collectFilters()
                }).then(() => {
                    this.remakeBackground(document.querySelector('.catalog-section'))
                })
            })
        },
        remakeBackground(catalogBlock){

            if (catalogBlock.querySelectorAll('.remaking-loading').length) {
                for (let i = 0; i < catalogBlock.querySelectorAll('.remaking-loading').length; i++) {
                    catalogBlock.querySelectorAll('.remaking-loading')[i].remove()
                }
                return false
            }
            catalogBlock.insertAdjacentHTML('beforeend', '<div class = "remaking-loading"></div>')
        },
        collectFilters(){

            // Объект со всеми параметрами для фильтрации, а именно
            // - Тэги и категории из левого меню
            // В каталоге:
            // - Ползунок-слайдер
            // - Сортировка по алфавиту, цене от-до и наоборот
            // - Категория товара

            let filters = new Object({
                tags: {},
                radioFilter: 0,
                from: 0,
                to: 0,
                category: this.$route.params.category
            })

            // Тэги и категории из левого меню

            if (document.getElementById('choosen-filters')) {
                let leftTags = document.getElementById('choosen-filters').querySelectorAll('.filter-link-choosen')

                // Добавить категории фильтров

                for (let i = 0; i < document.querySelectorAll('.tags-section').length; i++) {
                    filters['tags'][document.querySelectorAll('.tags-section')[i].getAttribute('data-category')] = []
                }

                // Добавить значения выбранных тэгов

                for (let i = 0; i < leftTags.length; i++) {
                    let tagName = Object.keys(leftTags[i].dataset)[0]
                    if (filters['tags'][tagName]) {
                        filters['tags'][tagName].push(leftTags[i].getAttribute('data-' + tagName))
                    }
                }
            }

            // Добавить значение радиокнопок в каталоге

            let radioFilters = document.querySelectorAll('.form_radio')

            for (let i = 0; i < radioFilters.length; i++) {
                if (radioFilters[i].querySelector('input[name="filter-default"]').checked) {
                    filters.radioFilter = radioFilters[i].querySelector('.price-change').getAttribute('id')
                    break
                }
            }

            // Значение ползунка-слайдера

            if (document.getElementById('price-range-from')) {
                filters.from = document.getElementById('price-range-from').value
            }
            if (document.getElementById('price-range-to')) {
                filters.to = document.getElementById('price-range-to').value
            }

            return filters
        },
        clearFilters(){

            if (!document.querySelectorAll('input[name="filter-default"]').length) return false

            for (let i = 0; i < document.querySelectorAll('input[name="filter-default"]').length; i++) {
                if (i == 0) {
                    document.querySelectorAll('input[name="filter-default"]')[i].checked = true
                }
                else {
                    document.querySelectorAll('input[name="filter-default"]')[i].checked = false
                }
            }
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    },
    beforeMount(){

        let $this = this

        this.$store.dispatch('get_catalog_state').then(() => {

                let min = 0, max = 1,
                    from = document.getElementById('price-range-from'),
                    to = document.getElementById('price-range-to'),
                    inputs = [from, to],
                    stepsSlider = document.getElementById('range-slider')

                // Определить минимальную и максимальную цены

                for (let i = 0; i < this.$store.state.catalog_state.length; i++) {

                    let item = this.$store.state.catalog_state[i].price

                    if (max < item) max = item
                    if (min == 0) min = item
                    if (min > item) min = item
                }

                // Записать минимальную и максимальную цены в соответствующие классы

                for (let i = 0; i < document.querySelectorAll('.min-val').length; i++) {
                    document.querySelectorAll('.min-val')[i].innerText = min
                }

                for (let i = 0; i < document.querySelectorAll('.max-val').length; i++) {
                    document.querySelectorAll('.max-val')[i].innerText = max
                }

                inputs[0].dataset.numValue = min
                inputs[1].dataset.numValue = max

                // Ползунок-слайдер с минимальной и максимальной ценой

                noUiSlider.create(stepsSlider, {
                    start: [min, max],
                    animate: true,
                    tooltips: [true, true],
                    format: {
                        to: function ( value ) {
                            return Math.round(value)
                        },
                        from: function ( value ) {
                            return Math.round(value)
                        }
                    },
                    connect: true,
                    range: {
                        'min': min,
                        'max': max
                    }
                })

            stepsSlider.noUiSlider.on('update', function (values, handle) {
                inputs[handle].value = values[handle];
            })

            stepsSlider.noUiSlider.on('start', function () {
                $this.remakeBackground(document.querySelector('.catalog-section'))
            })

            stepsSlider.noUiSlider.on('end', function () {
                $this.$store.dispatch('sort_catalog', {
                    'filters': $this.collectFilters()
                }).then(() => {
                    $this.remakeBackground(document.querySelector('.catalog-section'))
                })

                if ($this.$store.state.catalog_state.length === 0) {

                    document.querySelector('.no-search-results').style.display = "block"
                    document.querySelector('.preloader-wrapper').style.display = "none"
                }
                else {
                    document.querySelector('.no-search-results').style.display = "none"
                    document.querySelector('.preloader-wrapper').style.display = "block"
                }
            })

            // Listen to keydown events on the input field.
            inputs.forEach(function (input, handle) {
                input.addEventListener('keydown', function () {
                    if (event.keyCode == 13) stepsSlider.noUiSlider.setHandle(handle, this.value)
                })
            })

            document.querySelector('.get-range-query').addEventListener('click', function(e){
                e.preventDefault()

                $this.remakeBackground(document.querySelector('.catalog-section'))
                $this.clearFilters()

                setTimeout(() => {
                    $this.$store.dispatch('sort_catalog', {
                        'filters': $this.collectFilters()
                    }).then(() => {
                        $this.remakeBackground(document.querySelector('.catalog-section'))
                    })
                }, 250)
            })
        })
    }
}
</script>