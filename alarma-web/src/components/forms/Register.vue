<template lang="pug">
    section.hero.is-success.is-fullheight
          .hero-body(v-show="!sucess")
            .container.has-text-centered
              .column.is-4.is-offset-4
                h3.title.has-text-grey Registrarse
                p.subtitle.has-text-grey Crear cuenta en NerVans
                .notification.is-danger(v-for="error in errors") {{error}}

                .box
                  figure.avatar
                      img(src='https://placehold.it/128x128')
                      .field
                        .control
                          input.input.is-large(type="text" placeholder="Nombre" v-model="firstName", @keyup.enter='checkForm')
                      .field
                        .control
                          input.input.is-large(type="text" placeholder="Apellido" v-model="lastName", @keyup.enter='checkForm')
                      .field
                        .control
                          input.input.is-large(type="email" placeholder="email" v-model="email", @keyup.enter='checkForm')
                      .field
                        .control
                          input.input.is-large(type="password" placeholder="contraseña" v-model="password", @keyup.enter='checkForm')
                      .field
                        .control
                          input.input.is-large(type="password" placeholder="confirmar contraseña" v-model="confirmPassword", @keyup.enter='checkForm')
                      button.button.is-primary.is-large(@click="checkForm") Registrarse
                p.has-text-grey
                  router-link(to="/login", tag="a",v-show="!$store.state.logged")
                    |  Ya tienes una cuenta?

</template>
<script>
import registerService from '@/services/register.js'
import * as EmailValidator from 'email-validator'

export default {
  name: 'register',
  data () {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      sucess: false,
      errors: [],
      user: '',
      local: null
    }
  },
  methods: {
    checkForm () {
      this.errors = []
      if (!this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword) {
        this.errors.push('Debe completar todos los campos del formulario')
      }

      if (EmailValidator.validate(this.email) === false) {
        this.errors.push('Debe ingresar un email válido ejemplo@ejemplo.com')
      }

      if (this.password !== this.confirmPassword) {
        this.errors.push('Las contraseñas no son iguales')
      }

      if (this.errors.length === 0) {
        this.postRegister()
      }
    },

    postRegister () {
      registerService.register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      })
        .then(res => {
          this.sucess = true
          this.user = res.token
          window.localStorage.setItem('user', JSON.stringify(res))
          this.local = JSON.parse(window.localStorage.getItem('user'))
          // REDIRECCIONAR A ESTE USUARIO SE CREO Y VERIFICAR CON EMAIL
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
