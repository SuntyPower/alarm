import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // variables globales
  state: {
    user: null,
    devices: [],
    logged: true,
    reports: [],
    now: new Date(),
    test: true
  },

  // funciones
  mutations: {
    // addReports (state, payload) {
    //   state.reports.splice(0, 0, payload)
    // },
    logout (state) {
      state.user = null
      state.logged = false
      state.devices = []
      state.reports = []
      window.localStorage.clear()
    },
    setUser (state) {
      state.logged = true
      state.user = JSON.parse(window.localStorage.user).user
    },
    setReports (state, payload) {
      state.reports = payload
    },
    updateTime (state) {
      state.now = new Date()
    }
  },

  getters: {
    getLastReports (state) {
      return state.reports.slice(0, 5)
    }
  },
  actions: {
    logout (context) {
      return context.commit('logout')
    },
    setReports (context, _id) {
      return context.commit('logout', _id)
    }

  }
})


export default store
