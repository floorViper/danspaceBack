<template>
  <base-modal v-bind:passedIdentity="identity">
    <h5 slot="header">로그인</h5>
    <div slot="body">
      <form @submit.prevent="login(email,password)" name="dd">
        <input type="text" name="e" v-model="email" placeholder="E-mail">
        <input type="password" name="pas" v-model="password" placeholder="password">
          <button class="btn waves-effect waves-light login-btn" type="submit" name="action"><email-icon/> Email로 로그인
          </button>\
          <a class="waves-effect waves-light btn indigo darken-4 login-btn" href="localhost:3000/auth/facebook" @click="authenticated('facebook')">
            <font-awesome-icon :icon="['fab','facebook']"/> 페이스북으로 로그인</a>
      </form>
    </div>
    <div slot="footer" class="login-footer">
      아직 회원가입을 안했다면? <span class="join" @click="join">회원가입</span><br>
      비밀번호가 기억이 안난다면? <span class="password-find">비밀번호 찾기</span>
      <!-- <a class="closeModalBtn waves-effect waves-light btn" @click="close">닫기</a> -->
    </div>
  </base-modal>
</template>

<script>
import BaseModal from './BaseModal'
import EmailIcon from 'vue-material-design-icons/email.vue'
import { Auth } from '../api' //test
import { eventBus } from '../main.js'
export default {
  name: 'LoginModal',
  data() {
    return {
      identity: 'login',
      email: '',
      password: '',
      msg: '',
      error: false,
    }
  },
  methods: {
    join() {
      this.$store.commit('toggleModal', this.identity)
      this.$store.commit('toggleModal', 'join')
    },
    function() {},
    login(email, password) {
      this.$store
        .dispatch('LOGIN', { email, password })
        .then(() => {
          console.log(this.$router, this.$route)
          this.$store.commit('toggleModal', this.identity)
          //로그인완료후 가려던 페이지로 redirect
          this.$router.push(this.$route.query.redirect || this.$route.path)
        })
        .catch(data => {
          //this.msg = message;
          console.dir(data)
        })
    },
    close() {
      this.$store.commit('toggleModal', this.identity)
    },
    authenticated(provider) {
      var self = this
      console.log(self)
      window.authenticateCallback = function(accessToken) {
        console.log('callback')
        console.log(accessToken)
        self.$store.commit('LOGIN', { accessToken })
        self.close()
        //console.log(this, self);
      }
      var spec = 'left=40, top=100, width=500, height=500'
      window.open(`/api/auth/${provider}`, '', spec)
    },
  },
  created() {
    //라우트쿼리에 진입하려는 라우트경로 담기
    eventBus.$on('passedPath', path => {
      this.$route.query.redirect = path
    })
  },
  components: {
    BaseModal,
    EmailIcon,
  },
}
</script>

<style>
.login-footer {
  border-top: 1px solid #e6e6e6;
  padding-top: 15px;
  text-align: center;
}
.login-btn {
  width: 100%;
  margin-bottom: 0.5rem;
}
.join,
.password-find {
  border-bottom: 1px solid black;
  margin-left: 10px;
}
.password-find {
}
.closeModalBtn {
}
</style>
