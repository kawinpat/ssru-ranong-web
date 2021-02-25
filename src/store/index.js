import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import newsModule from "./modules/news"
Vue.use(Vuex);

export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {},

    getters: {},

    actions: {},

    mutations: {},
    modules: {
        newsModule
    },
});