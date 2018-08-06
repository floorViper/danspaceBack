import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const resourceHost = 'http://localhost:3000';

const enhanceAccessToeken = () => {
  const { accessToken } = localStorage;
  if (!accessToken) return;
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};
enhanceAccessToeken();

export const store = new Vuex.Store({
  state: {
    accessToken: null,
    modal: {
      login: false,
      test: false,
      join: false
    }
  },
  getters: {
    getLoginModal(state) {
      return state.modal.login;
    },
    getTestModal(state) {
      return state.modal.test;
    },
    isAuthenticated(state) {
      state.accessToken = state.accessToken || localStorage.accessToken;
      return state.accessToken;
    }
  },
  mutations: {
    LOGIN(state, { accessToken }) {
      console.log(accessToken);
      state.accessToken = accessToken;
      localStorage.accessToken = accessToken;
    },
    LOGOUT(state) {
      console.log('logout');
      state.accessToken = null;
      delete localStorage.accessToken;
    },
    toggleModal(state, payload) {
      console.log('toggle');
      state.modal[payload] = !state.modal[payload];
      //console.log('close');
      // console.log(this.$route); <=null
    }
  },
  actions: {
    JOIN({ commit }, param) {
      console.log('param:', param);
      return axios.post(`/api/auth/create`, param).then(({ data }) => data);
    },
    LOGIN({ commit }, { email, password }) {
      return axios
        .post(`/api/auth/login`, { email, password })
        .then(({ data }) => {
          // axios의 정보 포함한 응답객체 그러므로 풀어서data추출
          console.log('actionsthen:', data);
          commit('LOGIN', data);
          axios.defaults.headers.common['Authorization'] = `Bearer ${
            data.accessToken
          }`;
        });
    },
    LOGOUT({ commit }) {
      axios.defaults.headers.common['Authorization'] = undefined;
      commit('LOGOUT');
    }
  }
});
