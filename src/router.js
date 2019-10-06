import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import showMap from './components/map/map.vue'

import mapeishion from '@/components/map/layout'

import showModal from '@/components/property/showModal'
import login from '@/components/auth/login'
import register from '@/components/auth/register'
import profile from '@/components/user/profile'
import crudBuild from '@/components/property/crudBuild'

import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: mapeishion,
      meta: {
        title: 'Home Page - Example App',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      },
      children: [
        {
          path: 'mapa',
          name: 'mapahj',
          components: {
            page: showMap
          },
          meta: {
            showModal: false
          }
        },
        {
          path: 'mapa/:id',
          components: {
            page: showMap,
            rule: showModal
          },
          meta: {
            showModal: true,
            title: 'map Page - Example og:id'+store.state.root,
            metaTags: [
              {
                name: 'description',
                content: 'The home page of our example app.'
              },
              {
                property: 'og:description',
                content: 'The home page of our example app.'
              }
            ]
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        requiresNoAuth: true,
        status: 'login',
        title: 'Login Page - Example App',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        status: 'register',
        requiresNoAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: {requiresAuth: true}
    },
    {
      path: '/publicar-predio',
      name: 'property',
      component: crudBuild,
      meta: {
        title: 'Publica tu predio',
        requiresAuth: true,
      }
    },
    {
      path: '/response',
      component: () => import(/* webpackChunkName: "payuResponse" */ './components/user/payuResponse'),
      meta: {requiresAuth: true},
    },
    {
      path: '*',
      name: 'all',
      component: showMap
    },
    {
      path: '/map',
      name: 'map',
      component: showMap
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
