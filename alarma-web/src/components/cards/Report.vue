
<template lang="pug">
  #notifiaction-report(v-if="!destroy")
    .notification.is-rounded.has-text-centered(v-bind:class="[ triggered ? danger : '', okay]")
      | Movimiento Detectado en {{zone | getZone |toUpperCase }} por el sensor {{sensor | toUpperCase}}
</template>
<script>
export default {
  name: 'notifiaction-report',
  props: {
    sensor: null,
    zone: null,
    timeAgo: null,
    triggered: null
  },
  data () {
    return {
      danger: 'is-danger',
      okay: 'is-success',
      destroy: false
    }
  },

  filters: {
    toUpperCase: function (str) {
        return str.toUpperCase()
    },
    getZone: function (zone) {
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
    switch (report) {
      case '0':
        return 'SIN MOVIMIENTO'
        break
      case '1':
        return 'MOVIMIENTO DETECTADO'
      case '2':
        return 'MOVIMIENTO DETECTADO'
      default:
      }
    }
  },
  created () {

  },
  mounted () {
    // do something after mounting vue instance
    setTimeout(() => {
      this.destroy = true
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>

  .notification {
    margin: 0.4em 2em;
  }
</style>
