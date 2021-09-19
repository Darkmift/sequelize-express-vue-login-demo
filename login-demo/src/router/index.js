import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from "../store"


Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/forms/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/forms/Register.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch({ type: 'checkLocalStorageForUser' }).then(() => {
    if ((to.name !== 'Login' && to.name !== 'Register') && !store.getters.user) next({ name: 'Login' })
    else next()
  })
})


router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.name || 'Demo-Login-App';
  });
});

export default router
