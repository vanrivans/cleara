<template>
    <div class="main-partner">
        <div class="title">
            <p class="mb-0 best-title">Berita Juragan</p>
            <p class="mb-0 best-all">lihat semua</p>  
        </div>

        <div class="list-partner">
            <template v-for="(item, i) in partner">
                <div v-bind:key="item.id" class="partner-item" :class="i == (partner.length - 1) ? 'end-item' : ''">
                    <img :src="require(`@/assets/icon/news/${item.icon}.png`)" class="icon-partner" alt="" @click.prevent="detailProduct(item.icon)">
                    <div class="parent-title">
                        <p class="title-partner">{{ item.name }}</p>
                        <p class="mb-0 price-partner">{{ item.price }}</p>                    
                        <p class="mb-0 price-partner">{{ item.price }}</p>                    
                        <p class="mb-0 date-partner">{{ item.date }}</p>                    
                    </div>
                </div>
            </template>
        </div>

        <div class="divider"></div>
    </div>
</template>

<script>
export default {
    name: "partner",
    data() {
        return {
            partner: [
                {
                    id: 1,
                    name: 'Cara Memilih Properti yang Menguntungkan',
                    date: '18 Juni 2021',
                    icon: 'news1'
                },
                {
                    id: 2,
                    name: 'Memilih Bahan Bangunan yang Cocok untuk Kebutuhan Anda',
                    date: '16 Juni 2021',
                    icon: 'news2'
                },
                {
                    id: 3,
                    name: 'Bahan Bangunan Paling Penting Dalam Konstruksi Yang Perlu Kamu Ketahui',
                    date: '14 Juni 2021',
                    icon: 'news3'
                }
            ]
        }
    }
}
</script>

<style scoped>
.main-partner {
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

.partner-item {
    margin-right: 24px;
}

.end-item {
    margin: 0;
}

.list-partner {
    display: flex;
    align-items: center;
}

.icon-partner {
    width: 331px;
    height: 242px;
    margin-bottom: 28px;
    cursor: pointer;
}

.parent-title {
    max-width: 242px;
}

.title-partner {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.02em;
    color: #212121;
    text-align: left;
    width: 300px;
    margin-bottom: 8px;
}

.date-partner {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #A9A9A9;
    text-align: left;
}

.price-partner {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #6C6C6C;
    text-align: left;
}

@media only screen and (min-width: 1441px) {
    .icon-partner {
        width: 351px;
        height: 272px;
    }
}
</style>