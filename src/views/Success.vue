<template>
    <div class="main-success">
        <img src="@/assets/icon/success.jpg" class="success-icon" alt="">
        <p class="success-text">Anda berhasil checkout, silahkan cek email anda untuk detail order dan pembayaran anda</p>
    </div>
</template>

<script>
export default {
    name: "Success"
}
</script>

<style scoped>
.success-icon {
    width: 380px;
    height: auto;
}
.success-text {
    margin-top: 30px;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
}
</style>