<template lang="pug">

.div
  nav.navbar.is-info
    .container
      .navbar-brand
        a.navbar-item
            img(src='@/assets/logo.png', alt='Logo')
        span.navbar-burger.burger(data-target='navbarMenuHeroA')
          span
          span
          span
      #navbarMenuHeroA.navbar-menu
        .navbar-end
            router-link.navbar-item.router-link-exact-active(to="/login", tag="a",v-show="!$store.state.logged")
              p Login
            router-link.navbar-item.router-link-exact-active(to="/register", tag="a", v-show="!$store.state.logged")
              p Registrarse
            router-link.navbar-item.router-link-exact-active(to="/profile", tag="a", v-show="$store.state.logged")
              p Perfil
            router-link.navbar-item.router-link-exact-active(to="/", tag="a",v-show="$store.state.logged", v-on:click.native="logout")
              p Logout
  section.hero.is-primary.is-small
    // Hero content: will be in the middle
    .hero-body
      .container.has-text-centered
        h1.title
          | NerVans Security
        h2.subtitle
          | Viví tranquilo, nosotros te avisamos si pasa algo
    // Hero footer: will stick at the bottom
    .hero-foot
      nav.tabs.is-centered(v-if="$store.state.logged")
        ul
          li.is-active
            router-link.navbar-item.router-link-exact-active(to="/reports", tag="a")
              | Ultimos Reportes
          li
            router-link.navbar-item.router-link-exact-active(to="/devices", tag="a")
              | Mis Dispositivos
          li
            router-link.navbar-item.router-link-exact-active(to="/zones", tag="a")
              | Administrar Zonas
          li
            router-link.navbar-item.router-link-exact-active(to="/sensors", tag="a")
              | Administrar Sensores

</template>
<script>
  import { mapMutations, mapActions } from 'vuex'
  export default {
    created () {
     setInterval(() => {
       this.updateTime()
     }, 5000)
    },
    methods: {
      ...mapMutations(['updateTime']),
      ...mapActions(['logout'])
    }
  }
</script>
<style lang="scss">

</style>
