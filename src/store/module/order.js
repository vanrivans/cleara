import numeral from 'numeral'
import axios from 'axios'
const state = {
    folderImage: "",
    file: "",
    name: "",
    price: "",
    qty: 1,
    stock: 5,
    subtotal: "",
    productId: "",
    cartStatus: "",
    successCart: "",
    cart: [],
    selectedCart: []
};
const getters = {
    folderImage(state) {
        return state.folderImage;
    },
    file(state) {
        return state.file;
    },
    detailProductName(state) {
        return state.name;
    },
    productPrice(state) {
        return state.price;
    },
    qtyOrder(state) {
        return state.qty;
    },
    productStock(state) {
        return state.stock;
    },
    subtotal(state) {
        return state.subtotal;
    },
    productId(state) {
        return state.productId;
    },
    cartStatus(state) {
        return state.cartStatus;
    },
    successCart(state) {
        return state.successCart;
    },
    cart(state) {
        return state.cart;
    },
    selectedCart(state) {
        return state.selectedCart;
    }
};
const mutations = {
    UPDATE_DETAIL: (state, payload) => {
        state.folderImage = payload.folder;
        state.file = payload.file;
        state.name = payload.name;
        state.price = payload.price;
        state.subtotal = payload.price;
        state.productId = payload.productId;
    },
    UPDATE_QTY: (state, payload) => {
        if (payload == 'update') {
            state.qty = 1;
        } else if (payload == 'increase') {
            if (state.qty < state.stock) {
                state.qty += 1;
            }

            let storage = JSON.parse(localStorage.getItem('detailProduct'));
            let replace = storage.price.replace('Rp. ', '').replace('Rp ', '').replace('.', '').replace('.', '').replace(',', '').replace(',', '');
            let total = (parseInt(state.qty) * parseInt(replace));
            let format = numeral(total).format('0,0')
            state.subtotal = 'Rp. ' + format;
            
            // update local storage
            storage.subtotal = 'Rp. ' + format;
            storage.qty = state.qty;
            localStorage.setItem('detailProduct', JSON.stringify(storage));
        } else {
            if (state.qty > 1) {
                state.qty -= 1;
            }

            let storage = JSON.parse(localStorage.getItem('detailProduct'));
            let replace = storage.price.replace('Rp. ', '').replace('Rp ', '').replace('.', '').replace('.', '').replace(',', '').replace(',', '');
            let total = (parseInt(state.qty) * parseInt(replace));
            let format = numeral(total).format('0,0')
            state.subtotal = 'Rp. ' + format;

            // update local storage
            storage.subtotal = 'Rp. ' + format;
            storage.qty = state.qty;
            localStorage.setItem('detailProduct', JSON.stringify(storage));
        }
    },
    UPDATE_CART: (state, payload) => {
        state.cart = payload;
    },
    SELECT_CART: (state, payload) => {
        if (Array.isArray(payload)) {
            state.selectedCart = payload;
        } else {
            state.selectedCart.push(payload);
        }
    },
    UNSELECT_CART: (state, payload) => {
        state.selectedCart.splice(payload, 1);
    }
};
const actions = {
    async detail(context, payload) {
        context.commit("UPDATE_DETAIL", payload);
    },
    async changeQty(context, payload) {
        context.commit("UPDATE_QTY", payload);
    },
    staticQty(context) {
        context.commit("UPDATE_QTY", 'update');
    },
    async cart({state}, payload) {
        var url = process.env.VUE_APP_BACKEND_URL;
        await axios.post(url + '/customer/order', payload)
        .then((res) => {
            state.cartStatus = res.data.success;
            state.successCart = res.data.message;

            // create local storage
            localStorage.setItem('cartStatus', true);
        })
        .catch(err => {
            console.log(err)
        })
    },
    async updateCart(context) {
        axios.get('/customer/order')
        .then((res) => {
            context.commit("UPDATE_CART", res.data.data);
            localStorage.setItem('cart', JSON.stringify(res.data.data));
            
            context.state.selectedCart = [];
        })
        .catch(err => {
            console.log(err)
        })
    },
    updateQty(context, payload) {
        var currentData = state.cart;
        var lastQty;
        for (var i = 0; i < currentData.length; i++) {
            if (currentData[i].id == payload.id) {
                if (payload.method == 'increase') {
                    if (currentData[i].qty < state.stock) {
                        currentData[i].qty = currentData[i].qty + 1
                        lastQty = currentData[i].qty;
                    }
                } else {
                    if (currentData[i].qty > 1) {
                        currentData[i].qty = currentData[i].qty - 1
                        lastQty = currentData[i].qty;
                    }
                }
            }
        }

        // update data on database
        var send = {id: payload.id, qty: lastQty};
        axios.post('/customer/updateCart', send)
        .then((res) => {
            console.log(res)
            context.commit('UPDATE_CART', res.data.data);
            console.log(state.cart)
            // update selected cart
            var currCart = state.selectedCart;
            var newData = res.data.data;
            var newArr = [];
            if (currCart.length > 0) {
                // todo: change total
                for (var a = 0; a < newData.length; a++) {
                    for (var b = 0; b < currCart.length; b++) {
                        if (currCart[b].id == newData[a].id) {
                            newArr.push(newData[a]);
                        }
                    }
                }

                state.selectedCart = newArr;
                console.log('new cart', newArr);
            }
        })
        .catch(err => {
            console.log('error update', err);
        })
    },
    updateCartStatus(context) {
        axios.get('/customer/order')
        .then((res) => {
            if (res.data.success) {
                context.commit("UPDATE_CART", res.data.data);
                state.cartStatus = true;
                localStorage.setItem('cartStatus', 1);
                localStorage.setItem('cart', JSON.stringify(res.data.data));
            } else {
                state.cartStatus = false;
                localStorage.setItem('cartStatus', 0);
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    selectCart(context, payload) {
        var item = state.cart;
        var select;
        var price;
        if (payload.param != '') {
            // push to array
            if (Array.isArray(payload.id)) {
                context.commit("SELECT_CART", item);
            } else {
                for (var i = 0; i < item.length; i++) {
                    if (item[i].id == payload.id) {
                        price = item[i].price.replace('Rp. ', '').replace('Rp, ', '').replace(',', '').replace('.', '').replace(',', '').replace('.', '');
                        item[i].price = 'Rp. ' + numeral(price).format('0,0')
                        select = item[i];
                    }
                }
                context.commit("SELECT_CART", select);
            }
        } else {
            // remove selected id from array
            if (Array.isArray(payload.id)) {
                state.selectedCart = [];
            } else {
                for (var a = 0; a < state.selectedCart.length; a++) {
                    if (state.selectedCart[a].id == payload.id) {
                        context.commit('UNSELECT_CART', a);
                    }
                } 
            }
        }
    }
};
export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations
};