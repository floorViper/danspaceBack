<template>
  <base-modal v-bind:passedIdentity="identity">
    <h5 slot="header">회원가입</h5>
    <div slot="body">
      <form @submit.prevent="joinSubmit">
        <label for="email">이메일입력:</label>
          <input type="text" id="email" name="email" v-model="join.email" placeholder="E-mail">
        <br>
        <label for="password">비밀번호입력:</label>
          <input type="password" id="password" name="password" v-model="join.password" placeholder="password">
        <br>
        <label for="password2">비밀번호확인:</label>
          <input type="password" id="password2" name="password2" v-model="join.password2" placeholder="password">
        <label for="nickName">닉네임입력</label>
          <input type="text" id="nickName" name="nickName" v-model="join.nickName" placeholder="댄서닉네임이나 별명">
      
        <div>
          <span>관심 장르(복수선택 가능)</span><br>
          <p class="genre">
            <input type="checkbox" id="bboy" name="genre" value="bboy" @change="checkBoxChange"/>
            <label for="bboy">bboy</label>
          </p>
          <p class="genre">
            <input type="checkbox" id="popin" name="genre" value="popin" @change="checkBoxChange"/>
            <label for="popin">popin</label>
          </p>
          <p class="genre">
            <input type="checkbox" id="kpop" name="genre" value="kpop" @change="checkBoxChange"/>
            <label for="kpop">kpop</label>
          </p>
          <p class="genre">
            <input type="checkbox" id="house" name="genre" value="house" @change="checkBoxChange"/>
            <label for="house">house</label>
          </p>
        </div>
        <div>
          <span class="pd">주요 목적</span><br>
          <p class="purpose">
            <input type="checkbox" id="커뮤니티" name="purpose" value="커뮤니티" @change="checkBoxChange"/>
            <label for="커뮤니티">커뮤니티</label>
          </p>
          <p class="purpose">
            <input type="checkbox" id="연습실대관" name="purpose" value="연습실대관" @change="checkBoxChange"/>
            <label for="연습실대관">연습실대관</label>
          </p>
          <p class="purpose">
            <input type="checkbox" id="연습모임" name="purpose" value="모임" @change="checkBoxChange"/>
            <label for="연습모임">연습모임</label>
          </p>
          <p class="purpose">
            <input type="checkbox" id="워크샵수강" name="purpose" value="워크샵수강" @change="checkBoxChange"/>
            <label for="워크샵수강">워크샵(수강)</label>
          </p>
          <p class="purpose">
            <input type="checkbox" id="워크샵강사" name="purpose" value="워크샵강사" @change="checkBoxChange"/>
            <label for="워크샵강사">워크샵(강사)</label>
          </p>
        </div>
        
      </form>
    </div>
    <div slot="footer" class="login-footer">
      <a class="waves-effect waves-light btn" @click="joinSubmit">가입</a>
      <!-- 비밀번호가 기억이 안난다면? <span class="password-find">비밀번호 찾기</span> -->
      <!-- <a class="closeModalBtn waves-effect waves-light btn" @click="close">닫기</a> -->
    </div>
  </base-modal>
</template>

<script>
import BaseModal from './BaseModal'
import EmailIcon from 'vue-material-design-icons/email.vue'
import { Auth } from '../api' //test
//import { eventBus } from '../main.js';
export default {
  name: 'LoginModal',
  data() {
    return {
      identity: 'join',
      join: {
        email: '',
        password: '',
        password2: '',
        nickName: '',
        genre: [],
        purpose: [],
      },
      error: false,
    }
  },
  computed: {},
  methods: {
    checkBoxChange(e) {
      const name = e.target.name
      const value = e.target.value
      const dataTarget = this.join[name]

      if (dataTarget.indexOf(value) == -1) {
        dataTarget.push(value)
      } else {
        dataTarget.splice(dataTarget.indexOf(value), 1)
      }
      console.log(dataTarget)
    },
    joinSubmit() {
      //this.join.genre = this.join.genre.join(',');
      this.$store
        .dispatch('JOIN', this.join)
        .then(data => {
          console.log('JoinModalThen:', data)
          // this.$store.commit;
          if (data.user.email == this.join.email) {
            alert('회원가입이 완료되었습니다. 로그인해주세요')
            this.$store.commit('toggleModal', this.identity)
            this.$store.commit('toggleModal', 'login')
            //console.log(this.$router, this.$route);
            // this.$router.push(
            //   this.$route.query.redirect || this.$route.query.path
            // );
          }
        })
        .catch(data => console.dir(data.response))
    },
    close() {
      this.$store.commit('toggleModal', this.identity)
    },
  },
  created() {
    // eventBus.$on('passedPath', path => {
    //   this.$route.query.redirect = path;
    // });
  },
  components: {
    BaseModal,
    EmailIcon,
  },
}
</script>

<style scoped>
.login-footer {
  border-top: 1px solid #e6e6e6;
  padding-top: 15px;
  text-align: center;
}
.login-btn {
  width: 100%;
  margin-bottom: 0.5rem;
}
.join-us,
.password-find {
  border-bottom: 1px solid black;
  margin-left: 10px;
}
input[type='password'],
input[type='text'] {
  width: 70%;
}

label {
  display: inline-block;
  width: 20%;
}
[type='checkbox'] + label {
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.genre,
.purpose {
  display: inline-block;
}
.purpose {
  /* width: 70%; */
}
label[for='커뮤니티'],
label[for='연습모임'],
label[for='연습실대관'],
label[for='연습모임'],
label[for='워크샵수강'],
label[for='워크샵강사'] {
  width: 100%;
  font-size: 0.9rem;
}
.password-find {
}
.closeModalBtn {
}
</style>
