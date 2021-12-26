<template>
    <div class="main-checkout">
        <div class="title">
            <p class="checkout-title mb-0">Checkout</p>
        </div>

        <template v-if="product.length == 0">
            <p>Pilih barang terlebih dahulu</p>
        </template>
        <template v-else>
            <div class="parent-section">
                <div class="section-1">
                    <div class="address-area">
                        <p class="mb-0 title-address">alamat pengiriman</p>

                        <div class="divider"></div>

                        <div class="list-customer">
                            <p class="mb-0 customer-name">{{ customer.name }}</p>
                            <p class="mb-0 customer-phone">085795327357</p>
                            <p class="mb-0 customer-phone">{{ customer.address }}</p>
                        </div>

                        <div class="divider"></div>

                        <div class="list-product" v-for="item in product" v-bind:key="item.id">
                            <div class="img-product">
                                <img :src="require(`@/assets/icon/${item.folder}/${item.img}.png`)" alt="">
                            </div>
                            <div class="detail-product">
                                <p class="mb-0 product-name">{{ item.name }}</p>
                                <p class="mb-0 product-qty">{{ item.qty }} barang</p>
                                <p class="mb-0 product-price">{{ item.formatPrice }}</p>
                            </div>
                        </div>

                        <div class="divider"></div>

                        <div class="list-courier">
                            <div>
                                <b-dropdown id="dropdown-1" :text="textCourier" class="m-md-2 btn-courier">
                                    <b-dropdown-item v-for="l in courier" v-bind:key="l.id" @click.prevent="chooseCourier(l.id, l.name, l.price, l.formatPrice, l.estimation)">
                                        <template>
                                            <div class="d-flex align-items-center justify-content-between">
                                                <span>{{ l.name }}</span>
                                                <span>{{ l.formatPrice }} ( {{ l.estimation }} hari ) </span>
                                            </div>
                                        </template>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>

                            <div class="selected-courier" v-show="isSelectCourier">
                                <p class="mb-0">Kurir pilihan</p>
                                <p class="mb 0 selected-courier-name">{{ selectedCourierName }} <span>({{ selectedCourierFormatPrice }})</span> </p>
                                <p class="mb-0 selected-courier-estimation">Estimasi sampai dalam {{ selectedCourierEstimation }} hari</p>
                            </div>
                        </div>

                        <div class="divider"></div>
                    </div>
                </div>
                <div class="section-2">
                    <div class="card-order">
                        <p class="mb-2">
                            Ringkasan Belanja
                        </p>
                        <div class="parent-action">

                            <div class="total">
                                <p class="total-product mb-0">Total harga ({{ product.length }} produk) </p>
                                <p class="total-product mb-0">{{ totalProduct }}</p>
                            </div>
                            <div class="total" v-show="isSelectCourier">
                                <p class="total-courier mb-0">Total ongkos kirm</p>
                                <p class="total-courier mb-0">{{ selectedCourierFormatPrice }}</p>
                            </div>
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
                                    <button class="btn btn-cart" :class="isSelectCourier ? '' : 'disabled'" v-b-modal.modal-1>Pilih Pembayaran</button>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>


        <!-- modal -->
        <b-modal id="modal-1" centered title="Pilih Pembayaran" @ok="handleOk">

            <div class="form-check custom-form">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1" v-model="payment" @change="changePayment($event)">
                <label class="form-check-label" for="exampleRadios1">
                    <div class="list-payment d-flex align-items-center">
                        <img src="@/assets/icon/mandiri.svg" style="width: 86px; height: auto; margin-right: 10px;" alt="">
                        <p class="mb-0 list-payment-text">Mandiri virtual account</p>
                    </div>
                </label>
            </div>
            <div class="form-check custom-form">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="2" v-model="payment" @change="changePayment($event)">
                <label class="form-check-label" for="exampleRadios2">
                    <div class="list-payment d-flex align-items-center">
                        <img src="@/assets/icon/bca.png" style="width: 86px; height: auto; margin-right: 10px;" alt="">
                        <p class="mb-0 list-payment-text">BCA virtual account</p>
                    </div>
                </label>
            </div>

            <div class="divider"></div>

            <div class="form-group" style="margin-top: 10px;">
                <input type="email" v-model="email" @input="validateEmail" placeholder="Write your email" class="form-control">
            </div>

            <template #modal-footer="{ ok, cancel }">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="sm" variant="success" @click="ok()" :class="isSelectPayment ? '' : 'disabled'">
                    Bayar
                </b-button>
                <b-button size="sm" variant="danger" @click="cancel()">
                    Batal
                </b-button>
            </template>
        </b-modal>

        <!-- loading -->
        <div class="vld-parent">
            <loading :active="isLoading"
                    :can-cancel="false"
                    :is-full-page="fullPage"/>

            <!-- <label><input type="checkbox" v-model="fullPage">Full page?</label>
            <button @click.prevent="doAjax">fetch Data</button> -->
        </div>
        <!-- end loading -->

    </div>
</template>

