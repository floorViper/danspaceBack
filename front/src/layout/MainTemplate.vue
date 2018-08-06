<template>
<div class="template-wrapper">
  <MainHeader></MainHeader>
  <!-- <slot> -->
    <router-view></router-view>
  <!-- </slot> -->
  <!-- <router-view></router-view> -->
  <MainFooter></mainfooter>
</div>
</template>

<script>
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
export default {
  name: 'app',
  components: {
    MainHeader: MainHeader,
    MainFooter: MainFooter,
  },
  beforeCreate() {
    console.log('main beforeCreate')
  },
  created() {
    console.log('main Create')
    console.log('templateRender:', Date.now())
  },
  beforeMount() {
    console.log('main beforeMount')
  },
  mounted() {
    console.log('main mounted')
  },
  beforeUpdate() {
    console.log('main beforeUpdated')
  },
  updated() {
    console.log('main updated')
  },
  beforeDestroy() {
    console.log('main beforeDestroy')
  },
  destroyed() {
    console.log('main destroyed')
  },
}
</script>

<style>
.template-wrapper {
  /* position: relative; */
  height: 100%;
}
.contents-wrapper {
  min-height: calc(100% - (112px + 181.3px));
  background-color: #e3f2fd;
  text-align: center;
  padding: 0.1rem 0.7rem;
}
</style>
