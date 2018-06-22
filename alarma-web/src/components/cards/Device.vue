<template lang="pug">
      .columns
        .column.is-one-quarter(v-for="d in user.devices")
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
                p ID dispositivo: {{d}}
                router-link.navbar-item.router-link-exact-active(to="/reports", tag="a") #Historial Reportes
                router-link.navbar-item.router-link-exact-active(to="/profile", tag="a") #Modificar
                .field
                  input#switchRoundedDefault.switch.is-rounded(type='checkbox', name='switchRoundedDefault', v-model='checked')
                  label( for='switchRoundedDefault') {{checked ? 'ALARMA ACTIVADA' : 'ALARMA DESACTIVADA' }}

</template>

<script>
export default {
  data () {
    return {
      user: null,
      checked: false
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.user).user
  },
  methods: {
    switch () {
      if (this.checked) {
        this.checked = false
        } else {
        this.checked = true
        }
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>

</style>
