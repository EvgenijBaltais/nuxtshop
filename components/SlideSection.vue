<template>
<div class = "slider-section">
    <div class = "main-slider__wrapper">
        <div class = "main-slider">
            <div class = "glide">
                <div data-glide-el="track" class="glide__track">
                    <ul class="glide__slides">
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <img :src="require('../assets/pics/bouquets/1/1.webp')" alt="" class = "main-slider__mainpic">
                            </NuxtLink>
                        </li>
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <img :src="require('../assets/pics/bouquets/1/1.webp')" alt="" class = "main-slider__mainpic">
                            </NuxtLink>
                        </li>
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <img :src="require('../assets/pics/bouquets/1/1.webp')" alt="" class = "main-slider__mainpic">
                            </NuxtLink>
                        </li>
                        <li class = "main-slider__carousel">
                            <NuxtLink :to = "{path: `/catalog/bouquets/1`}">
                                <img :src="require('../assets/pics/bouquets/1/1.webp')" alt="" class = "main-slider__mainpic">
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
                <img :src="require('../assets/pics/bouquets/2/1.webp')" alt="" class = "main-slider__minipic">
                <p class = "info-banner__title">Lorem ipsum dolor</p>
                <p class = "info-banner__price">25000 р</p>
            </div>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <img :src="require('../assets/pics/bouquets/3/1.webp')" alt="" class = "main-slider__minipic">
                <p class = "info-banner__title">Lorem ipsum dolor</p>
                <p class = "info-banner__price">25000 р</p>
            </div>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <img :src="require('../assets/pics/bouquets/4/1.webp')" alt="" class = "main-slider__minipic">
                <p class = "info-banner__title">Lorem ipsum dolor</p>
                <p class = "info-banner__price">25000 р</p>
            </div>
        </div>
        <div class = "info-banner">
            <div class="info-banner__pic">
                <img :src="require('../assets/pics/bouquets/5/1.webp')" alt="" class = "main-slider__minipic">
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

        let glide = new Glide('.glide', {
            autoplay: 3500,
            type: 'carousel',
            hoverpause: true,
            animationDuration: 1000
        })

        glide.mount()

        // Выровнять карусель и квадраты на главной

        if (window.screen.width >= 768) {
            let itemHeight = (document.querySelector('.glide__slides').clientHeight - 20) / 2

            for (let i = 0; i < document.querySelectorAll('.info-banner').length; i++) {

                document.querySelectorAll('.info-banner')[i].style.height = itemHeight + 'px'
                document.querySelectorAll('.info-banner')[i].querySelector('.main-slider__minipic').style.height = itemHeight + 'px'
            }
        }
  }
}
</script>

<style scoped>

 @import '@glidejs/glide/dist/css/glide.core.min.css';

</style>