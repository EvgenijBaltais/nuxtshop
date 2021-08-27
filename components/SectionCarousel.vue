<template>
<section class = "category-section">
    <h2 class = "section-slider-title">
        <span class = "products-title">{{categories.name}}</span>
        <NuxtLink :to = "{path: `/catalog/${categories.url_name}`}" class = 'section-slider-link'>Смотреть все</NuxtLink>
    </h2>
    <hr class = "section-hr">
    <div class = "category-slider">
        <div class = "category-slider__arrow category-slider__left" @click = "slideLeft()"></div>
        <div class = "category-slider__arrow category-slider__right" @click = "slideRight()"></div>     
        <div class = "category-slider-wrapper">
            <div :class = "['category-slider__item', {'active-item': index == 0}]"
                    v-for = "(item, index) in products"
                    :key = "item.id"
                    :data-id = item.id
            >
                <div class="category-slider__picwrapper">
                    <div class="category-slider__pic" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/' + item.img + '/1.webp')})`}">
                        <NuxtLink :to = "{path: `/catalog/${item.category_url}/${item.id}`}" class = "category-slider__link"></NuxtLink>
                    </div>
                </div>
                <div>
                    <div class="product-nav">
                        <div class = "item-add-remove">
                            <div class = "decrease-value" @click = decreaseValue>−</div>
                            <div class = "item-value-block">
                                <input type="text" class = "item-value" value = "1" readonly = "readonly">
                            </div>
                            <div class = "increase-value" @click = increaseValue>+</div>
                            <div class = "item-order-options">
                                <div :class = "['product-button', 'product-favorite', {'product-favorite-active': favorites.includes(item.id)}]" @click = "checkActive" data-info = "В избранное">
                                    <div class = "product-button-inset">
                                        <div class = "product-button-anim-first"></div>
                                        <div class = "product-button-anim-second"></div>
                                    </div>
                                </div>
                                <div class = "product-button product-loupe" @click = "showGallery" data-info = "Смотреть фото">
                                    <div class = "product-button-inset">
                                        <div class = "product-button-anim-first"></div>
                                        <div class = "product-button-anim-second"></div>
                                    </div>
                                </div>
                                <NuxtLink :to = "{path: `/catalog/${item.category_url}/${item.id}`}" class = "product-button product-watch" data-info = "Подробнее">
                                    <div class = "product-button-inset">
                                        <div class = "product-button-anim-first"></div>
                                        <div class = "product-button-anim-second"></div>
                                    </div>
                                </NuxtLink>
                                <div class = "product-button product-order" data-info = "Заказать!" @click = addToCart>
                                    <div class = "product-button-inset">
                                        <div class = "product-button-anim-first"></div>
                                        <div class = "product-button-anim-second"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <NuxtLink :to = "{path: `/catalog/${item.category_url}/${item.id}`}" class = "category-slider__title">{{item.title}}</NuxtLink>
                    <p class = "category-slider__price">{{item.price}} руб.</p>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name: 'SectionCarousel',
    props: {
        categories: {
            type: Object,
            default(){}
        }
    },
    data(){
        return {
            activeElement: 0,    // Активный элемент состояния слайдера
            favorites: []
        }
    },
    methods: {
        slideRight: function(){
            const slider = event.target.parentNode
            const sliderItems = slider.querySelectorAll('.category-slider__item')
            const sliderWrapper = slider.querySelector('.category-slider-wrapper')

            if (sliderWrapper.classList.contains('moving')) return false
            if (this.activeElement >= sliderItems.length - 4) return false

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
        },
        increaseValue: function(){
            let parent = this.getParent(event.target, 'item-add-remove'),
                value = parseInt(parent.querySelector('.item-value').value)
                value < 100 ? parent.querySelector('.item-value').value = value + 1 : ''
        },
        decreaseValue: function(){
            let parent = this.getParent(event.target, 'item-add-remove'),
                value = parseInt(parent.querySelector('.item-value').value)
                value < 1 ? '' : parent.querySelector('.item-value').value = value - 1
        },
        checkActive(){

            let parent = this.getParent(event.target, 'product-button')
            
                parent.classList.contains('product-favorite-active') ?
                parent.classList.remove('product-favorite-active') :
                parent.classList.add('product-favorite-active')

                this.addToFavorite(event.target)
        },
        addToFavorite(){

            let favorites = JSON.parse(localStorage.getItem('favorites')) || []

                favorites.indexOf(event.target.getAttribute('data-id')) == -1 ?
                favorites.push(event.target.getAttribute('data-id')) :
                favorites.splice(favorites.indexOf(event.target.getAttribute('data-id')), 1)

                localStorage.setItem('favorites', JSON.stringify(favorites))

            this.$store.dispatch({
                type: 'setFavorites',
                data: favorites
            })
        },
        addToCart() {

            let parent = this.getParent(event.target, 'category-slider__item'),
                id = parent.getAttribute('data-id'),
                amount = parseInt(parent.querySelector('.item-value').value)

            if (amount <= 0) return false

            new Promise((resolve) => {
                this.$store.dispatch({
                    type: 'addToCart',
                    id: id,
                    amount: amount
                })
                resolve()
            }).then(() => {

                let wrapper, success

                    new Promise(resolve => {

                        if (document.querySelectorAll('.cart-status-wrap').length == 0) {
                            wrapper = `<div class = "cart-status-wrap"></div>`
                            document.querySelector('body').insertAdjacentHTML('afterbegin', wrapper)
                        }

                        success = `<div class = "wrap-success">
                                        <div>${parent.querySelector('.category-slider__title').innerText + " в корзине!"}</div>
                                    </div>`

                        document.querySelector('.cart-status-wrap').insertAdjacentHTML('afterbegin', success)
                        document.querySelector('.cart-status-wrap')
                            .querySelector('.wrap-success')
                            .querySelector('div')
                            .classList.add('cart-success')

                        resolve()
                    }).then(() => {
                        setTimeout(() => {
                            let wrapper = document.querySelector('.cart-status-wrap'),
                                lastSuccess = wrapper.querySelectorAll('.cart-success')[wrapper.querySelectorAll('.cart-success').length - 1]
                                lastSuccess.parentNode.removeChild(lastSuccess);

                                if (wrapper.querySelectorAll('.cart-success').length == 0) wrapper.parentNode.removeChild(wrapper);
                        }, 2000)
                    })
            })
        },
        showGallery: function(){

            let product_id = this.getParent(event.target, 'category-slider__item').getAttribute('data-id')

            if (!product_id) return false

                // Всплывающий блок с галереей
                let overlay = document.createElement('div')
                    overlay.classList.add('overlay')
                let closeGallery = this.closeGallery
                    overlay.addEventListener('click', function(e){
                        if (e.target.classList.contains('gallery') || e.target.classList.contains('gallery-img')) return false
                        closeGallery()
                    })

                // Галерея
                let gallery = document.createElement('div')
                    gallery.classList.add('gallery')

                // Закрытие
                let close = document.createElement('div')
                    close.classList.add('gallery-close')
                
                // Картинка

                let pic = document.createElement('img')
                    pic.classList.add('gallery-img')

                    try{
                        pic.src = `${require('../assets/pics/bouquets/' + product_id + '/1.webp')}`
                    }
                    catch(e){
                        pic.src = `${require('../assets/icons/no-image.png')}`
                        gallery.style.background = "#fff"
                        gallery.style.display = "flex"
                        gallery.style.alignItems = "center"
                        gallery.style.padding = '100px 0'
                    }
     
                overlay.appendChild(gallery)
                gallery.appendChild(pic)
                gallery.appendChild(close)
                document.body.appendChild(overlay)

            this.body_lock()
        },
        closeGallery: function(){
            document.querySelector('.overlay').remove()
            this.body_unlock()
        },
        getParent: function(el, cls){
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        },
        body_lock: function() {
            let body = document.querySelector('body')
            if (!body.classList.contains('scroll-locked')) {
                let bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                body.classList.add('scroll-locked');
                body.style.top = "-" + bodyScrollTop + "px"
                body.setAttribute("data-popup-scrolltop", bodyScrollTop)
            }
        },
        body_unlock: function() {

            let body = document.querySelector('body')

            if (body.classList.contains('scroll-locked')) {
                let bodyScrollTop = body.getAttribute("data-popup-scrolltop");
                body.classList.remove('scroll-locked');
                body.style.top = ""
                body.removeAttribute("data-popup-scrolltop")
                window.scrollTo(0, bodyScrollTop)
            }
        }
    },
    computed: {
        products(){

            let categoryContent = []

            if (!this.$store.state.products) return []

            for (let i = 0; i < this.$store.state.products.length; i++) {
                if (this.$store.state.products[i].category == this.categories.id)
                categoryContent.push(this.$store.state.products[i])
            }
            return categoryContent
        }
    },
    mounted(){

        // Проверить, есть ли в localstorage добавленные элементы из раздела Избранное
        localStorage.getItem('favorites') ? this.favorites = JSON.parse(localStorage.getItem('favorites')) : ''
    }
}
</script>