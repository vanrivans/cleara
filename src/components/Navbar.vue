<template>
    <div class="main-navbar">
        <b-navbar toggleable="sm">

            <b-navbar-brand>
                <router-link to="/">
                    <img src="@/assets/logo.png" class="logo" alt="">
                    <p class="logo-text">juragan material</p>
                </router-link>
            </b-navbar-brand>

            <div class="search-area">
                <div>
                    <div class="dropdown">
                        <button class="btn dropdown-toggle btn-filter" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                            Semua
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <div class="parent-input-serach">
                    <input type="text" class="search" placeholder="Saya sedang mencari...">
                    <div class="icon-search">
                        <img src="@/assets/icon/search.png" class="img-search" alt="">
                    </div>
                </div>
            </div>

            <div class="send-to">
                <p class="mb-0">Dikirim ke</p>
                <p class="mb-0">jakarta selatan</p>
            </div>

            <div class="button-group">
                <img src="@/assets/icon/favorite.png" class="favorite-img" alt="" @click.prevent="checkout()">
                <div class="parent-cart-img" @click.prevent="detailCart()">
                    <img src="@/assets/icon/cart.png" class="cart-img" alt="">
                    <div class="badge-custom" v-show="isCart"></div>
                </div>
                <img src="@/assets/icon/profile.png" class="profile-img" alt="">
            </div>

            <div class="button-menu">
                <img src="@/assets/icon/menu.png" class="menu-img" alt="">
            </div>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        detailCart() {
            this.$router.push({name: 'cart'});
        },
        checkout() {
            this.$router.push({name: 'checkout'});
        }
    },
    computed: {
        isCart() {
            if (this.$store.getters["order/cartStatus"] == "") {
                var local = localStorage.getItem('cartStatus');
                if (local == 1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return this.$store.getters["order/cartStatus"];
            }
        }
    }
}
</script>

<style scoped>
.parent-cart-img {
    position: relative;
}
.badge-custom {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
    position: absolute;
    bottom: 15px;
    left: 13px;
}

.main-navbar {
    padding: 0 200px;
}

nav {
    background: #FFF;
}

.navbar-brand a {
    display: flex;
    align-items: center;
    margin-right: 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #212121;
    text-decoration: none;
}

.logo {
    width: 42.54px;
    height: 40px;
    margin-right: 24px;
}

.logo-text {
    font-size: 16px;
    text-transform: capitalize;
    margin-bottom: 0;
    font-weight: 700;
}

.search-area {
    display: flex;
    margin-right: 24px;
}

.btn-filter {
    background: #F4F4F4;
    /* #DFDFDF */

    border: 1px solid #DFDFDF;
    box-sizing: border-box;
    border-radius: 10px 0px 0px 10px;
    font-family: 'Cabin-regular';
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #6C6C6C;
    display: flex;
    align-items: center;
}

.search {
    border: 1px solid #DFDFDF;
    border-radius: 0px 10px 10px 0px;
    width: 440px;
    border-left: none;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 240%;
    padding: 0 24px;
    color: #A9A9A9;
}

.search::placeholder {
    color: #A9A9A9;
}

.search:focus {
    border: 1px solid #DFDFDF;
    border-left: none;
    outline: none; 
}

.parent-input-serach {
    position: relative;
}

.icon-search {
    position: absolute;
    top: 2px;
    right: 25px;
}

.img-search {
    width: 14px;
    height: 14px;
}

.send-to {
    text-align: left;
    margin-right: 32px;
}

.send-to > p {
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #A9A9A9;
}

.send-to p:nth-child(2) {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 140%;
    letter-spacing: 0.04em;
    color: #212121;
    text-transform: capitalize;
}

.button-group {
    display: flex;
    align-items: center;
    border-right: 0.5px solid #DFDFDF;
    margin-right: 30px;
}

.favorite-img {
    width: 23.78px;
    height: 24px;
    margin-right: 19.3px;
    cursor: pointer;
}

.cart-img {
    height: 24px;
    width: 17.414409637451172px;
    margin-right: 22px;
    cursor: pointer;
}

.profile-img {
    height: 24px;
    width: 19.759109497070312px;
    left: 6px;
    top: 3.5px;
    border-radius: 0px;
    cursor: pointer;
    margin-right: 30.24px;
}

.menu-img {
    height: 24px;
    width: 20.819272994995117px;
    left: 6px;
    top: 3.5px;
    border-radius: 0px;
}

/* @media only screen and (min-width: 1440px) {
  .search {
      width: 500px;
  }
} */

@media only screen and (min-width: 1441px) {
  .search {
      width: 500px;
  }
}
</style>