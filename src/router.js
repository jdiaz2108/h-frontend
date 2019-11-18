import Vue from 'vue'
import Router from 'vue-router'

const showMap = () => import(/* webpackChunkName: "map" */ './components/map/map.vue')
const mapeishion = () => import(/* webpackChunkName: "layout" */ './components/map/layout.vue')

const showModal = () => import(/* webpackChunkName: "showModal" */ './components/property/showModal.vue')
const login = () => import(/* webpackChunkName: "login" */ './components/auth/login.vue')
const register = () => import(/* webpackChunkName: "register" */ './components/auth/register.vue')
const profile = () => import(/* webpackChunkName: "profile" */ './components/user/profile.vue')
const crudBuild = () => import(/* webpackChunkName: "crudBuild" */ './components/property/crudBuild.vue')

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
        title: 'Buscar predios ',
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
            extend:true,
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
        title: 'Iniciar sesión',
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
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
