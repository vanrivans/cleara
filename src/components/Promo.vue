<template>
    <div class="main-promo">
        <div class="title">
            <p class="mb-0 promo-title">Produk Promo</p>
            <p class="mb-0 promo-all">lihat semua</p>  
        </div>

        <div class="list-promo">
            <b-skeleton-wrapper :loading="loading">
                <template #loading>
                    <div class="skeleton">
                        <b-skeleton></b-skeleton>
                        <b-skeleton></b-skeleton>
                        <b-skeleton></b-skeleton>
                        <b-skeleton></b-skeleton>
                    </div>
                </template>

                <template v-if="this.$store.getters['product/helperError'] != ''">
                    <p class="mb-0 error-text">
                        {{ this.$store.getters['product/helperError'] }}
                    </p>
                </template>
                <template v-else>
                    <template v-for="(item, i) in promo">
                        <div v-bind:key="item.id" class="promo-item" :class="i == (promo.length - 1) ? 'end-item' : ''">
                            <img :src="require(`@/assets/icon/promo/${item.icon}.png`)" class="icon-promo" alt="" @click.prevent="detailProduct('promo', item.icon, item.name, item.price, item.id)">
                            <div class="parent-title">
                                <p class="title-promo">{{ item.name }}</p>
                                <p class="mb-0 price-promo">{{ item.price }}</p>                        
                            </div>
                        </div>
                    </template>
                </template>
            </b-skeleton-wrapper>
        </div>
    </div>
</template>

<script>
export default {
    name: "Promo",
    data() {
        return {
            // promo: [
            //     {
            //         id: 1,
            //         name: 'Bathtub Toto PJY1886HPWMNE',
            //         price: 'Rp 137.625.000',
            //         icon: 'bathtub'
            //     },
            //     {
            //         id: 2,
            //         name: 'Wine Cellar Modena SCUDERIA',
            //         price: 'Rp 130.725.000',
            //         icon: 'wine-cellar'
            //     },
            //     {
            //         id: 3,
            //         name: 'Exhaust Fan KDK 60GTC',
            //         price: 'Rp 17.534.300',
            //         icon: 'exhaust'
            //     },
            //     {
            //         id: 4,
            //         name: 'Kulkas Modena RETRO - RF 2332',
            //         price: 'Rp 26.000.000',
            //         icon: 'refrigator'
            //     },
            // ]
        }
    },
    methods: {
        async detailProduct(folder, item, name, price, productId) {
            await this.$store.dispatch("order/detail", { folder: folder, file: item, name: name, price: price, productId: productId });
            let storage = {
                name: name,
                folder: folder,
                icon: item,
                price: price,
                subtotal: price,
                qty: 1,
                productId: productId
            }
            localStorage.setItem('detailProduct', JSON.stringify(storage));
            this.$router.push({ name: 'detail', params: { icon: item } });
        }
    },
    computed: {
        promo() {
            return this.$store.getters["product/promo"];
        },
        loading() {
            if (this.$store.getters["product/promo"].length > 0) {
                return false;
            } else {
                if (this.$store.getters["product/helperError"] == "") {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
}
</script>

<style scoped>
.skeleton {
    display: flex;
    align-items: center;
}

.b-skeleton {
    width: 242px;
    height: 242px;
    margin-right: 24px;
}

.main-promo {
    padding: 48px 200px 0 200px;
}

.title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: center;
}

.promo-title {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-align: left;
}

.promo-all {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.02em;
    color: #006664;
    text-transform: capitalize;
    cursor: pointer;
}

.promo-item {
    margin-right: 24px;
}

.end-item {
    margin: 0;
}

.list-promo {
    display: flex;
    align-items: center;
}

.icon-promo {
    width: 242px;
    height: 242px;
    cursor: pointer;
}

.parent-title {
    max-width: 242px;
}

.title-promo {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.02em;
    color: #212121;
    text-align: left;
    width: 242px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 24px;
    margin-bottom: 8px;
    cursor: pointer;
}

.price-promo {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #6C6C6C;
    text-align: left;
}

@media only screen and (min-width: 1441px) {
    .icon-promo {
        width: 252px;
        height: 252px;
    }
}
</style>