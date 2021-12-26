import axios from 'axios';

const state = {
    bestSeller: [],
    helper: "",
    promo: [],
    current: [],
};
const getters = {
    bestSeller(state) {
        return state.bestSeller;
    },
    promo(state) {
        return state.promo;
    },
    current(state) {
        return state.current;
    },
    helperError(state) {
        return state.helper;
    }
};
const mutations = {
    GET_PRODUCT: (state, payload) => {
        var bestSeller = payload.bestSeller;
        var promo = payload.promo;
        var current = payload.current;
        state.bestSeller = bestSeller;
        state.promo = promo;
        state.current = current;
    }
};
const actions = {
    async getProduct(context) {
        var url = process.env.VUE_APP_BACKEND_URL;
        axios(url + '/product')
        .then((res) => {
            if (res.data.data.length == 0) {
                context.state.helper = 'This data is empty';
            } else {
                context.commit("GET_PRODUCT", res.data.data);
            }
        })
        .catch(err => {
            console.log(err);
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