import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import { mapState, mapMutations } from 'vuex';

// main.js
import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VueSweetalert2);

import axios from 'axios'
Vue.prototype.$axios = axios

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  axios.defaults.baseURL = process.env.VUE_APP_ROOT_API
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  if (localStorage.Authorization) {
    let authorization = localStorage.Authorization
    localStorage.removeItem('Authorization')
   await store.dispatch('getUser', {
      accessToken: authorization
    }).then(data => {
      data
    })
  } else {
    //
  }
if (to.meta.requiresAuth && store.state.auth == false) {
  next('/');
} else {
  if (to.name == 'login' && store.state.user || to.name == 'register' && store.state.user) {
    next('/');
  } else {
    if(to.meta.validateOwnProperty) {
      axios.defaults.headers.common['Authorization'] = store.state.accessToken
      axios
      .get('/verify/property/'+to.params.slug)
      .then(response => {
        next();
      })
      .catch(error => {
        next('/')
      })
    } else {
      next();
    }
  }
}
// ...
})

new Vue({
  router,
  store,
  vuetify,
  data() {
    return {
      user: null,
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
      property ? this.propertyUpdate(property) : '';
    }
    localStorage.clear();
  },
  beforeCreate() {
    //
  },
  methods: {
    ...mapMutations(['changeImages', 'propertyUpdate']),
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
      this.accessToken ? localStorage.Authorization = this.accessToken : '';
      this.propertyImages.length ? localStorage.propertyImagess = JSON.stringify(this.propertyImages) : '';
      localStorage.property = JSON.stringify(this.build);
    },
  },
  computed: {
    ...mapState(['accessToken', 'propertyImages', 'build'])
  },
  render: h => h(App)
}).$mount('#app')
