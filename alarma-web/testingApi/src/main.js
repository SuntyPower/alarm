import Vue from 'vue'
import App from '@/App.vue'
import config from '@/config'

import VueRouter from 'vue-router'
import routes from '@/routes'

import EventBuss from '@/plugins/event-bus'

import moment from 'moment'
require('moment/locale/es')

import VueSocketio from 'vue-socket.io'


Vue.use(VueSocketio, 'http://localhost:4000')
Vue.use(VueRouter)
Vue.use(EventBuss)
Vue.use(require('vue-moment'))



const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  moment
})