<script>
import numeral from 'numeral'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: "Checkout",
    data() {
        return {
            textCourier: "Pilih Pengiriman",
            selectedCourierId: "",
            selectedCourierName: "",
            selectedCourierFormatPrice: "",
            selectedCourierPrice: "",
            selectedCourierEstimation: "",
            isSelectCourier: false,
            loading: false,
            emailValidate: false,
            payment: "",
            email: "",
            fullPage: true
        }
    },
    components: {
        Loading
    },
    methods: {
        async dataGeneral() {
            await this.$store.dispatch("checkout/listCheckout")
        },
        chooseCourier(id, name, price, formatPrice, estimation) {
            this.selectedCourierId = id;
            this.textCourier = name;
            this.selectedCourierName = name;
            this.selectedCourierFormatPrice = formatPrice;
            this.selectedCourierPrice = price;
            this.isSelectCourier = true;
            this.selectedCourierEstimation = estimation;
        },
        changePayment(event) {
            var value = event.target.value;
            this.payment = value;
        },
        async handleOk() {
            var send = this.dataSubmit;

            this.$store.dispatch("general/handleLoadingPage", true);
            await this.$store.dispatch("checkout/checkout", send)
            this.$store.dispatch("general/handleLoadingPage", false);
            if (this.$store.getters["checkout/statusCheckout"]) {
                this.$router.push('/success');
            } else {
                this.$toasted.show("Proses checkout gagal", { 
                    theme: "bubble",
                    position: "bottom-center", 
                    duration : 5000
                });
            }
        },
        validateEmail() {
            /* eslint-disable */
            // var reg = '/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})/';
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                this.emailValidate = true;
            } else {
                this.emailValidate = false;
            }
        }
    },
    mounted() {
        this.dataGeneral();
    },
    computed: {
        customer() {
            return this.$store.getters["checkout/customerCheckout"];
        },
        product() {
            return this.$store.getters["checkout/productCheckout"];
        },
        courier() {
            return this.$store.getters["checkout/listCourier"];
        },
        totalProduct() {
            return 'Rp. ' + numeral(this.$store.getters["checkout/subtotalCheckout"]).format(0,0);
        },
        cartId() {
            return this.$store.getters["checkout/cartId"];
        },
        subtotal() {
            if (this.selectedCourierPrice == "") {
                return this.totalProduct;
            } else {
                var count = (parseInt(this.$store.getters["checkout/subtotalCheckout"]) + parseInt(this.selectedCourierPrice));
                return 'Rp. ' + numeral(count).format(0,0);
            }
        },
        isSelectPayment() {
            if (this.payment != "" && this.email != "" && this.emailValidate) {
                return true;
            } else {
                return false;
            }
        },
        dataSubmit() {
            var data = {
                product: this.product,
                payment: this.payment,
                cartId: this.cartId,
                email: this.email,
                courier: this.selectedCourierId
            };

            return data;
        },
        isLoading() {
            return this.$store.getters["general/isLoadingPage"];
        }
    }
}
</script>

<style scoped>
.custom-form {
    display: flex;
    align-items: center;
}

.divider {
    margin-top: 10px;
}

.main-checkout {
    padding: 48px 200px 0 200px;
}

.parent-section {
    display: flex;
}

.section-1 {
    width: 60%;
    padding: 0 30px 0 0;
}

.section-2 {
    width: 40%;
    padding: 0 0 0 30px;
}

.title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: center;
}

.checkout-title,
.title-address {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-align: left;
    text-transform: capitalize;
}

.title-address {
    font-size: 18px;
    font-weight: 600;
}

.list-customer {
    text-align: left;
    margin-top: 5px;
}

.customer-name {
    color: #212121;
    font-weight: bold;
}

.list-product {
    display: flex;
    margin: 24px 0;
}

.img-product > img {
    width: 86px;
    height: 86px;
}

.detail-product {
    text-align: left;
}

.product-name,
.product-qty,
.product-price {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-align: left;
    text-transform: capitalize;
}

.product-qty {
    font-weight: normal;
    font-size: 14px;
    color: #6C6C6C;
    margin-top: 2px;
}

.product-price {
    margin-top: 4px;
    font-weight: normal;
}

.list-courier {
    margin-top: 10px;
}

.selected-courier {
    text-align: left;
    margin-top: 10px;
}

.selected-courier > p:first-child {
    color: #212121;
    font-weight: bold;
    font-size: 16px;
}

.total {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.total-product,
.total-courier {
    font-weight: normal;
    font-size: 14px;
    color: #6C6C6C;
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

.list-payment {
    margin-bottom: 12px;
    margin-top: 12px;
    margin-left: 24px;
}

.list-payment-text {
    font-size: 18px;
    font-weight: 700;
    margin-left: 10px;
    text-transform: capitalize;
}
</style>

<style>
.btn-courier {
    width: 100%;
}
.btn-courier > button {
    background: #006664;
    color: #fff;
    width: 100% !important;
    border-radius: 10px;
}

.btn-courier > button:active {
    background: #006664;
}

.btn-courier > ul {
    width: 100%;
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
</style>