<template>
  <div class="card-content grey lighten-4">
    <div class="rent-header">
      <router-link to="/practice/rent/register" class="waves-light btn rent-register"><i class="material-icons right">add</i>대관등록</router-link>
    </div>
    <div class="rent-item">
      <div class="rent-item-wrapper">
        <div class="card">
          <div class="card-image">
            <img src="../../assets/logo.png">
            <span class="card-title">Card Title</span>
            <router-link to="/practice/rent/detail"><a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a></router-link>
          </div>
          <div class="card-content">
            <p>서울 강서구</p>
            <p>20평 스테레오스피커 마루바닥</p>
            <p>수용인원 20명</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
}
</script>
<style>
.rent-header {
  text-align: right;
}
.rent-item {
  display: inline-block;
  width: 200px;
}
.rent-register btn {
  display: inline-block;
}
</style>
