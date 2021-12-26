import Vue from "vue";
import Vuex from "vuex";

//modules
import order from './module/order'
import product from './module/product'
import checkout from './module/checkout'
import general from './module/general'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  modules: {
    order: order,
    product: product,
    checkout: checkout,
    general: general
  }
});