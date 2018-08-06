<template>
  <div class="contents-wrapper">
    <div class='board-wrapper'>
        <div class="card-panel blue-grey lighten-1">
          <span class="white-text">비보이
          </span>
        </div>
        <div class="card-panel blue-grey lighten-1">
          <span class="white-text">팝핀
          </span>
        </div>
        <div class="card-panel blue-grey lighten-1">
          <span class="white-text">하우스
          </span>
        </div>
        <div class="card-panel blue-grey lighten-1">
          <span class="white-text">락킹
          </span>
        </div>
    </div>
  </div>
</template>

<script>
//import MainTemplate from '../layout/MainTemplate';
export default {
  components: {
    //MainTemplate
  },
  created() {
    console.log('commRender:', Date.now());
  }
};
</script>

<style>
</style>
