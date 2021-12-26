<template>
    <div style="margin-top: 40px;">
        <template v-for="(item, i) in dataRetail">
            <div v-bind:key="i" class="title-section">
                <span class="span">{{ i + 1 }}</span>
                <p class="mb-0">
                    {{ item.title }}
                </p>
            </div>
            <div v-bind:key="(item.id * 5)">
                <p class="detail">{{ item.text }}</p>
            </div>
        </template>       
    </div>
</template>

<script>
export default {
    name: "CustomerProject",
    data() {
        return {
            dataRetail: [
                {
                    id: 1,
                    title: 'Informasi Produk Lengkap',
                    text: 'Volutpat scelerisque tellus faucibus morbi. Urna pharetra mauris, etiam nunc, auctor.'
                },
                {
                    id: 2,
                    title: 'Harga Transparan dan Akurat',
                    text: 'Blandit senectus lobortis at augue. Suspendisse magna nibh nunc faucibus quis eget.'
                },
                {
                    id: 3,
                    title: '24/7 Layanan CS',
                    text: 'Enim ac sapien amet tortor aliquam, tortor ultricies eget mauris.'
                }
            ]
        }
    }
}
</script>

<style scoped>
.title-section {
    display: flex;
    margin-bottom: 8px;
}

.span {
    color: #FFF;
    font-weight: normal;
    width: 24px;
    height: 24px;
    background: #006664;
    border-radius: 50px;
    margin-right: 16px;
}

.title-section > div:nth-child(2) {
    margin-bottom: 0;
}

.detail {
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 160%;
    letter-spacing: -0.005em;
    color: #6C6C6C;
    margin-left: 38px;
    margin-bottom: 40px;
}
</style>