import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from "./store/index";
import vuetify from "./plugins/vuetify";
import VueAxios from "vue-axios";
import axios from "axios";
import Loading from "vue-loading-overlay";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(Loading);

import clientService from "../services/clientService";
Vue.prototype.$restApi = clientService;

// Global style
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "vue-loading-overlay/dist/vue-loading.css";
import "./lib/GlobalCss";

import AppLayout from "@/layouts/AppLayout.vue";
import ChildLayout from "@/layouts/ChildLayout.vue";

Vue.component("app-layout", AppLayout);
Vue.component("child-layout", ChildLayout);

Vue.filter("datetimeFormat", function(value) {
    if (value) {
        var options = { year: "numeric", month: "2-digit", day: "numeric" };
        var shift = new Date(value);
        return (
            shift.toLocaleDateString("th-TH", options) +
            " " +
            "เวลา" +
            " " +
            shift.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })
        );
    }
});

Vue.filter("fixCardWord", function(value) {
    if (value.length > 25) {
        return value.slice(0, 25);
    } else return value;
});

Vue.mixin({
    methods: {
        isLoggedIn() {
            if (store.getters.GetLI == "loggedIn-S") return true;
            else return false;
        },
    },
});

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");