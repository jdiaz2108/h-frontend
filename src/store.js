import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  
  state: {
    skeleton: true,
    markers: [],
    mapBounds: {},
    center: {
		  lat: 4.7284735308193895,
      lng: -74.04891107444162,
      search: false
		},
    drawner: false,
    root: '2091-Bahama-Dr-Miramar-FL-33023',
    plan: null,
    accessToken: null,
    count: 0,
    user: null,
    auth: false,
    properties: [],
    property: {},
    propertyImages: [],
    search: {
      offer_id: [],
      type_id: [],
      price: {
        from: null,
        to: null
      },
      area: {
        from: null,
        to: null
      },
      bathrooms: null,
      bedrooms: null,
      stratum: null
    },
    yearBuild: [
      {value: 1, label: '1 a 10 años'},
      {value: 2, label: '10 a 20 años'},
      {value: 3, label: '20 a 30 años'},
      {value: 4, label: '30 a 50 años'},
      {value: 5, label: 'más de 50 años'},
    ],
    properTypes: [
      {value: 1, label: "Apartamento"},
      {value: 2, label: "Casa"},
      {value: 3, label: "Oficina"},
      {value: 4, label: "Consultorio"},
      {value: 5, label: "Local"},
      {value: 6, label: "Bodega"},
      {value: 7, label: "Lote/Casalote"},
      {value: 8, label: "Finca"}
    ],
    buildForTypesSearch: [
      {value: 1, label: "Vender"},
      {value: 2, label: "Arrendar"}
    ],
    buildForTypes: [
      {value: 1, label: "Vender"},
      {value: 2, label: "Arrendar"},
      {value: 3, label: "Vender o Arrendar"}
    ],
    rulersPH: [
      {value: 1, label: "Edificio" },
      {value: 2, label: "Bifamiliar"},
      {value: 3, label: "Conjunto"},
      {value: 4, label: "Condominio"},
    ],
    stratums: [
      {value: 1, label: '1'},
      {value: 2, label: '2'},
      {value: 3, label: '3'},
      {value: 4, label: '4'},
      {value: 5, label: '5'},
      {value: 6, label: '6'},
      {value: 7, label: 'Campestre'},
    ],
    rooms: [
      {value: 0},
      {value: 1},
      {value: 2},
      {value: 3},
      {value: 4},
      {value: 5},
      {value: 6},
      {value: 7},
      {value: 8},
      {value: 9},
      {value: 10},
    ],
  },
  mutations: {
    changeCenter(state, latlng){
      state.center = latlng
    },
    selectPlan(state, plan){
      state.plan = plan
    },
    changeDawner(state){
      state.drawner = !state.drawner
    },
    changeImages(state, items) {
      state.propertyImages = items
    },
    increment(state) {
      state.count++
    },
    noAuth(state) {
      state.auth = false
    },
    loadUser(state, user) {
      if (user == null) {
        state.user = null
      } else {
        state.user = user,
        state.auth = true
      }
    },
    loadProperties(state, properties) {
      state.properties = properties
    },
    login(state, data) {
      if (data == null) {
        state.accessToken = null,
        state.auth = false,
        state.user = null,
        state.properties = []
      } else {
        state.properties = data.properties,
        state.user = data.user,
        state.auth = true,
        state.accessToken = 'Bearer ' + data.access_token,
        axios.defaults.headers.common['Authorization'] = state.accessToken
      }
    },
    loadToken(state, accessToken) {
      state.accessToken = accessToken,
      axios.defaults.headers.common['Authorization'] = state.accessToken
    },
    propertyUpdate(state, property) {
      state.property = property;
    },
    resetProperty(state) {
      state.property = {
        name: null,
        image: null,
        highlight: 0,
        sale: 0,
        priceSale: 0,
        rent: 0,
        priceRent: 0,
        negotiable: false,
        streetAddress: null,
        stratum: null,
        yearBuilt: null,
        typeId: null,
        latitude: null,
        longitude: null,
        buildArea: null,
        LandArea: null,
        totalArea: null,
        description: '',
        country_id: null,
        state_id: null,
        city_id: null,
        bathrooms: 1,
        bedrooms: 1,
        rulePH: false,
        rulerPH: null,
        adminValue: 0,
        adminIncludedV: false,
        neighborhood: null
      }
    },
    getProperties(state, property) {
      state.skeleton = true,
      axios
				.get('/property', {
					params: {
						type: state.search,
						bounds: state.mapBounds
					},
				})
				.then(response => {
          state.markers = [];
					if (response.data.length) {
            state.markers = response.data
            
					} else {
            //
          }
				})
				.catch(error => {
          state.markers = [];
					console.log(error)
        })
        .finally(() => (state.skeleton = false));
    },
  },
  actions: {
    logOutUser({
      commit, state
    }) {
      axios.get('/auth/logout')
      commit('noAuth')
      commit('loadToken', null)
      commit('resetProperty')
    },
    getUser: async function ({ commit }, props) {
      axios.defaults.headers.common['Authorization'] = props.accessToken
      await axios
        .get('/auth/user')
        .then(response => {
          let data = response.data;
          commit('loadUser', data)
          commit('loadToken', props.accessToken)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
