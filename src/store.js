import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  
  state: {
    accessToken: null,
    count: 0,
    user: null,
    auth: false,
    property: [],
    build: {
      name: null,
      image: null,
      highlight: 0,
      sale: 0,
      priceSale: null,
      rent: 0,
      priceRent: null,
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
      bRooms: 1,
      rooms: 1,
      rulePH: false,
      rulerPH: null,
      adminValue: null,
      adminIncludedV: false,
      neighborhood: null
    },
    propertyImages: [],
    properTypes: [{
        value: 1,
        label: "Apartamento"
      },
      {
        value: 2,
        label: "Casa"
      },
      {
        value: 3,
        label: "Oficina"
      },
      {
        value: 4,
        label: "Consultorio"
      },
      {
        value: 5,
        label: "Local"
      },
      {
        value: 6,
        label: "Bodega"
      },
      {
        value: 7,
        label: "Lote/Casalote"
      },
      {
        value: 8,
        label: "Finca"
      }
    ],
    buildForTypes: [{
      value: 1,
      label: "Vender"
    },
    {
      value: 2,
      label: "Arrendar"
    },
    {
      value: 3,
      label: "Vender o Arrendar"
    }
  ],
  rulersPH: [{
      value: 1,
      label: "Edificio"
    },
    {
      value: 2,
      label: "Bifamiliar"
    },
    {
      value: 3,
      label: "Conjunto"
    },
    {
      value: 4,
      label: "Condominio"
    },
  ],
  stratums: [{
      value: 1,
      label: '1'
    },
    {
      value: 2,
      label: '2'
    },
    {
      value: 3,
      label: '3'
    },
    {
      value: 4,
      label: '4'
    },
    {
      value: 5,
      label: '5'
    },
    {
      value: 6,
      label: '6'
    }
  ],
  rooms: [{
      value: 0
    },
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    },
    {
      value: 4
    },
    {
      value: 5
    },
    {
      value: 6
    },
    {
      value: 7
    },
    {
      value: 8
    },
    {
      value: 9
    },
    {
      value: 10
    },
  ],
  },
  mutations: {
    changeImages(state, items) {
      // state.propertyImages = items.map(a => a.item);
      state.propertyImages = items
    },
    increment(state) {
      state.count++
    },
    loadUser(state, data) {
      state.user = data.user;
      state.property = data.property;
      if (data.user == null) {
        state.auth = false
      } else {
        state.auth = true
      }
    },
    loadToken(state, accessToken) {
      state.accessToken = accessToken
    },
    propertyUpdate(state, property) {
      state.build = property;
    }
  },
  actions: {
    logOutUser({
      commit
    }) {
      axios.get('/auth/logout')
      commit('loadUser', null)
      commit('loadToken', null)
    },
    getUser: async function ({
      commit
    }, props) {
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
