<template>
  <div class="container-fluid p-0">
	<div class="row m-0" 
	>
	  <div class="col-7 p-0" :class="!$vuetify.breakpoint.smAndDown ? 'col-7' : 'col-12' ">
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
			@dragend="print('dragend', $event)"
			@center_changed="update('reportedCenter', $event)"
			@bounds_changed="updateBounds($event)"
			@zoom_changed="print('zoom', $event)"
			:center="center"
			ref="map"
			:zoom="14"
			:style="$vuetify.breakpoint.smAndDown ? 'width:100%; height: calc(100vh - 322px)' : ' width:100%; height: calc(100vh - 64px)'">

			<gmap-marker :icon="m.priceSale ? 'https://api.habitemos.com/images/icono1.png' : 'https://api.habitemos.com/images/icono2.png'" 
				@mouseover="createInfoWindow(m)"
				@mouseout="delInfoWindow(m.id)"
				:key="index + '-marker'" 
				v-for="(m, index) in markers" 
				:labelClass="'gmap-marker'" 
				:title="m.name" 
				:clickable="true" 
				:position="m.position"
				@click="gotoProperty(m.slug)"></gmap-marker>

			<gmap-info-window :options="{maxWidth: 220}" :position="maker.position" :opened="maker.window">
				<div @mouseover="createInfoWindow(maker)" @mouseout="delInfoWindow(maker)" class="row m-0" @click="gotoProperty(maker.slug)">
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
	<div v-if="!$vuetify.breakpoint.smAndDown" class="col-5 p-0" :style="$vuetify.breakpoint.smAndDown ? 'overflow-y: auto; max-height: calc(100vh - 56px)' : ' overflow-y: auto; max-height: calc(100vh - 64px)'">
		<div class="row m-0" v-if="skeleton">
			<div v-for="m in 6" :key="m" class="col-12 col-lg-6 p-2">
				<v-skeleton-loader ref="skeleton" type="image, article" class="m-2"></v-skeleton-loader>
			</div>
		</div>
		<div class="row m-0">
			<div class="col-12 col-lg-6 p-2" @mouseover="createInfoWindow(m)" @mouseout="delInfoWindow(m)" :key="index + '-card'" v-for="(m, index) in markers" @click="gotoProperty(m.slug)">
				<div class="card m-2 shadow h-100" style="cursor: pointer">
					<v-img :src="m.image" class="grey lighten-2" lazy-src="https://api.habitemos.com/images/gray.png" max-width="500" max-height="300"></v-img>
					<div class="row m-0">
						<div class="col-8 p-3 pb-0">
							<h5 class="card-title mb-1 font-weight-bold">
								{{(m.priceSale ? m.priceSale : m.priceRent)  | currency('$', 0, { thousandsSeparator: '.', spaceBetweenAmountAndSymbol: true }) }} 
								<span :class="(m.priceSale ? 'text-for-sale' : 'text-for-rent')">{{(m.priceSale ? 'VENTA' : 'ARRIENDO')}}</span>
							</h5>
							<h5 class="card-title mb-1 text-address text-truncate">
								{{m.streetAddress}}
							</h5>
							<ul class="list-inline pl-0 mb-1 d-flex justify-content-between w-75 text-address">
								<li class="list-inline-item"><span class="text-body">{{m.bedrooms}} </span><i class="fa fa-bed" aria-hidden="true"></i></li>
								<li class="list-inline-item"><span class="text-body">{{m.bathrooms}} </span><i class="fa fa-shower" aria-hidden="true"></i></li>
								<li class="list-inline-item"><span class="text-body">1 </span><i class="fa fa-car" aria-hidden="true"></i></li>
							</ul>
							<p class="card-text"><span class="text-body">{{m.buildArea}} </span><i class="fa fa-square-o" aria-hidden="true"></i> Mts<sup>2</sup></p>
						</div>
						<div class="col-4 px-1 py-4 bg-fo">
							<p class="text-center text-type text-truncate font-weight-bold">{{m.propertyType}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-12 p-0" v-else >

    <v-sheet class="mx-auto">
      <v-slide-group v-model="model" center-active>
        <v-slide-item v-slot:default="{ active, toggle }" :key="index + '-test'"  v-for="(m, index) in markers">

		  <div class="card m-2 shadow" style="cursor: pointer; max-width: 170px;" @click="gotoProperty(m.slug)">
					<v-img :src="m.image" class="grey lighten-2" lazy-src="https://api.habitemos.com/images/gray.png" max-width="500" max-height="300"></v-img>
					<div class="row m-0">
						<div class="col-8 p-3 pb-0">
							<h5 class="card-title mb-1 font-weight-bold">
								{{(m.priceSale ? m.priceSale : m.priceRent)  | currency('$', 0, { thousandsSeparator: '.', spaceBetweenAmountAndSymbol: true }) }} 
								<span :class="(m.priceSale ? 'text-for-sale' : 'text-for-rent')">{{(m.priceSale ? 'VENTA' : 'ARRIENDO')}}</span>
							</h5>
							<h5 class="card-title mb-1 text-address text-truncate">
								{{m.streetAddress}}
							</h5>
							<ul class="list-inline pl-0 mb-1 d-flex justify-content-between w-75 text-address">
								<li class="list-inline-item"><span class="text-body">{{m.bedrooms}} </span><i class="fa fa-bed" aria-hidden="true"></i></li>
								<li class="list-inline-item"><span class="text-body">{{m.bathrooms}} </span><i class="fa fa-shower" aria-hidden="true"></i></li>
								<li class="list-inline-item"><span class="text-body">1 </span><i class="fa fa-car" aria-hidden="true"></i></li>
							</ul>
							<p class="card-text"><span class="text-body">{{m.buildArea}} </span><i class="fa fa-square-o" aria-hidden="true"></i> Mts<sup>2</sup></p>
						</div>
						<div class="col-4 px-1 py-4 bg-fo">
							<p class="text-center text-type text-truncate font-weight-bold">{{m.propertyType}}</p>
						</div>
					</div>
				</div>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
	</div>
	</div>
  </div>
</template>

<script>
import store from '../../store'
	import { mapState, mapMutations } from 'vuex'
	import axios from 'axios'
	export default {
		metaInfo: {
			title: 'Encontrar predios para venta o arriendo',
			titleTemplate: '%s - Habitemos',
			htmlAttrs: {
				lang: 'en',
				amp: true
			}
		},
		name: 'Map',
		data() {
			return {
				styles: [
					{
						"featureType": "poi",
						"elementType": "labels.text",
						"stylers": [{"visibility": "off"}]
					},
					{
						"featureType": "poi.business",
						"stylers": [{"visibility": "off"}]
					},
					{
						"featureType": "road",
						"elementType": "labels.icon",
						"stylers": [{"visibility": "off"}]
					},
					{
						"featureType": "transit",
						"stylers": [{"visibility": "off"}]
					}
				],
				showModalStatus: true,
				timeout: '',
				selector1: null,
				// mapBounds: {},
				lightbox: false,
				dialog: false,
				position: {
					position: null
				},
				reportedCenter: {
					lat: '',
					lng: ''
				},
				maker: {},
				lightBoxData: {
					showImage: null,
				},
				model: null
			}
		},
		created() {
			var myHtml = document.getElementsByTagName('html')[0];
			myHtml.classList.add('overHidden');

			if (!this.center.search) {
				this.geolocate();
			}

			store.state.mapBounds = {}
		},
		mounted() {
         
		//
		},
		beforeDestroy() {
			var myHtml = document.getElementsByTagName('html')[0];
			myHtml.classList.remove('overHidden');
		},
		methods: {
			...mapMutations(['changeCenter', 'getProperties']),
			gotoProperty(slug) {
				this.$router.push({ path: '/mapa/'+slug })
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
			updateBounds(event) {
				if (Object.keys(this.mapBounds).length == 0 && event) {
					store.state.mapBounds = event;
					this.getProperties()
				}

				if (event) {
					store.state.mapBounds = event;
				}
			},
			update(field, event) {
				if (field === 'reportedCenter') {

						this.reportedCenter = {
							lat: event.lat(),
							lng: event.lng(),
						};

				} else if (field === 'bounds') {

				console.log("TCL: update -> event", event)

					if (Object.keys(this.mapBounds).length == 0 && event) {
						store.state.mapBounds = event;
						this.getProperties()
					}

					if (event) {
						store.state.mapBounds = event;
					}

				} else {
					console.log(event)
					// this.$set(this, field, event);
				}
			},
			print(event) {
                console.log("TCL: print -> event2", event)
				this.getProperties()
			},
			geolocate: function () {
				navigator.geolocation.getCurrentPosition(this.showPosition, console.log('false'), {
					enableHighAccuracy: true,
					maximumAge: 0,
				});
			},
			showPosition: function (position) {
			//	console.log('dragstap'); // when enter will start the same function that mouse drag stap
				let latlong = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				this.changeCenter(latlong)
			},
		},
		computed: {
			...mapState(['properTypes', 'buildForTypes', 'search', 'center', 'mapBounds', 'markers', 'skeleton'])
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.bg-fo{
  background-color: #f0f0f0!important;
}

.text-for-sale{
  font-size: 13px;
  color: #B4D13D;
}

.text-for-rent{
  font-size: 13px;
  color: #00ADEF;
}

.text-address{
	font-size: 17px;
	color: #999999;
}

.prize-font{
	font-size: 24px;
}

.text-type{
	font-size: 15px;
}

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

</style>
