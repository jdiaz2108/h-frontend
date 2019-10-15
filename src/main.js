import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import { mapState, mapMutations } from 'vuex';

import VueSweetalert2 from 'vue-sweetalert2';
 
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VueSweetalert2);

import axios from 'axios'
Vue.prototype.$axios = axios

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {

  if (document.title = to.meta.title ? "".concat(to.meta.title, " - Habitemos") : "Encontrar propiedades en venta arriendo o vender casa y apartamentos - Habitemos")

  axios.defaults.baseURL = process.env.VUE_APP_ROOT_API
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  if (to.meta.requiresAuth && store.state.auth == false) {
    if (localStorage.UserData && localStorage.Authorization) {
      next();
    } else {
      next('/login');
    }
  } else if (to.meta.requiresNoAuth && store.state.auth || to.meta.requiresNoAuth && localStorage.Authorization) {
    next('/');
  } else {
      next();
  }
  
})

new Vue({
  router,
  store,
  vuetify,
  data() {
    return {
      apiUrl: process.env.ROOT_API,
      bearer: null,
    }
  },
  created() {
    window.addEventListener('beforeunload', this.leaving);

    if (localStorage.propertyImagess) {
      let propertyImages =  JSON.parse(localStorage.propertyImagess)
      propertyImages.sort(this.compare)
      this.changeImages(propertyImages)
    }

    if (localStorage.property) {
      let property =  JSON.parse(localStorage.property)
      property ? this.propertyUpdate(property) : this.resetProperty();
    }

    if (localStorage.UserData && localStorage.Authorization) {
      this.loadToken(localStorage.Authorization)
      let user =  JSON.parse(localStorage.UserData)
      user ? this.loadUser(user) : this.loadUser(null);
    } else {
     this.login(null)
    }

    if (localStorage.Properties) {
      let properties =  JSON.parse(localStorage.Properties)
      properties ? this.loadProperties(properties) : '';
    }

    localStorage.clear();
  },
  methods: {
    ...mapMutations(['changeImages', 'propertyUpdate', 'resetProperty', 'loadUser', 'loadToken', 'login', 'loadProperties']),
    compare( a, b ) {
      if ( a.sort < b.sort ){
        return -1;
      }
      if ( a.sort > b.sort ){
        return 1;
      }
      return 0;
    },

    leaving() {
      this.properties ? localStorage.Properties = JSON.stringify(this.properties) : '',
      this.user ? localStorage.UserData = JSON.stringify(this.user) : '',
      this.accessToken ? localStorage.Authorization = this.accessToken : '',
      this.propertyImages.length ? localStorage.propertyImagess = JSON.stringify(this.propertyImages) : '',
      localStorage.property = JSON.stringify(this.property);
    },
  },
  computed: {
    ...mapState(['accessToken', 'propertyImages', 'property', 'user', 'properties', 'search', 'buildForTypes', 'properTypes'])
  },
  render: h => h(App)
}).$mount('#app')
