<template>
  <div class="main-info" :style = '{opacity: products.length}'>
    <DeliveryInfoStripe />
    <SlideSection />
    <SectionCarousel
      v-for="item in categories"
      :key="item.id"
      :categories="item"
      :products="products"
    />
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
      products: []
    }
  },
  async fetch() {
    this.categories = await fetch('http://79.174.12.75:3001/get_categories').then(res => res.json())
    this.products = await fetch('http://79.174.12.75:3001/catalog_products').then(res => res.json())
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
  mounted() {
    // Закрыть меню
    this.closeMenu()
    

    console.log(this.products)
  },
  computed: {
  }
};
</script>