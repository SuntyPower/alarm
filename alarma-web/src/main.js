import Vue from 'vue'
import App from '@/App.vue'

// ROUTER
import VueRouter from 'vue-router'
import routes from '@/routes'

import store from '@/store'

// PLUGINS

import EventBus from '@/plugins/event-bus'
// SOCKET
// import VueSocketio from 'vue-socket.io'

// LOCAL STORAGE
import VueLocalStorage from 'vue-localstorage'


// MOMENT
import VueMoment from 'vue-moment'
require('moment/locale/es')
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active', // active class for non-exact links.
  linkExactActiveClass: 'is-active', // active class for *exact* links.
  linkExactDesactiveClass: 'is-desactive' // desactive class for exact links
})
const isAuthenticated = function () {
  return window.localStorage.token
}

router.beforeEach((to, from, next) => {
  // resolver si el usuario esta logueado
  if (!to.meta.isPublic && !isAuthenticated()) {
      return next({
      name: 'login'
    })
  }
  if (to.name === 'login' && isAuthenticated()) {
    return next({
      name: 'profile'
    })
  }
  if (to.name === 'register' && isAuthenticated()) {
    return next({
      name: 'profile'
    })
  }
  return next()
})

Vue.use(VueRouter)
Vue.use(VueMoment)
// Vue.use(VueSocketio, 'http://localhost:4000')
Vue.use(VueLocalStorage)
Vue.use(EventBus)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
