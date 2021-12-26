<template>
    <div class="main-category">
        <div class="title">
            <p class="mb-0 category-title">Apa yang Anda cari?</p>
            <p class="mb-0 category-all">lihat semua</p>  
        </div>

        <div class="list-category">
            <template v-for="(item, i) in category">
                <div v-bind:key="item.id" class="category-item" :class="i == 7 ? 'end-item' : ''">
                    <img :src="require(`@/assets/icon/category/${item.icon}.png`)" class="icon-cateogry" alt="">
                    <p class="mb-0 title-category">{{ item.name }}</p>
                </div>
            </template>
        </div>
        <div class="list-category-2">
            <template v-for="(item, i) in category2">
                <div v-bind:key="item.id" class="category-item" :class="i == 7 ? 'end-item' : ''">
                    <img :src="require(`@/assets/icon/category/${item.icon}.png`)" class="icon-cateogry" alt="">
                    <p class="mb-0 title-category">{{ item.name }}</p>
                </div>
            </template>
        </div>

        <div class="divider"></div>
    </div>
</template>

<script>
export default {
    name: "Category",
    data() {
        return {
            category: [
                {
                    id: 1,
                    name: 'batu bata & sejenisnya',
                    icon: 'brick'
                },
                {
                    id: 2,
                    name: 'produk teknikal dan kimia',
                    icon: 'chemical'
                },
                {
                    id: 3,
                    name: 'elektronik',
                    icon: 'electronic'
                },
                {
                    id: 4,
                    name: 'granite tile',
                    icon: 'granite'
                },
                {
                    id: 5,
                    name: 'besi, baja WF, wiremesh',
                    icon: 'logam'
                },
                {
                    id: 6,
                    name: 'materi alam',
                    icon: 'natural-material'
                },
                {
                    id: 7,
                    name: 'mekanikal & elektrical',
                    icon: 'electrical'
                },
                {
                    id: 8,
                    name: 'perkakas',
                    icon: 'tools'
                }
            ],
            category2: [
                {
                    id: 9,
                    name: 'sanitari',
                    icon: 'sanitary'
                },
                {
                    id: 10,
                    name: 'semen & sejenisnya',
                    icon: 'cement'
                },
                {
                    id: 11,
                    name: 'keran & shower',
                    icon: 'shower'
                },
                {
                    id: 12,
                    name: 'jasa',
                    icon: 'service'
                },
                {
                    id: 13,
                    name: 'aksesoris kamar mandi',
                    icon: 'bath'
                },
                {
                    id: 14,
                    name: 'pelapis lantai',
                    icon: 'floor-coating'
                },
                {
                    id: 15,
                    name: 'aksesoris dapur',
                    icon: 'kitchen'
                },
                {
                    id: 16,
                    name: 'cat & pelapis anti bocor',
                    icon: 'paint'
                }
            ]
        }
    }
}
</script>

<style>
.main-category {
    padding: 40px 200px 0 200px;
}

.divider {
    margin-top: 48px;
    border: 0.5px solid #DFDFDF;
}

.title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: center;
}

.category-title {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-align: left;
}

.category-all {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.02em;
    color: #006664;
    text-transform: capitalize;
    cursor: pointer;
}

.list-category,
.list-category-2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.list-category-2 {
    margin-top: 40px;
}

.category-item {
    border: 0.5px solid #DFDFDF;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 12px 14.5px;
    margin-right: 24px;
    width: 109px;
    height: 158px;
    cursor: pointer;
}

.end-item {
    margin: 0;
}

.title-category {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 160%;
    text-align: center;
    letter-spacing: -0.005em;
    color: #212121;
    text-transform: capitalize;
    margin-top: 28px;
}
</style>