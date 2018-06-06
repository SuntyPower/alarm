import Vue from 'vue'
import App from '@/App.vue'

// ROUTER
import VueRouter from 'vue-router'
import routes from '@/routes'

import store from '@/store'



// SOCKET
import VueSocketio from 'vue-socket.io'


// MOMENT
import VueMoment from 'vue-moment'
require('moment/locale/es')
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active', // active class for non-exact links.
  linkExactActiveClass: 'is-active' // active class for *exact* links.
})

Vue.use(VueRouter)
Vue.use(VueMoment)
Vue.use(VueSocketio, 'http://localhost:4000')

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
