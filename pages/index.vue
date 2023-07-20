<template>
  <div class="main-info" :style = '{opacity: products.length}'>
    <DeliveryInfoStripe />
    <SlideSection />
    <div class="content-sections">
      <SectionCarousel
        v-for="item in categories"
        :key="item.id"
        :categories="item"
        :products="products"
      />
    </div>
    <SubscribeBlock />
  </div>
</template>

<script>
import DeliveryInfoStripe from "@/components/DeliveryInfoStripe";
import SlideSection from "@/components/SlideSection";
import SectionCarousel from "@/components/SectionCarousel";
import SubscribeBlock from "@/components/SubscribeBlock";
import closeMenu from "~/mixins/closeMenu.js";

export default {
  mixins: [closeMenu],
  data() {
    return {
      categories: [],
      products: [],
      categorySections: []
    }
  },
  async fetch() {
    this.categories = await fetch('http://localhost:3001/get_categories').then(res => res.json())
    this.products = await fetch('http://localhost:3001/catalog_products').then(res => res.json())
  },
  watch: {
    // whenever question changes, this function will run
    question: function (newQuestion, oldQuestion) {
      console.log()
    }
  },
  components: {
    DeliveryInfoStripe,
    SlideSection,
    SectionCarousel,
    SubscribeBlock,
  },
  methods: {

    showVisible: function() {

      let sections = this.categorySections

        for (let i = 0; i < sections.length; i++) {

            if (sections[i].classList.contains('loaded')) continue

            if (this.isVisible(sections[i])) {

              //console.log(111111)

              let elem

              console.log(sections[i].querySelectorAll('.lazy-loading-pic').length)
                
                for (let k = 0; k < sections[i].querySelectorAll('.lazy-loading-pic').length; k++) {

                    elem = sections[i].querySelectorAll('.lazy-loading-pic')[k]

                   // console.log(elem)

                    elem.style.backgroundImage = "url('/pics/bouquets/1/1.jpg')"
                }
               
               sections[i].classList.add('loaded')
            }
        }
    },
    isVisible: function(elem) {

        let coords = elem.getBoundingClientRect(),
            windowHeight = document.documentElement.clientHeight

        // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима
        let topVisible = coords.top > 0 && coords.top < windowHeight,
            bottomVisible = coords.bottom < windowHeight && coords.bottom > 0

        return topVisible || bottomVisible
    }
  },
  mounted() {
    // Закрыть меню
    this.closeMenu()


    this.$nextTick(function () {

      this.categorySections = document.querySelectorAll('.category-section')

      document.addEventListener("scroll", this.showVisible)
      //window.addEventListener("resize", this.showVisible)
      //window.addEventListener("orientationChange", this.showVisible)
    })

  },
  beforeDestroy() {

      document.addEventListener("scroll", this.lazyLoading)
      //window.addEventListener("resize", this.lazyLoading)
      //window.addEventListener("orientationChange", this.lazyLoading)
  }
}
</script>