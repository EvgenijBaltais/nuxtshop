<template>
<div>
      <DeliveryInfoStripe />
      <!--<SlideSection />-->
      <BestsellersSection />
     <!-- <SectionCarousel 
        v-for = 'item in categories'
        :key = 'item.id'
        :categories = "item"
      />-->
      <SubscribeBlock />
</div>
</template>

<script>

import axios from 'axios'
import DeliveryInfoStripe from '@/components/DeliveryInfoStripe'
//import SlideSection from '@/components/SlideSection'
import BestsellersSection from '@/components/BestsellersSection'
import SectionCarousel from '@/components/SectionCarousel'
import SubscribeBlock from '@/components/SubscribeBlock'

export default {

  //middleware: 'queries',
  data(){
    return {
		productss: []
	}
  },
  async fetch() {

	  this.productss = await fetch('https://randomuser.me/api/?results=5')
	  .then(
		  	res => {
			  console.log('*' + res)
			  console.log(this.productss)
			}
	  )
  },
  methods: {
  },
  components: {
		DeliveryInfoStripe, /*SlideSection,*/ BestsellersSection, SectionCarousel, SubscribeBlock
  },
	beforeCreate(){
		axios.get('https://randomuser.me/api/?results=5')
		.then(res => {
			this.productss = res
		})
	},
	computed: {
	products(){
		return this.$store.getters.products
	},
	categories(){
		return this.$store.getters.categories
	}
	}
}
</script>