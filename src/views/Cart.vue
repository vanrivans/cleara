<template>
    <div class="main-cart">
        <div class="title">
            <p class="cart-title">keranjang</p>
        </div>
        <div class="section-cart">
            <div class="section-1">
                <!-- <div class="form-check d-flex" @click.prevent="select('a')">
                    <input class="form-check-input" type="checkbox" value="" id="checklist-a" is-check="0">
                    <label class="form-check-label" for="checklist-0">
                        Pilih semua
                    </label>
                </div>

                <div class="divider"></div> -->
                <template v-if="cart.length == 0">
                    <p class="empty-cart">Keranjang anda kosong</p>
                </template>

                <div class="cart-item" v-for="(item, i) in cart" v-bind:key="i">
                    <div class="form-check d-flex align-items-center" @click.prevent="select(i)">
                        <input class="form-check-input custom-check-cart" type="checkbox" :data-id="item.id" value="" :id="`checklist-${i}`" is-check="0">
                        <label class="form-check-label custom-label" :for="`checklist-${i}`">
                            <img :src="require(`@/assets/icon/${item.folder}/${item.image}.png`)" class="icon-cart-item" alt="">
                            <div>
                                <p class="mb-0 title-cart-item">{{ item.name }}</p>
                                <p class="mb-0 price-cart-item">{{ item.price }}</p>
                            </div>
                        </label>
                    </div>
                    <div class="additional-action">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-plus" @click.prevent="changeQty('decrease', item.id)">-</button>
                            <button type="button" class="btn btn-qty">{{ item.qty }}</button>
                            <button type="button" class="btn btn-plus" @click.prevent="changeQty('increase', item.id)">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-2">
                <div class="summary">
                    <p class="summary-title">ringkasan belanja</p>
                    <div class="summary-total">
                        <p class="summary-total-text">Total Harga ( {{ selectedCart.length }} barang)</p>
                        <p class="summary-total-price">{{ selectedPrice }}</p>


                    </div>
                    <div class="divider"></div>
                    
                    <template v-if="loading">
                        <button class="btn btn-checkout disabled">
                            <b-spinner variant="light"></b-spinner>
                        </button>
                    </template>
                    <template v-else>
                        <button class="btn btn-checkout" :class="selectedCart.length > 0 ? '': 'disabled'" @click.prevent="checkout()">
                            Beli ( {{ selectedCart.length }} )
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numeral from 'numeral'
export default {
    name: "Cart",
    data() {
        return {
            loading: false
        }
    },
    methods: {
        select(id = '') {
            var check = document.getElementById('checklist-' + id).getAttribute('is-check');
            var dataId = document.getElementById('checklist-' + id).getAttribute('data-id');
            if (id == 'a') {
                this.checkAll();
            } else if (check == 1) {
                document.getElementById('checklist-' + id).checked = false;
                document.getElementById('checklist-' + id).setAttribute('is-check', '0');
                this.checklistItem(dataId);
            } else {
                document.getElementById('checklist-' + id).checked = true;
                document.getElementById('checklist-' + id).setAttribute('is-check', '1');
                this.checklistItem(dataId, 1);
            }
        },
        checkAll() {
            var parent = document.getElementById('checklist-a');
            var all = document.querySelectorAll('.custom-check-cart');
            var selectAll = [];
            if (parent.getAttribute('is-check') == 0) {
                for (var b = 0; b < all.length; b++) {
                    selectAll.push(all[b].getAttribute('data-id'));
                    all[b].checked = true;
                    all[b].setAttribute('is-check', 1);
                }
                document.getElementById('checklist-a').checked = true;
                document.getElementById('checklist-a').setAttribute('is-check', 1);
                this.checklistItem(selectAll, 1);
            } else {
                for (var i = 0; i < all.length; i++) {
                    selectAll.push(all[i].getAttribute('data-id'));
                    all[i].checked = false;
                    all[i].setAttribute('is-check', 0);
                }
                document.getElementById('checklist-a').checked = false;
                document.getElementById('checklist-a').setAttribute('is-check', 0);
                this.checklistItem(selectAll);
            }
        },
        checklistItem(id, param = '') {
            this.$store.dispatch("order/selectCart", { id: id, param: param });
        },
        changeQty(method, id) {
            this.$store.dispatch("order/updateQty", { method: method, id: id });
        },
        async checkout() {
            var data = this.$store.getters["order/selectedCart"];

            this.loading = true;
            await this.$store.dispatch("checkout/preCheckout", data);
            this.$store.dispatch("order/updateCartStatus");
            this.loading = false;
            if (this.$store.getters["checkout/statusPreCheckout"]) {
                this.$router.push('/checkout');
            } else {
                this.$toasted.show("Failed to checkout item", { 
                    theme: "toasted-primary",
                    position: "bottom-center", 
                    duration : 2000
                });
            }
        }
    },
    async mounted() {
        await this.$store.dispatch("order/updateCart");
    },
    computed: {
        cart() {
            return this.$store.getters["order/cart"];
        },
        selectedCart() {
            return this.$store.getters["order/selectedCart"];
        },
        selectedPrice() {
            if (this.selectedCart.length == 0) {
                return 'Rp. 0';
            } else {
                var data = this.selectedCart;
                var price = [];
                for (var i = 0; i < data.length; i++) {
                    price.push(data[i].total);
                }
                var total = price.reduce(function(total, num) {return (parseInt(total) + parseInt(num))});
                return 'Rp. ' + numeral(total).format(0,0);
            }
        }
    }
}
</script>

<style scoped>
.main-cart {
    padding: 48px 200px 0 200px;
}

.section-cart {
    width: 100%;
    display: flex;
}

.section-1 {
    width: 60%;
}

.section-2 {
    width: 40%;
    padding: 0 20px 10px 20px;
    margin-left: 10px;
}

.summary {
    border: 0.5px solid #DFDFDF;
    border-radius: 10px;
    padding: 20px;
}

.summary-title {
    text-align: left;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-transform: capitalize;
}

.summary-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.btn-checkout {
    background: #006664;
    border-radius: 10px;
    color: #FFF;
    text-transform: capitalize;
    width: 100%;
}

.title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: center;
}

.cart-title {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-align: left;
    text-transform: capitalize;
}

#checklist-a {
    margin-right: 10px;
}

.divider {
    margin-top : 10px;
    margin-bottom: 10px;
    border: 2px solid #DFDFDF;
    background: #DFDFDF;
}

.icon-cart-item {
    width: 100px;
    height: 100px;
}

.title-cart-item {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #212121;
    text-align: left;
}

.price-cart-item {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -0.005em;
    color: #6C6C6C;
    text-align: left;
    margin-top: 10px;
}

.custom-label {
    display: flex;
    align-items: center;
}

.additional-action {
    text-align: right;
}

.btn-group {
    border: 1px solid #DFDFDF;
    border-radius: 8px;
}

.btn-group > button:focus {
    outline: none;
    box-shadow: none;
}
</style>