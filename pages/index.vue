<template>
<div class = "main-info">
	<DeliveryInfoStripe />
  <SlideSection />
    <SectionCarousel 
        v-for = 'item in categories'
        :key = 'item.id'
        :categories = "item"
    />
    <SubscribeBlock />
</div>
</template>

<script>

import axios from 'axios'
import DeliveryInfoStripe from '@/components/DeliveryInfoStripe'
import SlideSection from '@/components/SlideSection'
import SectionCarousel from '@/components/SectionCarousel'
import SubscribeBlock from '@/components/SubscribeBlock'
import closeMenu from '~/mixins/closeMenu.js'

export default {

  mixins: [closeMenu],
  data(){
    return {}
  },
  methods: {
  },
  components: {
		DeliveryInfoStripe, SlideSection, SectionCarousel, SubscribeBlock
  },
	mounted(){

    // Закрыть меню
    this.closeMenu()
	},
	computed: {
		products(){
			return this.$store.state.products
		},
		categories(){
			return this.$store.state.categories
		}
	}
}
</script>