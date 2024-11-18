import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

Vue.use(VueVirtualScroller);
Vue.use(BootstrapVue);
Vue.component("RecycleScroller", VueVirtualScroller.RecycleScroller);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
