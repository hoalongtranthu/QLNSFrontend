import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueRouter, VueAxios, axios)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')