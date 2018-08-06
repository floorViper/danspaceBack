/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
// import Vuex from 'vuex'
import router from './config/router'
import { store } from './store/index.js'

import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

import 'vue-material-design-icons/styles.css'
import 'fullcalendar/dist/fullcalendar.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import FullCalendar from 'vue-full-calendar'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.min.css'

library.add(faFacebook)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker)
Vue.config.productionTip = false
Vue.use(FullCalendar)
// Event Bus
export const eventBus = new Vue()

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}) //.$mount('#app');
