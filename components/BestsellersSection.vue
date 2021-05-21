<template>
    <section class = "category-section">
        <h2 class = "section-slider-title">
            <span class = "products-title">Проверенный выбор</span>
            <NuxtLink to = "/catalog" class = 'section-slider-link'>Смотреть все</NuxtLink>
        </h2>
        <hr class = "section-hr">
        <div class = "category-slider bestsellers-slider">
            <div class = "category-slider__arrow category-slider__left" v-on:click = "slideLeft()"></div>
            <div class = "category-slider__arrow category-slider__right" v-on:click = "slideRight()"></div>     
            <div class = "category-slider-wrapper">
                <div :class = "['category-slider__item', {'active-item': index == 0}]"
                        v-for = "(item, index) in bestsellers"
                        :key = "item.id">
                    <div class="category-slider__picwrapper">
                        <router-link :to = "{path: `/catalog/${item.category_url}/${item.id}`}" class = "category-slider__link">
                            <img class="category-slider__pic" :src = "require(`../assets/pics/bouquets/${item.img}/1.jpg`)" alt="">
                        </router-link>
                    </div>
                    <div>
                        <router-link :to = "{path: `/catalog/${item.category_url}/${item.id}`}" class = "category-slider__title">{{item.title}}</router-link>
                        <p class = "category-slider__price">{{item.price}} руб.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BestsellersSection',
    data(){
        return {
            activeElement: 0    // Активный элемент состояния слайдера
        }
    },
    methods: {
        slideRight: function(){

            const slider = event.target.parentNode
            const sliderItems = slider.querySelectorAll('.category-slider__item')
            const sliderWrapper = slider.querySelector('.category-slider-wrapper')

            if (sliderWrapper.classList.contains('moving')) return false
            if (this.activeElement >= sliderItems.length - 3) return false

            new Promise((resolve) => {

                // Добавить класс анимации движения

                sliderWrapper.classList.add('moving')

                // Сохранить в переменную длительность анимации для удобства

                this.animationDuration = parseFloat(getComputedStyle(document.querySelector('.moving'), null).transitionDuration) * 1000

                this.activeElement++

                let scrollSize = 0

                for (let i = 0; i < this.activeElement; i++) {
                    scrollSize += sliderItems[i].offsetWidth
                    scrollSize += parseFloat(getComputedStyle(sliderItems[i], null).marginRight)
                }

                // Поменять активный класс
                slider.querySelector('.active-item').classList.remove('active-item')
                sliderItems[this.activeElement].classList.add('active-item')

                sliderWrapper.style.marginLeft = -scrollSize + 'px'

                setTimeout(() => {
                    resolve()
                }, this.animationDuration)

            }).then(() => {
                // Удаление класса анимации
                sliderWrapper.classList.remove('moving')
            })
        },
        slideLeft: function(){

            const slider = event.target.parentNode
            const sliderItems = slider.querySelectorAll('.category-slider__item')
            const sliderWrapper = slider.querySelector('.category-slider-wrapper')

            if (sliderWrapper.classList.contains('moving')) return false
            if (this.activeElement <= 0) return false

            new Promise((resolve) => {

                // Добавить класс анимации движения

                sliderWrapper.classList.add('moving')

                // Сохранить в переменную длительность анимации для удобства

                this.animationDuration = parseFloat(getComputedStyle(document.querySelector('.moving'), null).transitionDuration) * 1000

                this.activeElement--

                let scrollSize = 0

                for (let i = 0; i < this.activeElement; i++) {
                    scrollSize += sliderItems[i].offsetWidth
                    scrollSize += parseFloat(getComputedStyle(sliderItems[i], null).marginRight)
                }

                // Поменять активный класс
                slider.querySelector('.active-item').classList.remove('active-item')
                sliderItems[this.activeElement].classList.add('active-item')

                sliderWrapper.style.marginLeft = -scrollSize + 'px'

                setTimeout(() => {
                    resolve()
                }, this.animationDuration)

            }).then(() => {
                // Удаление класса анимации
                sliderWrapper.classList.remove('moving')
            })
        }
    },
    computed: {
        bestsellers(){
            let i = 0,
                bestsellers = []

            for (let key in this.$store.state.products) {

                if (this.$store.state.products[key]['bestseller'] == 0) continue
                    bestsellers[i] = this.$store.state.products[key]
                    i++
            }
            return bestsellers
        }
    }
}
</script>