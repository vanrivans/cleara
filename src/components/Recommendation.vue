<template>
    <div class="main-recommendation">
        <div class="title">
            <p class="mb-0 recom-title">rekomendasi juragan</p>
            <p class="mb-0 recom-all">lihat semua</p>  
        </div>
        <div class="collection">
            <div
                class="collection-card"
                :class="(i == (collection.length - 1)) ? 'end-item' : '' "
                v-for="(item, i) in collection"
                v-bind:key="i"
            >
                <p class="title-collection">{{ item.title }}</p>
                <div class="row row-image">
                    <div
                        class="col"
                        v-for="(list, a) in item.data"
                        v-bind:key="a"
                    >
                        <img :src="require(`@/assets/icon/recommendation/${list.icon}.png`)" class="icon" alt="">
                        <p class="img-title">{{ list.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Recommendation",
    data() {
        return {
            collection: [
                {
                    title: 'Furnitur Rumah Minimalis',
                    data: [
                        {
                            'name': 'Industrial Chair',
                            'icon': 'chair'
                        },
                        {
                            'name': 'Wood Bed',
                            'icon': 'bed'
                        },
                        {
                            'name': 'Vanity Mirror',
                            'icon': 'mirror'
                        },
                        {
                            'name': 'Floor Lamp',
                            'icon': 'floor-lamp'
                        },
                    ]
                },
                {
                    title: 'Terangi Rumah Anda',
                    data: [
                        {
                            'name': 'Industrial lamp',
                            'icon': 'industrial-lamp'
                        },
                        {
                            'name': 'two lamp',
                            'icon': 'two-lamp'
                        },
                        {
                            'name': 'deck lamp',
                            'icon': 'deck-lamp'
                        },
                        {
                            'name': 'mushroom lamp',
                            'icon': 'mushroom-lamp'
                        },
                    ]
                },
                {
                    title: 'Makin Betah WFH',
                    data: [
                        {
                            'name': 'boolshelf',
                            'icon': 'bookshelf'
                        },
                        {
                            'name': 'working desk',
                            'icon': 'working-desk'
                        },
                        {
                            'name': 'wall organizer',
                            'icon': 'wall-organizer'
                        },
                        {
                            'name': 'floating shelf',
                            'icon': 'floating-shelf'
                        },
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped>
.main-recommendation {
    padding: 80px 200px 0 200px;
    background: #006664;
}

.title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: center;
}

.recom-title {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #FFFFFF;
    text-transform: capitalize;
    text-align: left;
}

.recom-all {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.02em;
    color: #FFF;
    text-transform: capitalize;
    cursor: pointer;
}

.collection {
    display: flex;
    align-items: center;
}

.collection-card {
    width: 331px;
    height: 344px;
    background: #FFFFFF;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    margin: 0;
    margin-right: 24px;
    padding: 0;
    margin-bottom: 80px;
}

.end-item {
    margin-right: 0;
}

.title-collection {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.02em;
    color: #212121;
    text-align: left;
    margin: 24px;
}

.img-title {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 160%;
    letter-spacing: -0.005em;
    color: #6C6C6C;
    text-align: left;
    margin-top: 4px;
    margin-bottom: 16px;
    margin-left: 2px;
    text-transform: capitalize;
}

.row-image {
    padding: 0 24px;
    margin: 0;
}

.row-image > .col {
    padding: 0;
}

@media only screen and (min-width: 1441px) {
    .collection-card {
        width: 358px;
        height: 371px;
    }

    .img-title {
        margin-left: 10px;
    }
}
</style>