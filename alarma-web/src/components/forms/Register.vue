<template lang="pug">
  #register
    .container(v-show="errors")
        .notification.is-danger(v-for="error in errors") {{error}}
    .container(v-show="!sucess")
      .field
        .label Nombre *
        .control
          input.input(type="text" placeholder="Nombre" v-model="firstName" )
      .field
        .label Apellido *
        .control
          input.input(type="text" placeholder="Apellido" v-model="lastName")
      .field
        .label email *
        .control
          input.input(type="email" placeholder="email" v-model="email")
      .field
        .label Contraseña *
        .control
          input.input(type="password" placeholder="contraseña" v-model="password")
      .field
        .label Confirme su contraseña *
        .control
          input.input(type="password" placeholder="confirmar contraseña" v-model="confirmPassword")
      button.button.is-primary(@click="checkForm") Registrarse
    .container(v-show="sucess")
        | Guardado con exito {{token}}
</template>
<script>
import registerService from '@/services/register.js'

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
        this.errors.push('Debe completar todos los campos obligatorios (*)')
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
          console.log(res)
          this.user = res.token
          window.localStorage.setItem('user', JSON.stringify(res))
          this.local = JSON.parse(window.localStorage.getItem('user'))
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
