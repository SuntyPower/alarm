
<template lang="pug">
  #notifiaction-report(v-if="!destroy")
    .notification.is-rounded.has-text-centered(v-bind:class="[ triggered ? danger : '', okay]")
      | Movimiento Detectado en {{zone | toUpperCase}} por el sensor {{sensor | toUpperCase}}
</template>
<script>

export default {
  name: "notifiaction-report",
  props: {
    sensor: { type: String, required: true},
    zone: { type: Number, required: true},
    timeAgo: { type: Object, required: true},
    triggered: { type: Boolean, required: true}
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
    }
  },
  mounted() {
    //do something after mounting vue instance
    setTimeout(()=>{
      this.destroy = true
    },10000)
  }
}
</script>


<style lang="scss" scoped>

  .notification {
    margin: 0.4em 2em;
  }
</style>
