<template>
    <div class="main-whyus">
        <div class="row p-0 m-0">
            <div class="col p-0 m-0 d-flex align-items-center">
                <div class="icon">
                    <img src="@/assets/icon/phone.png" class="phone-img" alt="">
                </div>
                <div class="section-tab">
                    <p class="title">kenapa juragan material</p>
                    <b-tabs class="custom-tabs">
                        <b-tab   title="Untuk Customer Retail" class="custom-link" active>
                            <customer-retail/>
                        </b-tab>
                        <b-tab title="Untuk Customer Proyek" class="custom-link">
                            <customer-project/>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomerRetail from './CustomerRetail.vue'
import CustomerProject from './CustomerProject.vue'

export default {
    name: "Whyus",
    components: {
        CustomerRetail,
        CustomerProject
    }
}
</script>

<style scoped>
.main-whyus {
    margin-top: 80px;
    padding: 48px 200px 0 200px;
    margin-bottom: 80px;
}

.icon {
    text-align: left;
    margin-right: 24px;
}

.phone-img {
    width: 595px;
    height: 655px;
}

.section-tab {
    width: 418px;
    align-self: self-start;
}

.title {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-transform: capitalize;
    margin-bottom: 24px;
}

</style>

<style>
/* tabs */
.custom-tabs > div > ul > li > a {
    font-style: normal;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #A9A9A9;
    padding-top: 0;
    border: none !important;
    border-bottom: 1px solid #DFDFDF !important;
}

.custom-tabs > div > ul > li > a.active {
    color: #212121 !important;
    font-weight: 600;
    border: none !important;
    border-bottom: 1px solid #DFDFDF !important;
}

.custom-tabs > div > ul > li {
    border-bottom: none;
}
</style>