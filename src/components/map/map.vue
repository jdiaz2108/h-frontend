<template>
  <div class="container-fluid p-0">
    <div class="row" style="overflow: scroll;">
      <div class="col-7 p-0">
        <gmap-map :options="{
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: true,
                    disableDefaultUi: false,
                    gestureHandling: 'greedy',
                    styles: styles}"
          @dragend="print('dragend')"
          @center_changed="update('reportedCenter', $event)"
          @bounds_changed="update('bounds', $event)"
          :center="center"
          ref="map"
          :zoom="14"
          :style="$vuetify.breakpoint.smAndDown ? 'width:100%; height: calc(100vh - 56px)' : ' width:100%; height: calc(100vh - 64px)'">

          <gmap-marker icon="https://api.habitemos.com/images/icono1.png" 
              @mouseover="createInfoWindow(m)"
              @mouseout="delInfoWindow(m.id)"
              :key="index + '-marker'" 
              v-for="(m, index) in markers" 
              :labelClass="'gmap-marker'" 
              :title="m.name" 
              :clickable="true" 
              :position="m.position"
              @click="gotoProperty(m.id)"></gmap-marker>

          <gmap-info-window :options="{maxWidth: 220}" :position="maker.position" :opened="maker.window">
            <div @mouseover="createInfoWindow(maker)" @mouseout="delInfoWindow(maker), print()" class="row m-0"
              @click="gotoProperty(maker.id)">
              <div class="col-3 m-0 p-0">
                <img class="img-fluid mb-2" style="height: 40px; width: 40px" :src="maker.image">
              </div>
              <div class="col-9 m-0 p-1">
                <div>
                  <span>{{ maker.name }}</span>
                </div>
                <div>
                  <span>{{maker.priceSale | currency('$', 0, { thousandsSeparator: '.', spaceBetweenAmountAndSymbol: true }) }}</span>
                </div>
              </div>
            </div>
          </gmap-info-window>

        </gmap-map>
      </div>
      <div class="col-5 p-0"
       :style="$vuetify.breakpoint.smAndDown ? 'overflow-y: auto; max-height: calc(100vh - 56px)' : ' overflow-y: auto; max-height: calc(100vh - 64px)'">
        <div class="row m-0">

          <div class="col-12 col-lg-6 p-2" @mouseover="createInfoWindow(m)" @mouseout="delInfoWindow(m)"
            :key="index + '-card'" v-for="(m, index) in markers" @click="gotoProperty(m.id)">
            <div class="card m-2 shadow h-100" style="cursor: pointer">
              <img class="card-img-top" :src="m.image">
              <div class="card-body ">
                <h5 class="card-title">{{m.name}}</h5>
                <h5 class="card-title">
                  {{m.priceSale | currency('$', 0, { thousandsSeparator: '.', spaceBetweenAmountAndSymbol: true }) }}
                </h5>
                <p class="card-text">{{m.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Map',
    data() {
      return {
        styles: [{
          featureType: 'poi',
          stylers: [{
            visibility: 'off'
          }]
        }],
        showModalStatus: true,
        timeout: '',
        selector1: null,
        mapBounds: {},
        lightbox: false,
        dialog: false,
        showBuildObj: {},
        center: {
          lat: 4.7284735308193895,
          lng: -74.04891107444162
        },
        position: {
          position: null
        },
        reportedCenter: {
          lat: '',
          lng: ''
        },
        maker: {},
        markers: [],
        lightBoxData: {
          showImage: null,
        }
      }
    },
    created() {
      this.geolocate();
      var myHtml = document.getElementsByTagName('html')[0];
      myHtml.classList.add('overHidden');
    },
    mounted() {
      this.getBuilds();
    },
    beforeDestroy() {
      var myHtml = document.getElementsByTagName('html')[0];
      myHtml.classList.remove('overHidden');
    },
    methods: {
      gotoProperty(id) {
        this.$router.push({ path: '/H/mapa/'+id })
      },
      delInfoWindow: function (marker) {
        this.timeout = setTimeout(() => {
          this.maker.window = false;
        }, 400);
      },
      createInfoWindow: function (marker) {
        this.maker = marker;
        this.maker.window = true;
        clearTimeout(this.timeout);
        //if different marker set infowindow to open and reset current marker index

      },
      update(field, event) {
        if (field === 'reportedCenter') {
          // console.log(event);

          // N.B. It is dangerous to update this.center
          // Because the center reported by Google Maps is not exactly
          // the same as the center you pass it.
          // Instead we update this.center only when the input field is changed.
          this.reportedCenter = {
            lat: event.lat(),
            lng: event.lng(),
          };
          // If you wish to test the problem out for yourself, uncomment the following
          // and see how your browser begins to hang:
          // this.center = _.clone(this.reportedCenter)
        } else if (field === 'bounds') {
          // console.log(event);
          this.mapBounds = event;
        } else {
          this.$set(this, field, event);
        }
      },
      print(e) {
        console.log('se ejecuta');
        if (this.lightbox) {
          console.log('hola');
          console.log(e.key);
        }
      },
      getBuilds: function () {
        axios
          .get('/builds')
          .then(response => {

            this.markers = [];
            for (let x = 0; x < response.data.length; x++) {

              let obj = response.data[x];
              this.markers.push({
                id: obj.id,
                image: obj.image,
                name: obj.name,
                date: obj.created_at,
                priceSale: obj.priceSale,
                window: false,
                totalArea: obj.totalArea,
                description: obj.description,
                position: {
                  lat: parseFloat(obj.latitude),
                  lng: parseFloat(obj.longitude)
                }
              })

            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      geolocate: function () {
        navigator.geolocation.getCurrentPosition(this.showPosition, console.log('false'), {
          enableHighAccuracy: true,
          maximumAge: 0,
        });
      },
      showPosition: function (position) {
        console.log('dragstap'); // when enter will start the same function that mouse drag stap
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.position.position = this.center;
      },
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


.no-shadow {
  -webkit-box-shadow: none;
  box-shadow: none;
}

  .fullHeightModal {
    min-height: 100vh;
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


    /* .poi-info-window div, .poi-info-window a {
        color: #000000 !important;
    }
    .gm-style .gm-style-iw-c {
        bottom: 0;
        top: 2rem;
        position: relative;
        overflow: initial;
        padding: 5px 0.5rem;
    }
    .gm-style .gm-style-iw-t::after {
        box-shadow: 0 2px 7px 1px rgba(0,0,0,0.3);
        height: 13px;
        width: 13px;
        top: 35%;
        z-index: -1;
    }
    .ctn-data-maps {
        align-items: center;
        color: #000000;
        display: flex;
        font-size: 15px;
        justify-content: space-between;
        line-height: 25px;
    }
    .ctn-data-maps span:last-child {
        font-size: 13px;
        font-weight: 500;
        text-transform: capitalize;
    }
    .gm-ui-hover-effect {
        background-color: #ffffff !important;
        right: -1.25rem !important;
        left: initial !important;
        bottom: 0 !important;
        top: -20px !important;
        border-radius: 50% 50% 50% 0%;
        width: 25px !important;
        height: 25px !important;
        box-shadow: 0 0 2px #000000;
        display: flex !important;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        opacity: 0.7;
    }
    .f-1,
    .f-2 {
        position: relative;
    }
    .f-1:before {
        background-color: #51e451;
    }
    .f-2:before {
        background-color: #ea4335;
    }
    .f-1:before,
    .f-2:before {
        content: '';
        position: absolute;
        top: 90%;
        left: 0;
        width: 100%;
        height: 2px;
        border-radius: 50%;
    } */

</style>
