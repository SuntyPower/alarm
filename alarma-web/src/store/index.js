import Vue from 'vue'
import Vuex from 'vuex'
import reportsService from '@/services/reports'
Vue.use(Vuex)

const store = new Vuex.Store({
  // variables globales
  state: {
    reports: [],
    devices: [],
    now: new Date(),
    test: true
  },
  // funciones
  mutations: {
    // addReports (state, payload) {
    //   state.reports.splice(0, 0, payload)
    // },
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
    getReports (context) {
        return reportsService.search({uuid: '1234'})
        .then((res) => {
          context.commit('setReports', res.reports)
        })
    }
  }
})


export default store
