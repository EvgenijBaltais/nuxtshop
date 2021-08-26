<template>
<div class = "slider-section">
    <div class = "main-slider__wrapper">
        <div class = "main-slider">
            <div class = "glide glide-main">
                <div class = "glide-main__left"></div>
                <div class = "glide-main__right"></div>
                <div class = "glide-main__dots"></div>
                <div data-glide-el="track" class="glide__track">
                    <ul class="glide__slides">
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <div data-src = "pics/bouquets/1/1.webp" class = "main-slider__mainpic lazyloading-item"></div>
                            </NuxtLink>
                        </li>
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <div data-src = "pics/bouquets/2/1.webp" class = "main-slider__mainpic lazyloading-item"></div>
                            </NuxtLink>
                        </li>
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <div data-src = "pics/bouquets/3/1.webp" class = "main-slider__mainpic lazyloading-item"></div>
                            </NuxtLink>
                        </li>
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <div data-src = "pics/bouquets/4/1.webp" class = "main-slider__mainpic lazyloading-item"></div>
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
    <div class = "info-banners">
        <div class = "info-banner">
            <div class="info-banner__pic">
                <div data-src="/pics/bouquets/2/1.webp" alt="" class = "main-slider__minipic lazyloading-item"></div>
                <p class = "info-banner__title">Lorem ipsum dolor</p>
                <p class = "info-banner__price">25000 р</p>
            </div>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <div data-src="/pics/bouquets/3/1.webp" alt="" class = "main-slider__minipic lazyloading-item"></div>
                <p class = "info-banner__title">Lorem ipsum dolor</p>
                <p class = "info-banner__price">25000 р</p>
            </div>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <div data-src="/pics/bouquets/4/1.webp" alt="" class = "main-slider__minipic lazyloading-item"></div>
                <p class = "info-banner__title">Lorem ipsum dolor</p>
                <p class = "info-banner__price">25000 р</p>
            </div>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <div data-src="/pics/bouquets/5/1.webp" alt="" class = "main-slider__minipic lazyloading-item"></div>
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
      return {}
  },
  mounted(){

    /* Главная карусель */

        for (let i = 0; i < document.querySelectorAll('.main-slider__carousel:not(.glide__slide--clone)').length; i++) {
            document.querySelector('.glide-main__dots').insertAdjacentHTML('beforeend',`<div class = "glide-main__dot${i == 0 ? ' glide-main__dot-active' : ''}"></div>`)
        }

        let glide = new Glide('.glide', {
            autoplay: 3000,
            type: 'carousel',
            hoverpause: true,
            animationDuration: 500,
            animationTimingFunc: 'ease-in-out'
        })

        glide.on('run.before', function(){
            document.querySelector('.glide-main__dot-active').classList.remove('glide-main__dot-active')
        })
        glide.on('run', function(){
            document.querySelectorAll('.glide-main__dot')[glide.index].classList.add('glide-main__dot-active')
        })

        glide.mount()

        document.querySelector('.glide-main__right').addEventListener('click', function(){
            glide.go('>')
        })

        document.querySelector('.glide-main__left').addEventListener('click', function(){
            glide.go('<')
        })

        for (let i = 0; i < document.querySelectorAll('.glide-main__dot').length; i++) {

            document.querySelectorAll('.glide-main__dot')[i].addEventListener('click', function() {
                glide.go(`=${i}`)
            })
        }

    /* Главная карусель, конец */
  }
}
</script>

<style scoped>

 @import '@glidejs/glide/dist/css/glide.core.min.css';

</style>