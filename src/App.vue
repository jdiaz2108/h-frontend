<template>
    <v-app>
    <hheaders></hheaders>
    <!-- <transition name="fade"  mode="out-in">
      <keep-alive>
    <router-view :key="$route.fullPath"/>
      </keep-alive>
    </transition> -->

    <router-view/>
    </v-app>
</template>

<script>
import Vue from 'vue'
import hheaders from './components/layouts/headers'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAPS_KEY,
    libraries: 'places, geocoder, geometry' // necessary for places input
  }
});

export default {
  name: 'App',
  components: {
    hheaders,
  },
  data: () => ({
    id: 100
  }),
};
</script>

<style>
html {
  overflow-y: auto !important;
}

.overHidden {
  overflow: hidden !important;
}

.lg-backdrop.in {
    opacity: 0.9 !Important;
}

.btn-green {
    color: #fff;
    background-color: #B4D13D;
    border-color: #B4D13D;
}

.btn-green:hover {
    color: #fff;
    background-color: #90b303;
    border-color: #90b303;
}

.btn-green:focus {
    box-shadow: 0 0 0 0.2rem rgba(180, 209, 61, 0.5)
}

.button-close-float {
    margin: -15px;
    align-self: flex-end;
    background-color: #B4D13D !important;
    border-color: #B4D13D !important;
}

a:link.link-no-hover {
  text-decoration: none;
  color: #000 !important;
}

a:hover.link-no-hover {
  text-decoration: none;
}


.auth:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent url(//assets3.explorimmo.com/assets/explo/img-rwd/visuel-inscription.jpg) no-repeat 0 14%/cover fixed;
    opacity: .2;
}
.auth {
    position: relative;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>