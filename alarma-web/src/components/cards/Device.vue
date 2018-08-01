<template lang="pug" scoped>
      .card(@mouseover="setCurrentDevice")
        .card-image
          figure.image.is-4by3
            img(src='@/assets/casa-principal.jpg', alt='Placeholder image')
        .card-content
          .media
            .media-left
              figure.image.is-48x48
                img(src='@/assets/user.png', alt='Placeholder image')
            .media-content
              p.title.is-4 {{firstName}} {{lastName}}
              p.subtitle.is-6 {{email}}
          .content
            p ID dispositivo: {{_id}}
            router-link.navbar-item.router-link-exact-active(to="/reports", tag="a") #Historial de reportes
            router-link.navbar-item.router-link-exact-active(to="/profile", tag="a") #Modificar
            .field
              app-switch(classes='is-warning', v-model='value', :checked='state') {{text}}

</template>

<script>
import Switch from '@/components/utils/Switch'
import reportsService from '@/services/reports'
export default {
  name: 'devices-card',
  components: {
   'app-switch': Switch
 },
  props: {
    firstName: '',
    lastName: '',
    email: '',
    _id: '',
    state: '',
    reports: null
  },
  data () {
    return {
    value: false,
    text: 'Enabled!'
    }
  },
  created () {
    this.value = this.state
  },
  watch: {
    value (val) {
      this.switched(this._id, val)
      this.text = val ? 'ALARMA ACTIVADA' : 'ALARMA DESACTIVADA'
    }
  },
  methods: {
     switched (_id, val) {
        reportsService.setAlarmState(_id, Number(val))
          .then(res => console.log('Api response: ', res))
          .catch(err => console.log('Api error', err))
      },
      setCurrentDevice () {
        if (this._id !== this.$store.state.currentDevice) {
          this.$store.commit('setCurrentDevice', this._id)
          }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
