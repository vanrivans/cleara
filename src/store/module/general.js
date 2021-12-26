const state = {
    isLoadingPage: false
};
const getters = {
    isLoadingPage(state) {
        return state.isLoadingPage;
    }
};
const mutations = {
    CHANGE_LOADING: (state, payload) => {
        state.isLoadingPage = payload;
    }
};
const actions = {
    handleLoadingPage(context, payload) {
        context.commit("CHANGE_LOADING", payload);
    }
};

export default {
    namespaced: true,
    actions,
    getters,
    state,
    mutations
  };