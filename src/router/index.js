import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'one',
                component: () => import('../views/one/one')
            }, {
                path: 'center',
                component: () => import('../views/center/center')
            }, {
                path: 'user',
                component: () => import('../views/user/user')
            }, {
                path: 'two',
                component: () => import('../views/two/two')
            }, {
                path: 'three',
                component: () => import('../views/three/three')
            }
        ]
    }, {
        path: '/info/:name',
        component: () => import('../views/center/FoodInfo')
    }, {
        path: '/info2/:name',
        component: () => import('../views/center/FoodInfo2')
    }, {
        path: '/login',
        component: () => import('../views/login/Login')
    }, {
        path: '/editMess',
        component: () => import('../views/user/EditMess')
    }, {
        path: '/register',
        component: () => import('../views/login/Register')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
