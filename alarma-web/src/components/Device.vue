<template lang="pug">
  .columns
    .column.is-one-quarter(v-for="d in devices")
      devices-card(
        :firstName = "user.firstName",
        :lastName = "user.lastName",
        :email = "user.email",
        :_id = "d._id",
        :state = "d.state",
        :reports = "d.reports"
        )
</template>

<script>
import devicesCard from '@/components/cards/Device.vue'
export default {
  components: {
    devicesCard
  },
  data () {
    return {
    }
  },

  computed: {
    devices () {
      return this.$store.state.devices
    },
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
