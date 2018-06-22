<template lang="pug">
  section.hero.is-success.is-fullheight
        .hero-body
          .container.has-text-centered(v-show="!sucess")
            .column.is-4.is-offset-4
              h3.title.has-text-grey Iniciar Sesión
              p.subtitle.has-text-grey Ingrese su Usuario y Contraseña
              .box
                figure.avatar
                  img(src='https://placehold.it/128x128')
                  .field
                    .control
                      input.input.is-large(type='text', placeholder='Email', v-model="email")
                  .field
                    .control
                      input.input.is-large(type='password', placeholder='Su Contraseña', v-model="password")
                  .field
                    label.checkbox
                      input(type='checkbox')
                      |                   Recuerdame
                  button.button.is-primary(v-on:click="login") Login
              //- p.has-text-grey
              //-   a(href='/') Registrarse
              //-   |   · 
              //-   a(href='/') Olvidaste tu contraseña?
              //-   |   · 
              //-   a(href='/') Ayuda
        .container(v-show="sucess")
            p  dagad{{message}}
</template>
<script>
import loginServices from '@/services/login.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      email: null,
      password: null,
      sucess: false,
      message: null
    }
  },
  methods: {
    ...mapActions(['setUser']),
    login () {
      loginServices.login({
        email: this.email,
        password: this.password
      })
        .then(res => {
          this.message = res
          this.sucess = true
          window.localStorage.token = res.token
          window.localStorage.user = window.atob(res.token.split('.')[1])
          this.setUser()
          this.$router.push('/reports')
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
