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

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

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
      next();
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
      property ? this.propertyUpdate(property) : this.resetProperty();
    }
    localStorage.clear();
  },
  beforeCreate() {
    //
  },
  methods: {
    ...mapMutations(['changeImages', 'propertyUpdate', 'resetProperty']),
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
      localStorage.property = JSON.stringify(this.property);
    },
  },
  computed: {
    ...mapState(['accessToken', 'propertyImages', 'property'])
  },
  render: h => h(App)
}).$mount('#app')
