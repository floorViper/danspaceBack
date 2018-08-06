<template>
  <base-modal  v-bind:passedIdentity="identity">
    <h3 slot="header">test</h3>
    <div slot="body"> 바뒤</div>
    <span slot="footer">
      <button>d</button>
    </span>
  </base-modal>
</template>

<script>
import BaseModal from './BaseModal'
export default {
  data() {
    return {
      identity: 'test',
    }
  },
  components: {
    BaseModal,
  },
}
</script>

<style>
</style>
