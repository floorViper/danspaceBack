<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MainTemplate from './layout/MainTemplate'
export default {
  methods: {
    // modyfied() {
    //   this.$store.commit('editMessage');
    // }
    ...mapMutations({
      modyfied: 'editMessage',
    }),
  },
  computed: {
    ...mapGetters({
      message: 'getMessage',
    }),
  },
  components: {
    // MainTemplate
  },
}
</script>

<style>
html,
body {
  height: 100%;
}
/* #app {
  height: 100%;
} */
</style>
