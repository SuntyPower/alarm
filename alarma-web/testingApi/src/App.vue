<template lang="pug">
  #app
    alarm-header
    router-view
    alarm-footer
</template>

<script>
import alarmHeader from '@/components/layout/Header.vue'
import alarmFooter from '@/components/layout/Footer.vue'

export default {
  name: 'app',

  components: {
    alarmFooter,
    alarmHeader
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';

</style>
