<template>
    <div class="main-offers">
        <div class="title">
            <p class="news-title">dapatkan penawaran spesial!</p>
            <p class="detail-title">Imperdiet massa sed ligula scelerisque purus, laoreet vestibulum mi. Dolor sed magna erat aenean in </p>
            <button class="button-detail">hubungi kami</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Offers"
}
</script>

<style scoped>
.main-offers {
    padding: 80px 200px 0 200px;
    background: #006664;
}

.title {
    margin-bottom: 0;
    display: block;
    text-align: left;
}

.news-title {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #FFF;
    text-align: left;
    text-transform: capitalize;
    margin-bottom: 16px;
}

.detail-title {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    width: 508px;
    line-height: 160%;
    letter-spacing: -0.005em;
    color: #FFFFFF;
    text-align: left;
    margin-bottom: 0;
}

.button-detail {
    background: #fff;
    border-radius: 10px;
    width: 150px;
    height: 50px;
    color: #006664;
    border: none;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.02em;
    text-transform: capitalize;
    margin-top: 40px;
    margin-bottom: 80px;
}


</style>