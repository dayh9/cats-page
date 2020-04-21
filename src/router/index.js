import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/catsgallery",
    name: "CatsGallery",
    component: () => import("../views/CatsGallery.vue"),
  },
  {
    path: "/randomcat",
    name: "RandomCat",
    component: () => import("../views/RandomCat.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
