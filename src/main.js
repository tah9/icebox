import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';

// import less from 'less'
// Vue.use(less)

import navbar from "@/components/navbar";

import store from './store'
// import echarts from 'echarts'
Vue.use(navbar);
// Vue.prototype.$echarts = echarts
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
    router,

    render: function (h) {
        return h(App)
    },

    store,

    methods: {
        getUser() {
            return JSON.parse(window.localStorage.getItem('user'))
        },
        setUser(user) {
            window.localStorage.setItem("user", JSON.stringify(user))
        }
    }
}).$mount('#app')
