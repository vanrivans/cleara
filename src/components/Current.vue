<template>
    <div class="main-current">
        <div class="title">
            <p class="mb-0 best-title">Berdasarkan Aktifitas Anda</p>
            <p class="mb-0 best-all">lihat semua</p>  
        </div>

        <div class="list-current">
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
                    <template v-for="(item, i) in current">
                        <div v-bind:key="item.id" class="current-item" :class="i == (current.length - 1) ? 'end-item' : ''">
                            <img :src="require(`@/assets/icon/current/${item.icon}.png`)" class="icon-current" alt="" @click.prevent="detailProduct('current', item.icon, item.name, item.price, item.id)">
                            <div class="parent-title">
                                <p class="title-current">{{ item.name }}</p>
                                <p class="mb-0 price-current">{{ item.price }}</p>                        
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
    name: "Current",
    data() {
        return {
            // current: [
            //     {
            //         id: 1,
            //         name: 'Kulkas Modena ARGENTO - RF',
            //         price: 'Rp 10.000.000',
            //         icon: 'refrigator'
            //     },
            //     {
            //         id: 2,
            //         name: 'Freestanding Modena PRIMA - FC',
            //         price: 'Rp 9.640.000',
            //         icon: 'modena'
            //     },
            //     {
            //         id: 3,
            //         name: 'Kompor Modena COMBINATO',
            //         price: 'Rp 8.640.000',
            //         icon: 'stove'
            //     },
            //     {
            //         id: 4,
            //         name: 'Sink Modena MAGGIORE - KS',
            //         price: 'Rp 6.000.000',
            //         icon: 'sink'
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
        current() {
            return this.$store.getters["product/current"];
        },
        loading() {
            if (this.$store.getters["product/current"].length > 0) {
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

.main-current {
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

.current-item {
    margin-right: 24px;
}

.end-item {
    margin: 0;
}

.list-current {
    display: flex;
    align-items: center;
}

.icon-current {
    width: 242px;
    height: 242px;
    cursor: pointer;
}

.parent-title {
    max-width: 242px;
}

.title-current {
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

.price-current {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #6C6C6C;
    text-align: left;
}

@media only screen and (min-width: 1441px) {
    .icon-current {
        width: 252px;
        height: 252px;
    }
}
</style>