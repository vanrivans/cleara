<template>
    <div class="main-bestseller">
        <div class="title">
            <p class="mb-0 best-title">Produk Terlaris</p>
            <p class="mb-0 best-all">lihat semua</p>  
        </div>

        <div class="list-bestseller">
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
                    <template v-for="(item, i) in bestSeller">
                        <div v-bind:key="item.id" class="bestseller-item" :class="i == (bestSeller.length - 1) ? 'end-item' : ''">
                            <img :src="require(`@/assets/icon/bestseller/${item.icon}.png`)" class="icon-bestseller" alt="" @click.prevent="detailProduct('bestseller', item.icon, item.name, item.price, item.id)">
                            <div class="parent-title">
                                <p class="title-bestseller">{{ item.name }}</p>
                                <p class="mb-0 price-bestseller">{{ item.price }}</p>                        
                            </div>
                        </div>
                    </template>
                </template>
            </b-skeleton-wrapper>
        </div>

        <div class="divider"></div>
    </div>
</template>

<script>
export default {
    name: "BestSeller",
    data() {
        return {
            // bestSeller: [
            //     {
            //         id: 1,
            //         name: 'Keran Air Hitam WEIN GH607701145554',
            //         price: 'Rp. 998.100',
            //         icon: 'tap'
            //     },
            //     {
            //         id: 2,
            //         name: 'Water Heater Panasonic DH-1124-HSHGFT',
            //         price: 'Rp 2.321.700',
            //         icon: 'waterheater'
            //     },
            //     {
            //         id: 3,
            //         name: 'Aquaproof Pail 20kg',
            //         price: 'Rp 830.000',
            //         icon: 'aquaproof'
            //     },
            //     {
            //         id: 4,
            //         name: 'Closed Duduk Toto CW422J / HHG3554',
            //         price: 'Rp 1.740.000',
            //         icon: 'closet'
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
        bestSeller() {
            return this.$store.getters["product/bestSeller"];
        },
        loading() {
            if (this.$store.getters["product/bestSeller"].length > 0) {
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

.main-bestseller {
    padding: 48px 200px 0 200px;
}

.title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: center;
}

.best-title {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-align: left;
}

.best-all {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.02em;
    color: #006664;
    text-transform: capitalize;
    cursor: pointer;
}

.bestseller-item {
    margin-right: 24px;
}

.end-item {
    margin: 0;
}

.list-bestseller {
    display: flex;
    align-items: center;
}

.icon-bestseller {
    width: 242px;
    height: 242px;
    cursor: pointer;
}

.parent-title {
    max-width: 242px;
}

.title-bestseller {
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

.price-bestseller {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #6C6C6C;
    text-align: left;
}

@media only screen and (min-width: 1441px) {
    .icon-bestseller {
        width: 252px;
        height: 252px;
    }
}
</style>