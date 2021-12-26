<template>
    <div class="main-partner">
        <div class="title">
            <p class="mb-0 partner-title">partner kami</p>
        </div>

        <div class="icon row">
            <div class="col" v-for="item in partner" v-bind:key="item.id">
                <img :src="require(`@/assets/icon/partner/${item.icon}.png`)" class="img-icon" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Partner",
    data() {
        return {
            partner: [
                {
                    id: 1,
                    icon: 'mortindo'
                },
                {
                    id: 2,
                    icon: 'royal'
                },
                {
                    id: 3,
                    icon: 'nara'
                },
                {
                    id: 4,
                    icon: 'toto'
                },
                {
                    id: 5,
                    icon: 'valentina'
                },
                {
                    id: 6,
                    icon: 'mai'
                },
            ]
        }
    }
}
</script>

<style scoped>
.main-partner {
    padding: 40px 200px 0 200px;
}

.title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: center;
}

.partner-title {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-align: center;
    width: 100%;
    text-transform: capitalize;
}

.icon {
    padding: 0 226px;
    margin: 0;
}

.icon > .col {
    margin: 0;
    padding: 0;
}

.img-icon {
    width: 180px;
    height: auto;
    cursor: pointer;
}
</style>