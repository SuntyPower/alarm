<template lang="pug">

section.hero.is-small.is-primary.is-bold
    // Hero header: will stick at the top
    .hero-head
      nav.navbar
        .navbar-brand
          a.navbar-item
              img(src='@/assets/logo.png', alt='Logo')
              p NerVans Security
          .navbar-burger(@click='showNav = !showNav', :class="{ 'is-active': showNav }")
            span
            span
            span
        #navbarMenuHeroA.navbar-menu(:class="{ 'is-active': showNav }")
          .navbar-end
              router-link.navbar-item.router-link-exact-active(to="/login", tag="a",v-show="!$store.state.logged")
                p Login
              router-link.navbar-item.router-link-exact-active(to="/register", tag="a", v-show="!$store.state.logged")
                p Registrarse
              router-link.navbar-item.router-link-exact-active(to="/profile", tag="a", v-show="$store.state.logged")
                p Perfil
              router-link.navbar-item.router-link-exact-desactive(to="/index", tag="a",v-show="$store.state.logged", v-on:click.native="logout")
                p Logout
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
    data () {
      return {
        showNav: false
      }
    },
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
.navbar-item {
  color:#4a4a4a;
}
</style>
