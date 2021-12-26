<template>
    <div class="main-detail" id="main-detail">
        <div class="section-detail">
            <div class="col-image">
                <div class="image">
                    <img :src="require(`@/assets/icon/${image}`)" alt="">
                </div>
            </div>
            <div class="col-text">
                <p class="text-detail">{{ name }}</p>
                <div class="product-helper">
                    <p class="mb-0 sold-text">Terjual <span class="sold-number">2.710</span></p>
                    <div class="dot"></div>
                    <div class="rating">
                        <img src="@/assets/icon/star.png" class="rating-icon" alt="">
                        <p class="mb-0 rating-text">4.9 <span>(684 ulasan)</span></p>
                    </div>
                </div>
                <p class="price">{{ price }}</p>

                <div class="divider"></div>

                <b-tabs class="detail-tabs">
                    <b-tab   title="Detail" class="custom-link" active>
                        <div class="tab-detail-product">
                            <p class="mb-0">Kondisi: <span>{{ condition }}</span></p>
                            <p class="mb-0">Berat: <span>{{ weight }}</span></p>
                            <p class="mb-0">Kategory: <span>{{ category }}</span></p>
                            <p class="mb-0 desctiption">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quisquam, fugiat, provident animi praesentium, rerum error magni asperiores ratione beatae et? Perspiciatis voluptatibus unde repellat quod earum commodi sint laudantium.
                            </p>
                        </div>
                    </b-tab>
                    <b-tab title="Info penting" class="custom-link">
                        info penting
                    </b-tab>
                </b-tabs>
            </div>
            <div class="col-order">
                <div class="card-order">
                    <p class="mb-0">
                        Atur jumlah dan pesanan
                    </p>
                    <div class="parent-action">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-plus" @click.prevent="changeQty('decrease')">-</button>
                            <button type="button" class="btn btn-qty">{{ qty }}</button>
                            <button type="button" class="btn btn-plus" @click.prevent="changeQty('increase')">+</button>
                        </div>
                        <p class="mb-0 stock-text">Max pembelian {{ stock }} pcs</p>

                        <div class="total">
                            <p class="subtotal-text">subtotal</p>
                            <p class="subtotal-price">{{ subtotal }}</p>
                        </div>

                        <div class="submit">
                            <template v-if="loading">
                                <button class="btn btn-cart">
                                    <b-spinner variant="light"></b-spinner>
                                </button>
                            </template>
                            <template v-else>
                                <button class="btn btn-cart" @click.prevent="addToCart()">+ keranjang</button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider"></div>
    </div>
</template>

<script>
export default {
    name: "Detail",
    data() {
        return {
            loading: false,
            condition: 'baru',
            weight: '400 gram',
            category: 'Product',
        }
    },
    methods: {
        getImage() {
            let fileName = this.$route.params.icon;

            let folder;
            folder = this.$store.getters["order/folderImage"];
            if (folder == "") {
                let detailProduct = JSON.parse(localStorage.getItem('detailProduct'));
                folder = detailProduct.folder;
            }
            
            let composed = folder + '/' + fileName + '.png';

            return composed;
        },
        getName() {
            let name;
            name = this.$store.getters["order/detailProductName"];
            if (name == "") {
                let detailProduct = JSON.parse(localStorage.getItem('detailProduct'));
                name = detailProduct.name;
            }

            return name;
        },
        getPrice() {
            let price;
            price = this.$store.getters["order/productPrice"];
            if (price == "") {
                let detailProduct = JSON.parse(localStorage.getItem('detailProduct'));
                price = detailProduct.price;
            }

            return price;
        },
        getSubtotal() {
            let total;
            total = this.$store.getters["order/subtotal"];
            if (total == "") {
                let detailProduct = JSON.parse(localStorage.getItem('detailProduct'));
                total = detailProduct.subtotal;
            }

            return total;
        },
        getQty() {
            let qty;
            qty = this.$store.getters["order/qtyOrder"];
            let detailProduct = JSON.parse(localStorage.getItem('detailProduct'));
            if (qty == "" || qty > detailProduct.qty) {
                qty = detailProduct.qty;
                this.$store.dispatch("order/staticQty");
            }

            return qty;
        },
        async changeQty(method) {
            await this.$store.dispatch("order/changeQty", method);
        },
        async addToCart() {
            var storage = JSON.parse(localStorage.getItem('detailProduct'));
            var data = {
                qty: this.$store.getters["order/qtyOrder"] != "" ? storage.qty : this.$store.getters["order/qtyOrder"],
                subtotal: this.$store.getters["order/subtotal"] == "" ? storage.subtotal : this.$store.getters["order/subtotal"],
                name: this.$store.getters["order/detailProductName"] == "" ? storage.name : this.$store.getters["order/detailProductName"],
                productId: this.$store.getters["order/productId"] == "" ? storage.productId : this.$store.getters["order/productId"],
                price: this.$store.getters["order/productPrice"] == "" ? storage.price : this.$store.getters["order/productPrice"]
            };

            this.loading = true;
            await this.$store.dispatch("order/cart", data);
            this.loading = false;
            if (this.$store.getters["order/cartStatus"] != "" || this.$store.getters["order/cartStatus"] != false) {
                this.$toasted.show(this.$store.getters["order/successCart"], { 
                    theme: "bubble",
                    position: "bottom-center", 
                    duration : 2000
                });
            }
        }
    },
    mounted() {
        document.getElementById('main-detail').focus();
    },
    computed: {
        image() {
            let data = this.getImage();
            return data;
        },
        name() {
            let data = this.getName();
            return data;
        },
        price() {
            let data = this.getPrice();
            return data;
        },
        qty() {
            let data = this.getQty();
            return data;
        },
        stock() {
            return this.$store.getters["order/productStock"];
        },
        subtotal() {
            let data = this.getSubtotal();
            return data;
        }
    }
}
</script>

