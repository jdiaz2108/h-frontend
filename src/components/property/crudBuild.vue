<template>
  <div class="container-fluid auth py-5 bg-dark">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-6">
        <div class="card shadow">
          <form @submit.prevent="formSend" method="POST" class="form-group mb-0">

            <div class="card-header">
              <h2 class="card-header-title my-1">Publicar Predio </h2>
            </div>

            <div class="card-body">
              <div class="row form-group d-flex align-center justify-center">
                <!-- Start BuildFor Zone -->
                <div class="py-2 d-flex col-12 row justify-content-start">
                  <div v-if="errors.errors">
                    holi
                    <v-alert dense outlined type="error" v-for="error in errors.errors" :key="error">
                      holi
                      {{error}}
                  </v-alert>
                  </div>
                  <div class="col-12 col-md-4" :key="buildForType.value+'buildForType'" v-for="buildForType of buildForTypes">
                    <v-radio-group v-model="property.type_id" class="" :disabled="disabled" :validate-on-blur="true" >
                      <v-radio :label="buildForType.label" :value="buildForType.value" color="blue"></v-radio>
                    </v-radio-group>
                  </div>
                    <div class="col-12" v-if="!property.type_id">
                    <v-alert dense outlined type="error">
                      el campo es obligatorio
                    </v-alert>
                  </div>
                </div>
                <!-- End BuildFor Zone -->
                <div class="col-12">
                  <v-divider></v-divider>
                </div>
                <!-- Start Property Type Zone -->
                <div class="py-2 d-flex col-12 row justify-content-start">
                  <div class="col-6 col-md-3" :key="properType.value+'properType'" v-for="properType of properTypes">
                    <v-radio-group v-model="property.typeId" class="" :disabled="disabled">
                      <v-radio :label="properType.label" :value="properType.value" color="blue"></v-radio>
                    </v-radio-group>
                  </div>
                </div>
                <!-- End Property Type Zone -->
                <div class="py-2 d-flex col-10">
                  <v-checkbox v-model="property.rulePH">
                    <template v-slot:label>
                      <div>
                        Regido por el
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <span v-on="on">
                              Régimen de Propiedad Horizontal
                            </span>
                          </template>
                          Opens in new window
                        </v-tooltip>
                      </div>
                    </template>
                  </v-checkbox>
                </div>
                <!-- Start Horizontal Property Rules Zone -->
                <div class="py-2 d-flex col-12 row justify-content-start">
                  <div class="col-6 col-md-3" :key="rulerPH.value+'properType'" v-for="rulerPH of rulersPH">
                    <v-radio-group v-model="property.rulerPH" class="" :disabled="disabled || !property.rulePH">
                      <v-radio :label="rulerPH.label" :value="rulerPH.value" color="blue"></v-radio>
                    </v-radio-group>
                  </div>
                </div>
                <!-- End Horizontal Property Rules Zone -->
                <div class="col-12">
                  <v-divider></v-divider>
                </div>
                <!-- Start Stratum Component -->
                <div class="py-2 d-flex col-12 row">
                  <div class="col-4 col-md-2" :key="stratum.value + 'stratum'" v-for="stratum in stratums">
                    <v-radio-group v-model="property.stratum" class="justify-center" :disabled="disabled">
                      <v-radio :label="stratum.label" :value="stratum.value" color="blue"></v-radio>
                    </v-radio-group>
                  </div>
                </div>
                <!-- End Stratum Component -->
                <div class="col-12">
                  <v-divider></v-divider>
                </div>

                <div class="col-12 row p-0 m-0">

                  <div class="col-6 row m-0 p-2">
                    <div class="py-2 col-4"><label for="priceSale" class="form-control-label">Valor Inmueble:</label>
                    </div>
                    <div class="py-2 col-8">
                       <money v-model="property.priceSale" v-bind="money" maxlength="17" class="form-control" :disabled="disabled || property.type_id == 2 || !property.type_id"></money>
                    </div>

                    <div class="col-4"></div>
                    <div class="col-8">
                      <v-checkbox v-model="property.negotiable" :disabled="disabled || property.type_id == 2">
                        <template v-slot:label>
                          <div>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <span v-on="on">
                                  Negociable
                                </span>
                              </template>
                            </v-tooltip>
                          </div>
                        </template>
                      </v-checkbox>
                    </div>
                  </div>
                  <div class="col-6 m-0 row p-2">

                    <div class="py-2 col-4">
                      <label for="priceRent" class="form-control-label">
                        Valor Arriendo:
                      </label>
                    </div>
                    <div class="py-2 col-8">
                        <money v-model="property.priceRent" v-bind="money" maxlength="15" class="form-control" :disabled="disabled || property.type_id == 1 || !property.type_id"></money>
                    </div>

                    <div class="col-4"></div>
                    <div class="col-8">
                      <v-checkbox v-model="property.adminIncludedV" :disabled="disabled || property.type_id == 1">
                        <template v-slot:label>
                          <!-- <div>
  Valor de
  <v-tooltip bottom>
  <template v-slot:activator="{ on }">
  <span v-on="on">
  Administración
  </span>
  </template>
  Administración
  </v-tooltip>
  incluido en el Arriendo
  </div> -->
                        </template>
                      </v-checkbox>
                    </div>

                    <div class="py-2 col-4">
                      <label for="adminValue" class="form-control-label">
                        Valor Administración:
                      </label>
                    </div>
                    <div class="py-2 col-8">
                        <money v-model="property.adminValue" v-bind="money" maxlength="13" class="form-control" :disabled="disabled || property.type_id == 1 || property.adminIncludedV || !property.type_id"></money>
                    </div>

                  </div>

                </div>

                <div class="col-12">
                  <v-divider></v-divider>
                </div>


                <div class="col-12 row">
                  <div class="col-12 row p-2">
                    <div class="py-2 col-4"><label for="buildArea" class="form-control-label">Ciudad / Municipio:</label>
                    </div>
                    <div class="py-2 col-8">

                      <v-autocomplete v-model="property.city_id" :items="cities" search-input.sync="search" chips clearable
                        hide-details hide-selected item-text="name" item-value="id" label="Selecciona una Ciudad..." solo>

                        <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-title>
                              No hay resultados en su
                              <strong>Busqueda</strong>
                            </v-list-item-title>
                          </v-list-item>
                        </template>

                        <template v-slot:selection="{ item, selected }">
                          <v-list-item-avatar color="blue-grey darken-2" class="headline font-weight-light white--text" size="25">
                            <i class="fa fa-map-marker "></i>
                          </v-list-item-avatar>
                          <span v-text="item.name"></span>
                        </template>

                        <template v-slot:item="{ item }">
                          <v-list-item-avatar color="blue-grey darken-2" class="headline font-weight-light white--text" size="25">
                            <i class="fa fa-map-marker "></i>
                          </v-list-item-avatar>
                            <span v-text="item.name"></span>
                        </template>
                      </v-autocomplete>

                    </div>
                  </div>
                  <div class="col-12 row p-2">
                    <div class="py-2 col-4"><label for="priceSale" class="form-control-label">Dirección:</label>
                    </div>
                    <div class="py-2 col-8">
                      <div class="input-group">
                        <input type="text" class="form-control" id="priceSale" placeholder="Ej: Calle 12 # 18 - 64"
                          @blur="here()" @keyup.enter="here()"
                          :disabled="property.city_id == null"
                          v-model="property.streetAddress" >
                      </div>
                    </div>

                  </div>
                  <div class="col-12 row p-2">
                    <div class="py-2 col-4"><label for="priceSale" class="form-control-label">Barrio:</label>
                    </div>
                    <div class="py-2 col-8">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Ej: Santa Bárbara"
                          v-model="property.neighborhood"
                          :disabled="property.city_id == null">
                      </div>
                    </div>

                  </div>
                  <div class="col-10 mx-auto py-2">
                    <gmap-map :options="{
                      zoomControl: true,
                      mapTypeControl: false,
                      scaleControl: false,
                      streetViewControl: false,
                      rotateControl: false,
                      fullscreenControl: true,
                      disableDefaultUi: false,
                      gestureHandling: 'greedy',
                      styles: styles
                      }" @center_changed="update('reportedCenter', $event)" @bounds_changed="update('bounds', $event)" :center="center"
                      ref="map" :zoom="zoom" style="width:100%;  height: 400px">

                      <gmap-marker icon="https://api.habitemos.com/images/icono1.png" v-if="marker" :draggable="true"
                        @dragend="updateCoordinates" :labelClass="'gmap-marker'" :title="'m.name'"
                        :position="{'lat': property.latitude, 'lng': property.longitude}"></gmap-marker>
                    </gmap-map>
                  </div>
                </div>

                <div class="col-12">
                  <v-divider></v-divider>
                </div>
                <div class="col-12">

                  <file-pond name="test" ref="pond" @processfile="handleFileUpload"
                    label-idle="Suelta las imagenes aquí o <span class='filepond--label-action'>Buscar Imagenes</span>"
                    allow-multiple="true" :server="server" accepted-file-types="image/jpeg, image/png"
                    v-bind:files="myFiles" :instant-upload="true" v-on:init="handleFilePondInit" />

                  <GridJs v-resize="onResize" :center="false" :draggable="true"
                    :sortable="true" ref="gridjs" @sort="sort" :items="items" :cellHeight="cellHeight"
                    :cellWidth="cellWidth" :gridWidth="gridWidth"
                    @dragend="drag" @dragstart="drag">
                    <template slot="cell" slot-scope="props">
                      <!-- <a class="testeo">X</a> -->
                      <div class="icon-delete icon-container" style="cursor: pointer" @mousedown="props.remove()"><i class="fa fa-times" aria-hidden="true"></i></div>
                        <!-- <v-fab-transition>
      <v-btn color="indigo" dark fab absolute top right small @mousedown="props.remove()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-fab-transition> -->
                      <div class="h-100 w-100 p-2">
                        <div class="d-flex rounded shadow" style="background-color: #b2b2b2; height: 100px; height: 100%; cursor: grab;">
                          <img
                            :src="props.item.image"
                            class="img-fluid my-auto mx-auto" :style="'object-fit: contain; pointer-events: none; max-height: calc('+cellHeight+'px - 16px)'" alt="">
                        </div>
                      </div>
                    </template>
                  </GridJs>

                </div>
                <div class="col-12">
                  <v-divider></v-divider>
                </div>
                <!-- Start Build Zone, we have here build Area and Terrain Area -->
                <div class="col-12 row">

                  <div class="col-6 row p-2">
                    <div class="py-2 col-4"><label for="buildArea" class="form-control-label">Area Construida:</label>
                    </div>
                    <div class="py-2 col-8">
                      <div class="input-group">
                        <input type="text" class="form-control" id="buildArea" v-model="property.buildArea">
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2">Mts<sup>2</sup></span>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="col-6 row p-2">
                    <div class="py-2 col-4"><label for="LandArea" class="form-control-label">Area del Terreno:</label>
                    </div>
                    <div class="py-2 col-8">
                      <div class="input-group">
                        <input type="text" class="form-control" id="LandArea" v-model="property.LandArea">
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2">Mts<sup>2</sup></span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <!-- End Build Zone, we have here build Area and Terrain Area -->
                <div class="col-12">
                  <v-divider></v-divider>
                </div>
                <!-- Start Rooms Zone -->
                <div class="col-12 row">
                  <div class="col-6 row p-2">
                    <div class="py-2 col-4"><label for="buildArea" class="form-control-label">No. Habitaciones:</label>
                    </div>
                    <div class="py-2 col-8">

                      <v-select v-model="property.rooms" :items="rooms" item-text="value" :hide-details="true"
                        :height="'29px'" solo flat :style="'border: 1px solid #ced4da;'"></v-select>


                    </div>

                  </div>
                  <div class="col-6 row p-2">
                    <div class="py-2 col-4"><label for="buildArea" class="form-control-label">No. Baños:</label>
                    </div>
                    <div class="py-2 col-8">

                      <v-select v-model="property.bRooms" :items="rooms" item-text="value" :hide-details="true"
                        :height="'29px'" solo flat :style="'border: 1px solid #ced4da;'"></v-select>

                    </div>

                  </div>
                </div>
                <!-- End Rooms Zone -->
                <div class="col-12">
                  <v-divider></v-divider>
                </div>
                <div class="col-12">
                  <button type="button" @click="formSend()" class="btn btn-danger btn-block btn-lg">Crear
                    Cuenta</button>
                </div>

              </div>

            </div>

            <div class="card-footer">
              <div class="p-3"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import money from 'v-money'

  // register directive v-money and component <money>
  Vue.use(money, {precision: 4})

  // Import Vue FilePond
  import vueFilePond from 'vue-filepond'
  import GridJs from './../assets/vue-js-grid/Grid'

  // Import image preview and file type validation plugins
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
  import { mapState, mapMutations } from 'vuex';

  // Create component
  const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
  )

    import {Money} from 'v-money'

    
    export default {
      components: {
    Money,
      FilePond,
      GridJs
    },
    created() {
      this.getCities()
      // localStorage.PropertyImages ? this.items = JSON.parse(localStorage.PropertyImages) : '';
      // localStorage.PropertyImagess ? this.images = localStorage.PropertyImagess.map(a => a.item) : '';
      this.items = this.propertyImages.map(a => a.item)
    },
    mounted() {
      // this.saleRent()
      if (this.property.latitude && this.property.longitude && this.property.streetAddress) {
        
        this.center = {
          lat: this.property.latitude,
          lng: this.property.longitude,
        }
        this.zoom = 16,
        this.marker = true
      }
    },
    data() {
      return {
        money: {
          thousands: '.',
          prefix: '$ ',
          precision: 0,
          masked: false
        },
        res: null,
        images: [],
        prueba: null,
        cellHeight: 200,
        cellWidth: 200,
        msg: null,
        gridWidth: 200,
        myFiles: [],
        server: {
          url: process.env.VUE_APP_ROOT_API + '/H/property-image',
          process: {
            method: 'POST',
            withCredentials: false,
            headers: axios.defaults.headers.common,
            timeout: 7000,
            onload: (response) => this.onLoaded(response),
            onerror: null,
            ondata: null
          }
        },
        citySelected: null,
        cityModel: null,
        mapBounds: {},
        reportedCenter: {
          lat: '',
          lng: ''
        },
        items: [],
        marker: false,
        maker: {},
        markers: [],
        center: {
          lat: 4.7284735308193895,
          lng: -74.04891107444162
        },
        hasSaved: false,
        isEditing: null,
        model: null,
        errors: {},
        styles: [{
          featureType: 'poi',
          stylers: [{
            visibility: 'off'
          }]
        }],
        zoom: 12,
        buildFor: null,
        cities: [],
        disabled: false,
        htmls: {
          labels: {
            'py-2': true,
            'col-3': true,
            'col-md-2': true,
          },
          inputs: {
            'py-2': true,
            'col-9': true,
            'col-md-4': true,
          }
        },
      }
    },
    methods: {
    ...mapMutations(['propertyUpdate']),
      onResize() {
        this.gridWidth = this.$refs.gridjs.windowWidth;
        if (window.innerWidth >= 1260) {
          this.cellWidth = (this.gridWidth * 0.33) - 8
        } else if (window.innerWidth >= 768) {
          this.cellWidth = (this.gridWidth * 0.33) - 8
        } else if (window.innerWidth >= 576) {
          this.cellWidth = (this.gridWidth * 0.5) - 8
        } else {
          this.cellWidth = (this.gridWidth) - 8
        }
        this.cellHeight = this.cellWidth;
      },
      drag(event) {
        if (window.innerWidth <= 768) {
          if (event.event.type == 'touchstart') {
            var myHtml = document.getElementsByTagName('html')[0];
            myHtml.classList.add('overHidden');
          } else if (event.event.type == 'touchend') {
            var myHtml = document.getElementsByTagName('html')[0];
            myHtml.classList.remove('overHidden')
          }
        }
        for (let index = 0; index < event.items.length; index++) {
          const element = event.items[index];
          this.items[element.index].order = element.sort;
        }
      },
      sort(event) {
        //console.log('sort', event.items)
      },
      handleFilePondInit() {
        this.$refs.pond.getFiles();

        // FilePond instance methods are available on `this.$refs.pond`
      },
      handleFileUpload(error, file) {
        if (error) {
          return
        }

        this.$refs.pond.removeFile(file.id);
      },
      updateCoordinates(location) {
        this.property.latitude = location.latLng.lat();
        this.property.longitude = location.latLng.lng()
      },
      onLoaded(response) {
        this.items.push({
          title: 'd',
          image: process.env.VUE_APP_ROOT_RES + response
        })
      },
      here(){
        let app_id = process.env.VUE_APP_HERE_APP_ID;
        let app_code = process.env.VUE_APP_HERE_APP_CODE;
        let city = this.cityModel ? '%2C'+this.cityModel.name : '';
        let street = this.property.streetAddress.split('#').join('No. ').split(' ').join('+')+city+'%2CColombia';
        fetch('https://geocoder.api.here.com/6.2/geocode.json?searchtext='+street+'&app_id='+app_id+'&app_code='+app_code+'&gen=9')
          .then(result => result.json())
          .then(result => {
            this.center = {
              lat: null,
              lng: null
            }
            if (result.Response.View.length > 0 && result.Response.View[0].Result.length > 0) {
              this.res = result.Response.View[0].Result[0];

              this.property.latitude = this.res.Location.DisplayPosition.Latitude,
                this.property.longitude = this.res.Location.DisplayPosition.Longitude,

                this.center = {
                  lat: this.res.Location.DisplayPosition.Latitude,
                  lng: this.res.Location.DisplayPosition.Longitude,
                }

              this.zoom = 16,
                this.marker = true
            }
          }, error => {
              console.error(error);
          });
      },
      getCities() {
        axios
          .get('/cities')
          .then(response => {
            this.cities = response.data, 'cities';
            if (this.property.city_id) {
              this.cityModel = this.cities.find(x => x.id === this.property.city_id);
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      update(field, event) {
        if (field === 'reportedCenter') {
          this.reportedCenter = {
            lat: event.lat(),
            lng: event.lng(),
          };
        } else if (field === 'bounds') {
          // console.log(event);
          this.mapBounds = event;
        } else {
          this.$set(this, field, event);
        }
      },
      validateNumber(param, valor) {
        var number = 0;

        if (param != null) {
          param > 999999999999 ? number = parseInt(param.toString().substr(0, 12)) : number = parseInt(param);
          isNaN(param) ? number = 0 : '';
        }

        if (valor == 'sale') {
          this.property.priceSale = number;
        } else if (valor == 'rent') {
          this.property.priceRent = number;
        }

      },
      formSend() {
        this.errors = {}
        
        let property = this.property
        if (property.type_id == 1) {
          delete property.priceRent
          delete property.adminValue
        } else if (property.type_id == 2) {
          delete property.priceSale
        }
        if (property.adminIncludedV) {
          delete property.adminValue
        }
        this.$axios({
             method: 'post',
             url: '/H/property',
             data: {
               property: this.property,
               images: this.propertyImages
             },
           })
           .then(response => {
             console.log(response)
           })
          .catch(error => {
            this.errors = error.response.data;
            if (this.errors.message == 'The given data was invalid.') {
              this.errors.message = 'Los datos ingresados son inválidos.'
            }
          })

      },
      alertSwal(type, title) {
        // Use sweetalert2
        this.$swal({
          title: title,
          type: type,
          confirmButtonText: 'Aceptar',
          showConfirmButton: false,
          timer: 2000
        });
      },
    },
    computed: {
      ...mapState(['properTypes', 'buildForTypes', 'rulersPH', 'stratums', 'rooms', 'propertyImages', 'property'])
    },
    watch: {
      'property.city_id'() {
        var position = this.cities.findIndex(obj => obj.id == this.property.city_id);
        if (position == 0) {
          this.cityModel = null
        } else {
          this.cityModel = this.cities[position];
          this.center = {
            lat: parseFloat(this.cities[position].latitude),
            lng: parseFloat(this.cities[position].longitude),
          };
            this.zoom = 12
        }
      },
      'property.priceSale'() {
        this.validateNumber(this.property.priceSale, 'sale')
      },
      'property.priceRent'() {
        this.validateNumber(this.property.priceRent, 'rent')
      },
    },
  }
</script>

<style>
.icon-container {
      font-size: 1.2rem;
    color: #fff;
}

.icon-delete {
display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 15px;
    right: 10px;
    top: 10px;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
    background: rgba(0, 0, 0, 0.39);
}

.testeo {
  content: '✖';
  color: #777;
  font-size: 16px;
  position: absolute;
  right: 5px;
  text-decoration: none;
  text-shadow: 0 2px 0 #fff;
  top: 5px;
}

  [type=number] {
  width: 80px !important;
  }

  .v-text-field.v-text-field--solo .v-input__control {
  min-height: 33.5px !important;
  }

  .v-text-field.v-text-field--enclosed {
  border-radius: .25rem;
  }

  .gm-style .gm-style-iw-t:before {
    background-color: #ffffff;
    bottom: 23px;
    content: '';
    display: inline-block;
    height: 14px;
    left: -7px;
    position: absolute;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
    -webkit-transition: 0.3s ease all;
    transition: 0.3s ease all;
    width: 14px;
    z-index: 1;
  }

  .gm-style .gm-style-iw-c {
    top: -30px;
    cursor: pointer;
  }

  .gm-style .gm-style-iw-t:after {
    background: rgba(0, 0, 0, 0);
    box-shadow: none;
    content: "";
    height: 0;
    left: 0;
    position: absolute;
    top: 0;
    transform: initial;
    width: 0;
  }

  @media (min-width: 1600px) {
    .filepond--item {
      width: calc(25% - .5em);
    }
  }

  @media (min-width: 768px) {
    .filepond--item {
      width: calc(50% - .5em);
    }
  }

  @media (min-width: 1260px) {
    .filepond--item {
      width: calc(33.33% - .5em);
    }
  }
</style>
