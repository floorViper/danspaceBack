import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '../store'
import { eventBus } from '../main.js'
import FacebookAuth from '../pages/FacebookAuth'
import MainTemplate from '../layout/MainTemplate'

import Home from '../pages/Home'
import Community from '../pages/Community'
import Me from '../pages/Me'

import PracticeTemplate from '../pages/Practice/PracticeTemplate'
import PracticeMeet from '@/pages/Practice/PracticeMeet'
import PracticeRent from '../pages/Practice/PracticeRent'
import PracticeRentRegister from '@/pages/Practice/PracticeRentRegister'
import PracticeRentDetail from '@/pages/Practice/PracticeRentDetail'

// import App from '../App.vue';

Vue.use(VueRouter)

const requireAuth = path => (from, to, next) => {
  if (store.getters.isAuthenticated) return next()
  store.commit('toggleModal', 'login')
  eventBus.$emit('passedPath', path)
  //next('/login?returnPath=me');
}

const routes = [
  {
    path: '/',
    component: MainTemplate,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: '/community',
        component: Community,
      },
      {
        path: '/practice',
        component: PracticeTemplate,
        children: [
          {
            path: 'meet',
            component: PracticeMeet,
          },
          {
            path: 'rent',
            component: PracticeRent,
          },
          {
            path: 'rent/register',
            component: PracticeRentRegister,
          },
          {
            path: 'rent/detail',
            component: PracticeRentDetail,
          },
        ],
      },
    ],
  },
  // {
  //   path: '/community',
  //   component: MainTemplate,
  //   children: [
  //     {
  //       path: '',
  //       component: Community,
  //       beforeEnter: requireAuth('/community')
  //     }
  //   ]
  // },
  {
    path: '/video',
    component: MainTemplate,
    children: [
      {
        path: '',
        component: Me,
        //beforeEnter: requireAuth('/community')
      },
    ],
  },
  {
    path: '/facebookAuth',
    component: FacebookAuth,
    //beforeEnter: requireAuth('/me')
  },
]
export default new VueRouter({
  mode: 'history',
  routes,
})
