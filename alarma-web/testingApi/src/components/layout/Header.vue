<template lang="pug">
  section.hero.is-primary.is-small
    // Hero head: will stick at the top
    .hero-head
      nav.navbar
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
                a.navbar-item.is-active
                  router-link(to="/")
                    | Home
                a.navbar-item
                  router-link(to="/register")
                    | Registrarse
                a.navbar-item
                  router-link(to="/nosotros")

                .navbar-item.has-dropdown
                  a.navbar-link
                    | PERFIL
                  .navbar-dropdown
                    a.navbar-item
                      | Overview
                    a.navbar-item
                      | Elements
                    a.navbar-item
                      | Components

    // Hero content: will be in the middle
    .hero-body
      .container.has-text-centered
        h1.title
          | NerVans Security
        h2.subtitle
          | Viví tranquilo, nosotros te avisamos si pasa algo
    // Hero footer: will stick at the bottom
    .hero-foot
      nav.tabs
        .container
          ul
            li.is-active
              router-link(to="/")
                  a Ultimos Reportes
            li
              a Mis Dispositivos
            li
              a Administrar Zonas
            li
              a Administrar Sensores


</template>
<script>
export default {
  data () {
    return {
      active: false
    }
  }

}
</script>
