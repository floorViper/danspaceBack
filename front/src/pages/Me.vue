<template>
  <!-- <main-template> -->
    <div class="contents-wrapper">
      <div>
        <div v-if="conversation.hidden">hidden</div>
        <div v-if="!conversation.hidden">not hidden</div>
        <button @click="conversation.hidden = false">Click This!</button>
      </div>
    </div>
  <!-- </main-template> -->
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      conversation: { hidden: false }
    };
  },
  created() {
    setTimeout(() => {
      this.conversation.hidden = true;
      console.log('timeout');
      console.log(this.conversation);
    }, 1000);
  },
  computed: {
    status() {
      return this.conversion.hidden;
    }
  }
};
</script>

<style>
</style>
