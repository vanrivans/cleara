<template>
  <div>
    <Banner />
    <Category />
    <BestSeller />
    <Promo />
    <Whyus />
    <Current />
    <Recommendation />
    <Partner />
    <News />
    <Offers />
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import Category from '@/components/Category.vue'
import BestSeller from '@/components/BestSeller.vue'
import Promo from '@/components/Promo.vue'
import Whyus from '@/components/Whyus.vue'
import Current from '@/components/Current.vue'
import Recommendation from '@/components/Recommendation.vue'
import Partner from '@/components/Partner.vue'
import News from '@/components/News.vue'
import Offers from '@/components/Offers.vue'

export default {
  name: 'Home',
  components: {
    Banner,
    Category,
    BestSeller,
    Promo,
    Whyus,
    Current,
    Recommendation,
    Partner,
    News,
    Offers
  },
  methods: {
    async dataGeneral() {
      await this.$store.dispatch("product/getProduct");
    }
  },
  beforeMount(){
    this.dataGeneral();
  }
}
</script>