<style scoped>
.main-detail {
    padding: 48px 200px 0 200px;
}

.section-detail {
    display: flex;
    width: 100%
}

.image {
    text-align: left;
    border: 1px solid #DFDFDF;
    border-radius: 10px;
    width: 342px;
    height: 342px;
}

.col-image {
    width: 35%;
}

.col-text {
    width: 40%;
    padding: 0 30px;
}

.col-order {
    width: 25%;
    padding: 0;
}

.image > img {
    width: 322px;
    height: 322px;
}

.text-detail,
.price {
    text-align: left;
    font-style: normal;
    font-weight: bold;
    font-size: 27px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-transform: capitalize;
    margin-bottom: 0;
}

.price {
    margin-top: 40px;
}

.product-helper {
    display: flex;
    align-items: center;
}

.sold-text,
.rating-text {
    color: #212121;
    font-size: 16px;
    text-align: left;
}

.sold-number,
.rating-text > span {
    color: #A9A9A9;
    font-size: 15px;
    margin-left: 8px;
}

.dot {
    width: 5px;
    height: 5px;
    background: #818080;
    border-radius: 50%;
    margin: 0 20px;
}

.rating {
    display: flex;
    align-items: center;
}

.rating-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

.tab-detail-product {
    text-align: left;
}

.tab-detail-product p {
    color: #212121 !important;
    font-size: 16px;
}

.tab-detail-product span {
    color: #A9A9A9;
    text-transform: capitalize;
}

.card-order {
    border: 1px solid #DFDFDF;
    padding: 10px;
    border-radius: 10px;
}

.card-order p {
    color: #212121;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
}

.parent-action {
    text-align: left;
    margin-top: 10px;
}

.btn-group {
    border: 1px solid #DFDFDF;
    border-radius: 8px;
}

.btn-group > button:focus {
    outline: none;
    box-shadow: none;
}

.stock-text {
    color: #A9A9A9 !important;
    font-size: 13px !important;
    margin-top: 8px;
    font-weight: normal !important;
}

.total {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.subtotal-text {
    color: #A9A9A9 !important;
    font-size: 18px !important;
    margin-top: 22px;
    text-transform: capitalize;
}

.subtotal-price {
    margin-bottom: 0;
}

.btn-cart {
    border-radius: 10px;
    background: #006664;
    color: #FFF;
    text-transform: capitalize;
    width: 100%;
}
</style>

<style>
/* tabs */
.detail-tabs > div > ul > li > a {
    font-style: normal;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #A9A9A9;
    padding-top: 10px;
    padding-bottom: 10px;
    border: none !important;
    border-bottom: 1px solid #DFDFDF !important;
}

.detail-tabs > div > ul > li > a.active {
    color: #212121 !important;
    font-weight: 600;
    border: none !important;
    border-bottom: 1px solid #DFDFDF !important;
}

.detail-tabs > div > ul > li {
    border-bottom: none;
}
</style>