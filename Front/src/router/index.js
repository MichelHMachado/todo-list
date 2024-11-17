import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "HomePage", component: Home },
  { path: "/login", name: "LoginPage", component: Login },
  { path: "/signup", name: "SignUpPage", component: Signup },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
