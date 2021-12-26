<template>
    <div class="main-banner">
        <!-- <div class="parent-banner-1">
        </div> -->
        <div>
            <div>
                <img src="@/assets/banner/banner1.png" class="banner-1" alt="">
            </div>
            <div class="helper-banner">
                <img src="@/assets/banner/banner2.png" class="banner-2" alt="">
                <img src="@/assets/banner/banner3.png" class="banner-3" alt="">
            </div>
        </div>
        <!-- <div class="parent-banner-2">
        </div> -->
    </div>
</template>

<script>
export default {
    name: "Banner"
}
</script>

<style scoped>
.main-banner {
    background: #FAFAFA;
    text-align: left;
    padding: 40px 200px;
}

.main-banner > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.parent-banner-1 {
    margin-right: 26px;
    width: 719px;
}

.banner-1 {
    width: 685px;
    height: 284px;
    border-radius: 10px;
    cursor: pointer;
}

.banner-2 {
    width: 332px;
    height: 130px;
    border-radius: 10px;
    margin-bottom: 12px;
    cursor: pointer;
}

.banner-3 {
    width: 332px;
    height: 130px;
    margin-top: 12px;
    border-radius: 10px;
    cursor: pointer;
}

.helper-banner {
    text-align: end;
}

@media only screen and (min-width: 1441px) {
    .banner-1 {
        width: 760px;
    }
}
</style>