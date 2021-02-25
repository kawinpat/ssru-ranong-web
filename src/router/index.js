import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import news from "../views/news/News.vue";
import newsContent from "../views/news/NewsContent.vue";
import about from "../views/About.vue";
import login from "../views/Login.vue";
import talking from "../views/talking/Talking.vue";
import discussion from "../views/talking/Discussion.vue";
// import contract from "../views/Contract.vue";
import tourVR from "../views/tour-vr/tour-vr.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/news",
        name: "News",
        component: news,
        meta: {
            layout: "child",
        },
    },
    {
        path: "/news/content",
        name: "NewsContent",
        component: newsContent,
        meta: {
            layout: "child",
        },
    },
    {
        path: "/about",
        name: "About",
        component: about,
        meta: {
            layout: "child",
        },
    },
    {
        path: "/talking",
        name: "Talking",
        component: talking,
        meta: {
            layout: "child",
        },
    },
    {
        path: "/talking/discussion",
        name: "Discussion",
        component: discussion,
        meta: {
            layout: "child",
        },
    },
    {
        path: "/login",
        name: "Login",
        component: login,
        meta: {
            layout: "child",
        },
    },
    {
        path: "/tour/vr",
        name: "TourVR",
        component: tourVR,
        meta: {
            layout: "child",
        },
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/About.vue')
    // },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;