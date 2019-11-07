<template>
  <div class="h-100">
    <router-view name="page" />
    <v-layout row justify-center>
        <router-view name="rule" />
    </v-layout>
          <div class="container-fluid back-index h-100" v-if="(this.$route.path == '/')">
        <div class="row h-100">
          <div class="col-12 my-auto">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-10">
                  <div class="card p-5">

                <div class="col-12 row p-2">
									<div class="py-2 col-12 col-md-4"><label for="buildArea" class="form-control-label">Municipio, ciudad ó barrio:</label></div>
									<div class="py-2 col-12 col-md-8 text-left">
                    <gmap-autocomplete class="form-control" placeholder="Bogotá" @place_changed="setPlace"  :options="{componentRestrictions: {country: 'co'}}"></gmap-autocomplete>
									</div>
								</div>

                    								<!-- Start BuildFor Zone -->
								<div class="col-12 row p-2">
									<div class="py-2 col-12 col-md-4"><label for="buildArea" class="form-control-label">Tipo de oferta:</label></div>
									<div class="py-2 col-12 col-md-8 text-left">
										<v-select dense v-model="search.offer_id" hide-details multiple label="Todas" item-value="label" :items="buildForTypesSearch" item-text="label" solo></v-select>
									</div>
								</div>
								<!-- Start Property Type Zone -->
								<div class="col-12 row p-2">
									<div class="py-2 col-12 col-md-4"><label for="buildArea" class="form-control-label">Tipo de propiedad:</label></div>
									<div class="py-2 col-12 col-md-8 text-left">
										<v-select dense v-model="search.type_id" hide-details multiple label="Todas" item-value="label" :items="properTypes" item-text="label" solo></v-select>
									</div>
								</div>
                <div class="col-12 pt-2 justify-content-center row">
  <div class="col-6 p-0 m-0">

                <button @click="searching" class="btn btn-lg btn-danger mt-5 btn-block">Buscar</button>
</div>
                </div>
                  </div>
              </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {
      description: 'Singapore',
      latLng: {},
      var: {country: "us"}
    };
  },
  // created() {
  //   this.search.offer_id = this.buildForTypes.map(x => x.label)
  //   this.search.type_id = this.properTypes.map(x => x.label)
  // },
  mounted() {
    
  },
  methods: {
    ...mapMutations(['changeCenter']),
    searching(){
      this.$router.push({
        path: '/mapa'
      });
    },
          setDescription(description) {
        this.description = description;
      },
      setPlace(place) {

        if (!place) return

        let latlong = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          search: true
        };
      this.changeCenter(latlong)
      }
  },
      computed: {
      ...mapState(['properTypes', 'buildForTypesSearch', 'search'])
    },
};
</script>

<style>

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid rgb(206, 212, 218);
}

.back-index{
    background-image: url(https://api.habitemos.com/images/image-3.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    z-index: 0;
}

.pac-container:after {
    /* Disclaimer: not needed to show 'powered by Google' if also a Google Map is shown */

    background-image: none !important;
    height: 0px;
}
</style>
