import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Map from './components/index.vue'
import index from './components/index.vue'

import mapeishion from '@/components/map/layout'

import showModal from '@/components/builds/showModal'
import login from '@/components/auth/login'
import register from '@/components/auth/register'
import profile from '@/components/user/profile'
import crudBuild from '@/components/builds/crudBuild'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/H',
      name: 'map',
      component: mapeishion,
      children: [
        {
          path: 'mapa',
          name: 'mapahj',
          components: {
            page: index
          },
          meta: {
            showModal: false
          }
        },
        {
          path: 'mapa/:id',
          components: {
            page: index,
            rule: showModal
          },
          meta: {
            showModal: true
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {status: 'login'}
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {status: 'register'}
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: {requiresAuth: true}
    },
    {
      path: '/build',
      name: 'build',
      component: crudBuild,
      meta: {requiresAuth: true}
    },
    {
      path: '/plans',
      name: 'plans',
      component: () => import(/* webpackChunkName: "plans" */ './components/plans/plans'),
      meta: {requiresAuth: true}
    },
    {
      path: '/plans/:slug',
      component: () => import(/* webpackChunkName: "plans" */ './components/plans/plans'),
      meta: {requiresAuth: true, validateOwnProperty: true},
    },
    {
      path: '/response',
      component: () => import(/* webpackChunkName: "payuResponse" */ './components/user/payuResponse'),
      meta: {requiresAuth: true},
    },
    {
      path: '*',
      name: 'all',
      component: index
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
