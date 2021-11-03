<template>
<div class = "slider-section">
    <div class = "main-slider__wrapper">
        <div class = "main-slider">
            <div class = "glide glide-main">
                <div class = "glide-main__left" @click = "moveLeft"></div>
                <div class = "glide-main__right" @click = "moveRight"></div>
                <div class = "glide-main__dots"></div>
                <div data-glide-el="track" class="glide__track">
                    <ul class="glide__slides">
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <div class = "main-slider__mainpic lazy-loading-pic" :data-pic-id = "1" data-pic-category = "bouquets" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/1/1.jpg')})`}"></div>
                            </NuxtLink>
                        </li>
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <div class = "main-slider__mainpic lazy-loading-pic" :data-pic-id = "2" data-pic-category = "bouquets" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/2/1.jpg')})`}"></div>
                            </NuxtLink>
                        </li>
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <div class = "main-slider__mainpic lazy-loading-pic" :data-pic-id = "3" data-pic-category = "bouquets" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/3/1.jpg')})`}"></div>
                            </NuxtLink>
                        </li>
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <div class = "main-slider__mainpic lazy-loading-pic" :data-pic-id = "4" data-pic-category = "bouquets" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/4/1.jpg')})`}"></div>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class = "main-slider__title">
                <p class = "slider-title">
                    <NuxtLink :to = "{path: `/catalog/bouquets/1`}" class = "main-slider__href">Golden Sunshine</NuxtLink>
                </p>
                <p class = "slider-price">
                    <NuxtLink :to = "{path: `/catalog/bouquets/1`}" class = "main-slider__href">12 000 р</NuxtLink>
                </p>
            </div>
            <div class = "main-slider__text">
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.</span>
            </div>
        </div>
    </div>
    <div class = "info-banners" v-if = "this.isDesktop">
        <div class = "info-banner">
            <div class="info-banner__pic">
                <div alt="" class = "main-slider__minipic lazy-loading-pic" :data-pic-id = "5" data-pic-category = "bouquets" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/5/1.jpg')})`}"></div>
                <p class = "info-banner__title">Lorem ipsum dolor</p>
                <p class = "info-banner__price">25000 р</p>
            </div>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <div alt="" class = "main-slider__minipic lazy-loading-pic" :data-pic-id = "6" data-pic-category = "bouquets" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/6/1.jpg')})`}"></div>
                <p class = "info-banner__title">Lorem ipsum dolor</p>
                <p class = "info-banner__price">25000 р</p>
            </div>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <div alt="" class = "main-slider__minipic lazy-loading-pic" :data-pic-id = "7" data-pic-category = "bouquets" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/7/1.jpg')})`}"></div>
                <p class = "info-banner__title">Lorem ipsum dolor</p>
                <p class = "info-banner__price">25000 р</p>
            </div>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <div alt="" class = "main-slider__minipic lazy-loading-pic" :data-pic-id = "8" data-pic-category = "bouquets" :style = "{backgroundImage: `url(${require('../assets/pics/bouquets/8/1.jpg')})`}"></div>
                <p class = "info-banner__title">Lorem ipsum dolor</p>
                <p class = "info-banner__price">25000 р</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import Glide from '@glidejs/glide'

export default {
  name: 'SlideSection',
  data(){
      return {
        isDesktop: 1,
        glide: {}
      }
  },
  methods: {

        moveLeft(){
            this.glide.go('<')
        },

        moveRight(){
            this.glide.go('>')
        }
  },
  mounted(){

    // Моб / не моб
    window.screen.width < 768 ? this.isDesktop = false : ''

    /* Главная карусель */

        for (let i = 0; i < document.querySelectorAll('.main-slider__carousel:not(.glide__slide--clone)').length; i++) {
            document.querySelector('.glide-main__dots').insertAdjacentHTML('beforeend',`<div class = "glide-main__dot${i == 0 ? ' glide-main__dot-active' : ''}"></div>`)
        }

        this.glide = new Glide('.glide', {
            autoplay: false,
            type: 'carousel',
            hoverpause: true,
            animationDuration: 500,
            animationTimingFunc: 'ease-in-out'
        })

        let myGlide = this.glide

        this.glide.on('run.before', function(){
            document.querySelector('.glide-main__dot-active').classList.remove('glide-main__dot-active')
        })
        this.glide.on('run', function(){
            document.querySelectorAll('.glide-main__dot')[myGlide.index].classList.add('glide-main__dot-active')
        })

        this.glide.mount()

        for (let i = 0; i < document.querySelectorAll('.glide-main__dot').length; i++) {

            document.querySelectorAll('.glide-main__dot')[i].addEventListener('click', function() {
                myGlide.go(`=${i}`)
            })
        }

    /* Главная карусель, конец */

  },
    beforeDestroy() {
        this.glide.destroy()
    }
}
</script>

<style scoped>

@import '@glidejs/glide/dist/css/glide.core.min.css';

</style>