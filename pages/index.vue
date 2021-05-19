<template>
<div>
	<DeliveryInfoStripe />
  <SlideSection />
	<BestsellersSection />
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
import BestsellersSection from '@/components/BestsellersSection'
import SectionCarousel from '@/components/SectionCarousel'
import SubscribeBlock from '@/components/SubscribeBlock'

export default {

  //middleware: 'queries',
  data(){
    return {

	}
  },
  async fetch() {

  },
  methods: {
  },
  components: {
		DeliveryInfoStripe, SlideSection, BestsellersSection, SectionCarousel, SubscribeBlock
  },
	created(){
		
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