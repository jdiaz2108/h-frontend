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
                  <div class="col-12 col-md-4" :key="buildForType.value+'buildForType'"
                    v-for="buildForType of buildForTypes">
                    <v-radio-group v-model="property.type_id" class="" :disabled="disabled">
                      <v-radio :label="buildForType.label" :value="buildForType.value" color="blue"></v-radio>
                    </v-radio-group>
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
                      <input type="text" id="priceSale" placeholder="0" v-model="property.priceSale" class="form-control"
                        :disabled="disabled || property.type_id == 2">
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
                      <input type="text" id="priceRent" v-model="property.priceRent" placeholder="0" class="form-control"
                        :disabled="disabled || property.type_id == 1">
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
                      <input type="text" id="adminValue" v-model="property.adminValue" placeholder="0" class="form-control"
                        :disabled="disabled || property.type_id == 1 || property.adminIncludedV">
                    </div>

                  </div>

                </div>

                <div class="col-12">
                  <v-divider></v-divider>
                </div>


                <div class="col-12 row">
                  <div class="col-12 row p-2">
                    <div class="py-2 col-4"><label for="buildArea" class="form-control-label">Municipio:</label>
                    </div>
                    <div class="py-2 col-8">
                      <v-autocomplete v-model="citySelected" :items="cities" search-input.sync="search" chips clearable
                        hide-details hide-selected item-text="name" item-value="id" label="Selecciona una Ciudad..."
                        solo>
                        <template v-slot:no-data>
                          <v-list-tile>
                            <v-list-tile-title>
                              No hay resultados en su
                              <strong>Busqueda</strong>
                            </v-list-tile-title>
                          </v-list-tile>
                        </template>
                        <template v-slot:selection="{ item, selected }">

                          <v-icon left>mdi-coin</v-icon>
                          <span v-text="item.name"></span>

                        </template>
                        <template v-slot:item="{ item }">
                          <v-list-tile-avatar color="blue" class="headline font-weight-light white--text" size="30">
                            <i class="fa fa-map-marker "></i>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-text="item.name"></v-list-tile-title>
                          </v-list-tile-content>
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
                          @blur="geocoder()" v-model="property.streetAddress">
                      </div>
                    </div>

                  </div>
                  <div class="col-12 row p-2">
                    <div class="py-2 col-4"><label for="priceSale" class="form-control-label">Barrio:</label>
                    </div>
                    <div class="py-2 col-8">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Ej: Santa Bárbara"
                          v-model="property.neighborhood">
                      </div>
                    </div>

                  </div>
                  <div class="col-4 py-2">
                    <h1> mapa</h1>
                  </div>
                  <div class="col-8 py-2">
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
                      <gmap-info-window v-if="marker" :options="{maxWidth: 220}"
                        :position="{'lat': property.latitude, 'lng': property.longitude}" :opened="marker">
                        <div class="row m-0">
                          <div class="col-3 m-0 p-0">
                            <img class="img-fluid mb-2" style="height: 40px; width: 40px"
                              src="https://api.habitemos.com/images/icono1.png">
                          </div>
                          <div class="col-9 m-0 p-1">
                            <div>
                              <span>{{ 'maker.name' }}</span>
                            </div>
                            <div>
                              <span>{{property.priceSale | currency('$', 0, { thousandsSeparator: '.', spaceBetweenAmountAndSymbol: true }) }}</span>
                            </div>
                          </div>
                        </div>
                      </gmap-info-window>
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

                    <button type="button" @click="here()" class="btn btn-danger btn-block btn-lg">Here</button>
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
  import Inputmask from "inputmask"


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

  export default {
    components: {
      FilePond,
      GridJs
    },
    created() {
      this.getCities()
      // localStorage.PropertyImages ? this.items = JSON.parse(localStorage.PropertyImages) : '';
      // localStorage.PropertyImagess ? this.images = localStorage.PropertyImagess.map(a => a.item) : '';
      this.items = this.propertyImages.map(a => a.item)
    },
    directives: {
      //   mask: {
      //   bind: function (el, binding) {
      //     var maskOpts = binding.value;
      //     maskOpts ? maskOpts.autoUnmask = true : '';
      //     maskOpts ? maskOpts.showMaskOnHover = false : '';
      //     maskOpts ? maskOpts.clearIncomplete = true : '';
      //     Inputmask(maskOpts).mask(el);
      //     console.log(Inputmask);
      //     console.log(maskOpts);
      //     console.log(el);
      //   },
      //   unbind: function(el) {
      //     Inputmask.remove(el);
      //   }
      // }
    },
    mounted() {
      console.log(window.innerWidth)
      // this.saleRent()
    },
    data() {
      return {
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
        items: [{
            title: 'a',
            order: 1,
            image: 'https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          },
          {
            title: 'b',
            order: 2,
            image: 'https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          },
          {
            title: 'c',
            order: 3,
            image: 'https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          }
        ],
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
        errors: [],
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
          console.log(event.event.type)
          if (event.event.type == 'touchstart') {
            var myHtml = document.getElementsByTagName('html')[0];
            myHtml.classList.add('overHidden');
          } else if (event.event.type == 'touchend') {
            var myHtml = document.getElementsByTagName('html')[0];
            myHtml.classList.remove('overHidden');
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
        console.log(file)
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
        console.log(response)
        this.items.push({
          title: 'd',
          image: process.env.VUE_APP_ROOT_RES + response
        })
        console.log(this.$refs.pond.getFiles())
      },
      here(){
        fetch('https://geocoder.api.here.com/6.2/geocode.json?jsoncallback=json&searchtext=calle+19a+no+82-65%2CBogot%C3%A1+%2CColombia&app_id=GDDudqiIEicDd5LA6t2y&app_code=DMiiCyaz3CXgJY_Le4OFSw&gen=9')
         .then(response => response.text())
  .then(data => data.substring(5))
  .then(slice => slice.slice(0, -1))
  .then(myJson => 
  //console.log(myJson)
     console.log(JSON.parse(myJson))
  );
    
        // let fr = 'https://geocoder.api.here.com/6.2/geocode.json';
        // let h = 'https://geocoder.api.here.com/6.2/geocode.json?&searchtext=425+W+Randolph+Chicago&gen=8&_=1568767683165';
        // axios
        //   .get(fr, {
        //     params: {
        //     searchtext: 'calle 19 a no 82 - 65 Bogotá Colombia',
        //           app_id: 'OvsDtWYFSpGXQ2xPij0v',
        //           app_code: 'ycOe7bb06V-jcxlid38NwQ',
        //         }
        //   })
        //   .then(response => {
        //   console.log("TCL: here -> response", response)
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })
      },
      geocoder() {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
          componentRestrictions: { country: 'CO' },
          'address': this.property.streetAddress
        }, (results, status) => {
          
        console.log("TCL: geocoder -> status", status)
        console.log("TCL: geocoder -> results", results)
          
          if (status === 'OK') {
            this.center = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }
            this.property.latitude = results[0].geometry.location.lat(),
              this.property.longitude = results[0].geometry.location.lng()
            this.zoom = 16;
            this.marker = true;
          }
        });
      },
      getCities() {
        axios
          .get('/cities')
          .then(response => {
            this.cities = response.data, 'cities';
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
        var number = null;

        if (param != null) {
          param.length > 14 ? number = parseInt(param.substr(0, 14)) : number = parseInt(param);
          isNaN(param) ? number = null : '';
        }

        if (valor == 'sale') {
          this.property.priceSale = number;
        } else if (valor == 'rent') {
          this.property.priceRent = number;
        }

      },
      formSend() {
        console.log(this.property)
        this.$axios({
             method: 'post',
             url: '/H/property',
             data: {
               property: this.property,
               images: this.images
             },
           })
           .then(response => {
             console.log(response)
              // this.alertSwal('success', 'Se ha generado una nueva factura');
              // this.$router.push({
              //   path: '/facturas/' + response.data.message
              // });
           })
           .catch(function (err) {
             console.log(err)
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
      // build: {
      //   handler(val) {
      //     this.propertyUpdate(val)
      //     console.log(val)
      //   },
      //   deep: true
      // },
      citySelected() {
        this.property.city_id = this.citySelected;
        var position = this.cities.findIndex(obj => obj.id == this.citySelected);
        if (position == 0) {
          this.cityModel = null
        } else {
          this.cityModel = this.cities[position];
          this.center = {
            lat: parseFloat(this.cities[position].latitude),
            lng: parseFloat(this.cities[position].longitude),
          };
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
