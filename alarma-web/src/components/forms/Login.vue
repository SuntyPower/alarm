
<template lang="pug">
  section.hero.is-success.is-fullheight
        .hero-body(v-show="!sucess")
          .container.has-text-centered
            .column.is-4.is-offset-4
              h3.title.has-text-grey Iniciar Sesión
              p.subtitle.has-text-grey Ingrese su Usuario y Contraseña
              .notification.is-danger(v-for="error in errors") {{error}}

              .box
                figure.avatar
                  img(src='https://placehold.it/128x128')
                  .field
                    .control
                      input.input.is-large(type='text', placeholder='Email', v-model="email", @keyup.enter='login')
                  .field
                    .control
                      input.input.is-large(type='password', placeholder='Su Contraseña', v-model="password", @keyup.enter='login')
                  .field
                    label.checkbox
                      input(type='checkbox')
                      |                   Recuerdame
                  button.button.is-primary.is-large(v-on:click='login') Login
              p.has-text-grey
                router-link(to="/register", tag="a", v-show="!$store.state.logged") Registrarse
                  |   · 
                router-link(to="/login", tag="a",v-show="!$store.state.logged")
                  |  Olvidaste tu contraseña?
</template>
<script>
import * as EmailValidator from 'email-validator'
import loginServices from '@/services/login.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      email: null,
      password: null,
      sucess: false,
      message: null,
      errors: []
    }
  },

  methods: {
    ...mapMutations(['setUser']),

    login () {
      this.errors = []
      if (!this.password || !this.email) {
        this.errors.push('Debe ingresar un email y una contraseña')
        return
      }
      if (EmailValidator.validate(this.email) === false) {
        this.errors.push('Debe ingresar un email válido ejemplo@ejemplo.com')
        return
      }

      loginServices.login({
        email: this.email,
        password: this.password
      })
        .then(res => {
            this.message = res.message
            // cambiar luego a que lo maneje un action de vuex
            window.localStorage.token = res.token
            window.localStorage.user = window.atob(res.token.split('.')[1])
            this.setUser()
            this.$store.dispatch('setDevices')
            this.$router.push('/devices')
          })
        .catch(err => {
          console.log(err)
          this.errors.push('error al iniciar sesion email y/o contraseña invalidos')
        })
      }
  }
}
</script>
<style lang="scss" scoped>
html,body {
  font-family: 'Open Sans', serif;
  font-size: 14px;
  font-weight: 300;
}
.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}

p.subtitle {
  padding-top: 1rem;
}
</style>
