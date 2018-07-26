
<template lang="pug">
#reports
  .container
    div(v-for="a in alerts")
      notifiaction-report(
        :sensor="a.type",
        :zone="a.zone",
        :timeAgo="a.createdAt",
        :triggered="a.triggered"
        )
    table.table.is-fullwidth
      thead
        tr
          th.is-info(title="tiempo transcurrido") TIEMPO
          th.is-info(title="zona del sensor") ZONA
          th.is-info(title="deteccion de movimiento") REPORTE
          th.is-info(title="tipo de sensor") SENSOR
      tbody(v-for="r in reports")
        tr
          td(v-bind:class="[ r.triggered ? danger : '', okay]") {{r.createdAt | moment("from", now )}}
          td(v-bind:class="[ r.triggered ? danger : '', okay]") {{r.zone| getZone | toUpperCase}}
          td(v-bind:class="[ r.triggered ? danger : '', okay]") {{r.triggered | getReport}}
          td(v-bind:class="[ r.triggered ? danger : '', okay]") {{r.type | toUpperCase}}
</template>
<script>
import notifiactionReport from '@/components/cards/Report.vue'
import { mapState } from 'vuex'
export default {
  components: {
    notifiactionReport
  },
  name: 'reports',

  data () {
    return {
        alerts: [],
        danger: 'is-danger',
        okay: 'is-success',
        reports: []
    }
  },
  mounted () {
    this.setReports()
  },

  computed: {
    ...mapState(['now'])
   },

  filters: {
    toUpperCase: function (str) {
      return str.toUpperCase()
    },

    getZone (zone) {
      switch (zone) {
        case 0:
          return 'COCINA'
          break
        case 1:
          return 'DORMITORIO'
          break
        case 2:
          return 'PATIO'
        default:
          return 'CASA'
        }
    },

    getReport: function (report) {
      if (report) {
        return 'MOVIMIENTO'
      } else return 'SIN MOVIMIENTO'
    }
  },

  methods: {
    setReports () {
      this.reports = this.$store.state.reports
  }
}
}
</script>

<style lang="scss" scoped>
  .container {
    max-width: 600px;
  }


</style>
