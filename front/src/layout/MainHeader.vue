<template>
<div class="header-wrapper ">
  <nav class="nav-extended blue-grey darken-2">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Dance Space</router-link>
      <ul class="right">
        <li>
          <a @click="toggleModal('test')">TestModal</a>
        </li>
        <li>
          <a v-if="this.$store.getters.isAuthenticated" @click="logout">로그아웃</a>
          <a v-else @click="toggleModal('login')">로그인</a>
        </li>
      </ul>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab"><router-link to="/community">커뮤니티</router-link></li>
        <li class="tab"><router-link to="/practice">연습모임 / 연습실대관</router-link></li>
        <li class="tab disabled"><a href="#test3">Disabled Tab</a></li>
        <li class="tab"><router-link to="/video">영상</router-link></li>
      </ul>
    </div>
  </nav>
  <login-modal v-if="this.$store.getters.getLoginModal"></login-modal>
  <test-modal v-if="this.$store.state.modal.test" ></test-modal>
  <join-modal v-if="this.$store.state.modal.join"></join-modal>

</div>
</template>

<script>
import LoginModal from '../components/LoginModal';
import TestModal from '../components/TestModal';
import JoinModal from '../components/JoinModal';
import { eventBus } from '../main.js';
// import { Auth } from '../api';

export default {
  name: 'MainHeader',
  data() {
    return {
      modal: {
        showModal: false,
        showTestModal: false
      }
    };
  },
  methods: {
    toggleModal(modal) {
      this.$store.commit('toggleModal', modal);
    },
    logout() {
      this.$store.dispatch('LOGOUT').then(() => this.$router.replace('/'));
    }
  },
  created() {
    console.log('header Created!');
  },
  components: {
    LoginModal,
    TestModal,
    JoinModal
  }
};
</script>

<style>
.header-wrapper {
  overflow: hidden;
}
.header-navibar {
  height: 70px;
  background: #000;
  opacity: 0.5;
  color: violet;
}
</style>
