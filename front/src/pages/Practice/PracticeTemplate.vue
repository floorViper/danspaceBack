<template>
  <div class="contents-wrapper">
    <div class="card practice-wrapper"> 
      <div class="card-tabs">
        <ul class="tabs tabs-fixed-width">
          <li class="tab"><router-link to="/practice/meet">연습모임</router-link></li>
          <li class="tab"><router-link to="/practice/rent">연습실대관</router-link></li>
        </ul>
      </div>
      <router-view></router-view>
      <!-- <component :is="currentViewType"></component> -->
    </div>
  </div>
</template>

<script>
import PracticeMeet from './PracticeMeet';
import PracticeRent from './PracticeRent';
export default {
  components: {
    PracticeMeet,
    PracticeRent
  },
  data() {
    return {
      currentViewType: 'practiceMeet'
    };
  },
  methods: {
    changeType(type) {
      this.currentViewType = type;
    }
  },
  created() {
    console.log('MeetSpace!!!');
  }
};
</script>
<style>
.practice-wrapper {
  /* min-height: calc(100vh - 500px); */
}
</style>
