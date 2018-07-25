<template lang="pug">
  .columns
    .column.is-one-quarter(v-for="d in devices")
      .card
        .card-image
          figure.image.is-4by3
            img(src='@/assets/casa-principal.jpg', alt='Placeholder image')
        .card-content
          .media
            .media-left
              figure.image.is-48x48
                img(src='@/assets/user.png', alt='Placeholder image')
            .media-content
              p.title.is-4 {{user.firstName}} {{user.lastName}}
              p.subtitle.is-6 {{user.email}}
          .content
            p ID dispositivo: {{d._id}}
            router-link.navbar-item.router-link-exact-active(to="/reports", tag="a") #Historial Reportes
            router-link.navbar-item.router-link-exact-active(to="/profile", tag="a") #Modificar
            .field
              input#switchRoundedDefault.switch.is-rounded(type='checkbox', name='switchRoundedDefault', v-model='checked', @click='switched')
              label( for='switchRoundedDefault') {{checked ? 'ALARMA ACTIVADA' : 'ALARMA DESACTIVADA' }}

</template>

<script>
import mapState from 'vuex'
import reportsService from '@/services/reports'
export default {
  data () {
    return {
      checked : false
    }
  },

  computed: {
    devices () {
      return this.$store.state.devices
    },
    user () {
      return this.$store.state.user
    }

  },
  created () {
    this.checked = false
    // pedir al dispositivo el estado del mismo...
    // reportsService.getAlarmState()
  },
  methods: {
     switched () {
      if (this.checked) {
        this.checked = false
        console.log('hola')
        reportsService.setAlarmState(this.devices[0], this.checked)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        } else {
        this.checked = true
        reportsService.setAlarmState(this.devices[0], this.checked)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
