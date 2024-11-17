import Vue from "vue";
import VueRouter from " vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "SignUp", component: Signup },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
