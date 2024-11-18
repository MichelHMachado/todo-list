import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  { path: "/login", name: "LoginPage", component: Login },
  { path: "/signup", name: "SignUpPage", component: Signup },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (requiresAuth && !isAuthenticated) {
    return next("/login");
  }

  if ((to.path === "/login" || to.path === "/signup") && isAuthenticated) {
    return next("/");
  }

  next();
});

export default router;
