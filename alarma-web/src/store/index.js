import Vue from 'vue'
import Vuex from 'vuex'
import reportsService from '@/services/reports'

Vue.use(Vuex)

// get user from localStorage
const plugin = store => {
  if (!store.logged && window.localStorage.user) {
    store.commit('setUser')
    store.dispatch('setDevices')
  } else {
    store.commit('logout')
  }
}

const store = new Vuex.Store({
  // variables globales
  state: {
    user: null,
    devices: [],
    logged: true,
    now: new Date(),
    test: true
  },

  // funciones
  mutations: {
    logout (state) {
      state.user = null
      state.logged = false
      state.devices = []
      state.reports = []
      window.localStorage.clear()
    },
    setUser (state) {
      state.logged = true
      const user = JSON.parse(window.localStorage.user).user
      state.user = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    },
    setDevices (state, payload) {
      state.devices = payload
    },
    updateTime (state) {
      state.now = new Date()
    }
  },

  getters: {
  },

  actions: {
    logout (context) {
      return context.commit('logout')
    },
    setDevices (context) {
      console.log('set all devices and reports')
      const devices = JSON.parse(window.localStorage.user).user.devices
      let payload = []

      devices.forEach(d => {
        reportsService.search(d)
          .then(res => {
            console.log(res)
            payload.push({
              _id: res._id,
              reports: res.reports,
              version: res.version,
              state: res.state
            })
          })
      })
      return context.commit('setDevices', payload)
    }
  },
  plugins: [plugin]
})


export default store
