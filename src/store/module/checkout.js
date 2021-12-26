import axios from 'axios'
const state = {
    productCheckout: [],
    customerCheckout: "",
    cartId: [],
    listCourier: [],
    subtotalCheckout: "",
    statusPreCheckout: false,
    statusCheckout: false
};
const getters = {
    statusPreCheckout(state) {
        return state.statusPreCheckout;
    },
    productCheckout(state) {
        return state.productCheckout;
    },
    customerCheckout(state) {
        return state.customerCheckout;
    },
    listCourier(state) {
        return state.listCourier;
    },
    subtotalCheckout(state) {
        return state.subtotalCheckout;
    },
    cartId(state) {
        return state.cartId;
    },
    statusCheckout(state) {
        return state.statusCheckout;
    }
};
const mutations = {
    UPDATE_STATUS: (state, payload) => {
        state.statusPreCheckout = payload;
    },
    UPDATE_STATUS_CHECKOUT: (state, payload) => {
        state.statusCheckout = payload;
    },
    LIST_CHECKOUT: (state, payload) => {
        state.productCheckout = payload.product;
        state.listCourier = payload.courier;
        state.customerCheckout = payload.customer;
        state.subtotalCheckout = payload.subtotal;
        state.cartId = payload.cartId;
    },
    UPDATE_LIST_CHECKOUT: (state) => {
        state.productCheckout = [];
        state.listCourier = [];
        state.customerCheckout = "";
        state.subtotalCheckout = "";
        state.cartId = [];
    }
};
const actions = {
    async preCheckout(context, payload) {
        await axios.post('customer/pre-checkout', payload)
        .then(() => {
            context.commit("UPDATE_STATUS", true);
        })
        .catch(err => {
            console.log('error checkout', err);
        })
    },
    async listCheckout(context) {
        await axios.get('customer/list-checkout')
        .then((res) => {
            context.commit("LIST_CHECKOUT", res.data.data);
        })
        .catch(err => {
            console.log('error list checkout', err);
        })
    },
    async checkout(context, payload) {
        await axios.post("/customer/checkout", payload)
        .then((res) => {
            console.log('success checkout', res)
            context.commit("UPDATE_STATUS_CHECKOUT", true);
            context.commit("UPDATE_LIST_CHECKOUT");
        })
        .catch(err => {
            console.log('error checkout', err)
            context.commit("UPDATE_STATUS_CHECKOUT", false);
        })
    }
};
export default {
    namespaced: true,
    actions,
    getters,
    state,
    mutations
  };