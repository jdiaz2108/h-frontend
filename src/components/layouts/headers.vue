<template>
    <header style="z-index: 100" class="sticky-top">
        <v-toolbar color="white" class="stinky" style="z-index: 110">
            <v-app-bar-nav-icon @click="changeDawner" class="nav-icon" v-if="$vuetify.breakpoint.mdAndDown"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <div class="header__logo" style="height: 60px; line-height: 60px;">
                <img @click="goIndex" src="https://api.habitemos.com/images/LOGO-HABITEMOS-HORIZONTAL.png" class="img-fluid" style="vertical-align: webkit-baseline-middle !Important;" alt="">
            </div>
            <v-spacer></v-spacer>
            <nav class="consult-nav">
                <ul class="consult-menu">
                    <li>
                        <router-link class="router-links" to="/">Inicio</router-link>
                    </li>
                    <li>
                        <router-link class="router-links" to="/mapa">Ver Mapa</router-link>
                    </li>
                    <li>
                        <router-link class="router-links" to="/mapa">Comprar</router-link>
                    </li>
                    <li class="menu-item-has-children"><a href="project.html">ARRENDAR</a>
                        <ul class="sub-menu">
                            <li>
                                <a href="project-detail.html">Project detail</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <router-link class="router-links" to="/publicar-predio">PUBLICAR INMUEBLE</router-link>
                    </li>
                    <li>
                        <router-link class="router-links" to="/profile">
                            <i class="fa fa-user-circle-o pr-2" :style=" auth ? 'color: #B4D13D' : 'color: #848688'"></i>MI CUENTA
                        </router-link>
                        <ul class="sub-menu" v-if="auth">
                            <li>
                                <router-link class="router-links" to="/profile">Mi Perfil</router-link>
                            </li>
                            <li>
                                <a @click="logout($root)"><i class="fa fa-power-off pr-2 text-danger"></i>Cerrar Sesión</a>
                            </li>
                        </ul>
                        <ul class="sub-menu" v-else>
                            <li>
                                <router-link class="router-links" to="/login">Iniciar Sesión</router-link>
                            </li>
                            <li>
                                <router-link class="router-links" to="/register">Registrarse</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <v-spacer></v-spacer>
        </v-toolbar>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-10 p-0">
                    <v-toolbar dark class=" h-filter mx-auto" dense :collapse="collapse" flat v-if="$route.meta.extend">
                        <v-btn icon @click="collapse = !collapse">
                            <v-icon>mdi-export-variant</v-icon>
                        </v-btn>
                        <v-toolbar-title>FILTRO</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp && !collapse">
                            <v-select @blur="getProperties" class="my-auto" light dense v-model="search.offer_id" hide-details multiple label="Tipo de oferta" item-value="label" :items="buildForTypesSearch" item-text="label" solo></v-select>
                        </v-toolbar-items>
                        <v-spacer></v-spacer>
                        <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp && !collapse">
                            <v-select :offset-y="offsetY" @blur="getProperties" class="my-auto" light dense v-model="search.type_id" hide-details multiple label="Clase de predio" item-value="label" :items="properTypes" item-text="label" solo></v-select>
                        </v-toolbar-items>
                        <v-spacer></v-spacer>
                        <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp && !collapse">
                            <gmap-autocomplete class="form-control my-auto" placeholder="Bogotá" @place_changed="setPlace"  :options="{componentRestrictions: {country: 'co'}}"></gmap-autocomplete>
                        </v-toolbar-items>
                        <v-spacer></v-spacer>
                        <template v-if="$vuetify.breakpoint.smAndUp && !collapse">
                            <v-menu v-model="value" :close-on-click="closeOnClick" :close-on-content-click="false" :offset-y="offsetY">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark v-on="on">Precios</v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <div class="row">
                                        <div class="col">
                                            <input type="text" class="form-control" v-model="search.price.from" @blur="getProperties" placeholder="Desde">
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control" v-model="search.price.to" @blur="getProperties" placeholder="Hasta">
                                        </div>
                                    </div>
                                </v-list-item>
                                <v-list-item @click="value = false">
                                    <v-list-item-title>Confirmar</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            </v-menu>
                            <v-spacer></v-spacer>
                        </template>
                        <v-spacer></v-spacer>
                        <template v-if="$vuetify.breakpoint.smAndUp && !collapse">
                            <v-menu v-model="extra" :close-on-click="closeOnClick" :close-on-content-click="false" :offset-y="offsetY">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark v-on="on">Más filtros</v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <form>
                                      <div class="form-group row mb-0">
                                            <label class="col-6 col-form-label my-auto">Número de cuartos:</label>
                                            <div class="col-6">
                                                <v-select v-model="search.bedrooms" label="Seleccionar" hide-details :items="rooms" @blur="getProperties" item-text="value" solo></v-select>
                                            </div>
                                      </div>
                                      <div class="form-group row mb-0">
                                            <label class="col-6 col-form-label my-auto">Número de baños:</label>
                                            <div class="col-6">
                                                <v-select v-model="search.bathrooms" label="Seleccionar" hide-details :items="rooms" @blur="getProperties" item-text="value" solo></v-select>
                                            </div>
                                        </div>
                                    </form>
                                </v-list-item>
                                <v-list-item @click="extra = false">
                                    <v-list-item-title>Confirmar</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            </v-menu>
                            <v-spacer></v-spacer>
                        </template>
                        <v-btn icon>
                            <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                    </v-toolbar>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import store from '../../store'
import {mapState, mapActions, mapMutations} from 'vuex'
import axios from 'axios'
export default {
    data() {
        return {
            collapse: false,
            value: false,
            closeOnClick: true,
            closeOnContentClick: true,
            offsetY: true,
            extra: false
        }
    },
  computed: {
    ...mapState(['auth', 'search', 'properTypes', 'buildForTypesSearch', 'rooms'])
  },
  methods: {
    ...mapMutations(['loadUser', 'changeDawner', 'changeCenter', 'getProperties']),
    ...mapActions(['logOutUser']),
    goIndex() {
        this.$router.push('/')
    },
    logout: function (root) {
        this.logOutUser().finally(() => { this.$router.push('/login'), this.loadUser(null) })
        this.alertSwal('success', 'has cerrado sesión correctamente.')
    },
    alertSwal(type, title){
        this.$swal({
            title: title,
            type: type,
            confirmButtonText: 'Aceptar',
            showConfirmButton: false,
            timer: 2000
        });
    },
    setPlace(place) {

        if (!place) return

        store.state.mapBounds = {};

        let latlong = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            search: true
        };

        this.changeCenter(latlong)
    }
  },
}
</script>

<style lang="scss">

.h-filter {
    background-color: #00ADEF !important;
    color: #FFFFFF !important;
    border-bottom-right-radius: 1rem!important;
    border-bottom-left-radius: 1rem!important;
    margin-bottom: -48px;
}

.hr-active {
  border-top: 4px solid rgb(180, 209, 61);
}

.hr-inactive {
  border-top: 4px solid rgba(0,0,0,.1);
}

.sub-menu {
  z-index: 11;
}

a.router-link-exact-active {
  color: #B4D13D !important;
}

.header {
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: white;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .1);
    transition: background ease .3s;
}

.header .container {
    position: relative;
}

.header:after, .header:before {
    /* content: ""; */
    /* display: table; */
    clear: both;
}

.header .consult-nav {
    float: right;
    transition: padding .3s ease;
    padding: 35px 20px;
}

.header .consult-nav .consult-menu a {
    text-transform: capitalize;
}

@media (min-width: 992px) {
    .header .consult-nav .consult-menu a {
        text-transform: uppercase;
    }
}

@media (min-width: 992px) {
    .header .consult-nav {
        text-align: center;
        padding: 0;
        float: none;
    }
}

.header .search-form {
    display: inline-block;
    margin-left: 10px;
}

@media (min-width: 992px) {
    .header .search-form {
        margin-left: 40px;
    }
}

/* .header.shrink { */
    /* position: fixed; */
    /* background-color: white; */
/* } */

.header.shrink .header__logo {
    height: 60px;
    line-height: 60px;
}

.header.shrink .header__chooseLanguage, .header.shrink .search-form__toggle {
    height: 70px;
    line-height: 70px;
}

@media (min-width: 992px) {
    .header.shrink .consult-nav .consult-menu > li > a {
        height: 70px;
        line-height: 70px;
    }
}

.header.shrink .consult-nav {
    padding: 15px 20px;
}

@media (min-width: 992px) {
    .header.shrink .consult-nav {
        padding: 0;
    }
}

.header + * {
    margin-top: 75px;
}

.header__logo {
    height: 250px;
    max-width: 250px;
    line-height: 100px;
    float: left;
    transition: height .3s ease;
}

.header__chooseLanguage {
    display: inline-block;
    height: 100px;
    line-height: 100px;
    transition: height .3s ease;
}

.header__chooseLanguage i {
    margin: 0 5px;
}

.header__chooseLanguage a {
    display: block;
}

.header__toogleGroup {
    float: right;
}

.search-form__toggle {
    height: 100px;
    line-height: 100px;
    transition: height .3s ease;
    cursor: pointer;
}

.search-form__form {
    top: 100%;
    right: 0;
    position: absolute;
    width: 100%;
    height: 60px;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    -webkit-transform: translateY(30px);
            transform: translateY(30px);
    transition: all .3s ease;
}

@media (min-width: 576px) {
    .search-form__form {
        width: 300px;
    }
}

.search-form__form .form-search, .search-form__form .form-search > form,
.search-form__form .form-search > form > input {
    height: 100%;
    background-color: white;
}

.search-form {
    position: relative;
}

.search-form.open .search-form__form {
    opacity: 1;
    visibility: visible;
    -webkit-transform: translateY(0);
            transform: translateY(0);
}

/* .header__style-02 { */
    /* background-color: transparent; */
/* } */

.header__style-02 + * {
    margin-top: 0;
}

/* .header__style-02:not(.shrink) { */
    /* box-shadow: none; */
/* } */

.header__style-02:not(.shrink) .consult-nav .consult-menu > li > a {
    color: #fff;
}

.header__style-02:not(.shrink) .consult-nav .consult-menu .current-menu-item > a {
    color: #B4D13D;
}

.header__style-02:not(.shrink) .dropdown__toggle {
    color: #c2c2c2;
}

.header__style-02:not(.shrink) .search-form__toggle {
    color: #fefefe;
}

.header__style-02 .navbar-toggle > span {
    background-color: #fefefe;
}

.header__style-03 {
    background-color: transparent;
    box-shadow: none;
}

.header__style-03 + * {
    margin-top: 0;
}

.navbar-toggle {
    cursor: pointer;
}

.navbar-toggle > span {
    width: 31px;
    height: 3px;
    background-color: #1f1c2f;
    display: block;
    margin: 5px auto;
    transition: all .3s ease-in-out;
}

.navbar-toggle.open > span:nth-child(1), .navbar-toggle.open > span:nth-child(3) {
    width: 25px;
}

.navbar-toggle.open > span:nth-child(1) {
    -webkit-transform: translateX(-10px) rotate(-45deg);
            transform: translateX(-10px) rotate(-45deg);
}

.navbar-toggle.open > span:nth-child(3) {
    -webkit-transform: translateX(-10px) rotate(45deg);
            transform: translateX(-10px) rotate(45deg);
}

.consult-nav {
    z-index: 999;
}

.consult-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0;
}

.consult-nav li {
    position: relative;
    z-index: 9;
}

.consult-nav li a {
    display: block;
    position: relative;
    text-decoration: none;
}

.nav-icon:focus {
    outline: none;
}

@media (min-width: 993px) {
    .nav-icon {
        visibility: hidden;
    }

    .consult-nav {
        text-align: center;
    }

    .consult-nav li:hover > a {
        color: #B4D13D;
    }

    .consult-nav .consult-menu .sub-menu {
        opacity: 0;
        visibility: hidden;
        -webkit-transform: scaleY(0);
                transform: scaleY(0);
        -webkit-transform-origin: 50% 0;
                 transform-origin: 50% 0;
    }

    .consult-nav .consult-menu li:hover > .sub-menu {
        opacity: 1;
        visibility: visible;
        -webkit-transform: scaleY(1);
                transform: scaleY(1);
    }

    .consult-nav .consult-menu a {
        padding: 20px 30px;
    }

    .consult-nav .consult-menu .sub-menu {
        background-color: #fff;
        text-align: left;
        border: 1px solid rgba(0, 0, 0, .1);
        border-top: 3px solid #B4D13D;
    }

    .consult-nav .consult-menu .sub-menu a {
        padding: 10px 15px;
        border-top: 1px solid rgba(0, 0, 0, .1);
    }

    .consult-nav .consult-menu .sub-menu a:after {
        right: 15px;
    }

    .consult-nav .consult-menu .sub-menu li .sub-menu {
        top: -2px;
    }

    .consult-nav .consult-menu .sub-menu li:first-child > a {
        border-top: 0;
    }

    .consult-nav .consult-menu .sub-menu li:first-child .sub-menu {
        top: -3px;
    }

    .consult-nav .consult-menu > li {
        display: inline-block;
    }

    .consult-nav .consult-menu a {
        font-size: 14px;
        color: #868686;
        transition: all 300ms ease;
        font-weight: 700;
        text-transform: uppercase;
        padding: 0 25px;
        height: 50px;
        line-height: 50px;
    }

    .consult-nav .consult-menu .sub-menu {
        display: block !important;
    }

    .consult-nav .consult-menu .sub-menu .current-menu-parent > a,
    .consult-nav .consult-menu .sub-menu .current-menu-item > a {
        color: #B4D13D;
    }

    .consult-nav .consult-menu .current-menu-parent > a,
    .consult-nav .consult-menu .current-menu-item > a {
        color: #B4D13D;
    }

    .consult-nav .consult-menu .sub-menu {
        width: 250px;
        position: absolute;
        top: 100%;
        z-index: -1;
        left: 0;
        transition: all 300ms cubic-bezier(.175, .885, .32, 1.275);
    }

    .consult-nav .consult-menu .sub-menu .sub-menu {
        top: 0;
        left: 100%;
    }

    .consult-nav .consult-menu .sub-menu li.menu-item-has-children > a:after {
        font-family: "FontAwesome";
        content: "\F105";
        position: absolute;
        top: 50%;
        -webkit-transform: translate(0, -50%);
                transform: translate(0, -50%);
    }

    .consult-nav .consult-menu .sub-menu li > a {
          line-height: inherit !important;
        font-size: 14px;
        transition: all 300ms ease;
        font-weight: 300;
        text-transform: capitalize;
        height: auto;
        line-height: 1.875;
        color: #8f8f8f;
        border-bottom: none;
        box-shadow: none;
    }

    .consult-nav .consult-menu .sub-menu li:hover > a {
        color: #B4D13D;
    }

    .consult-nav .consult-menu .sub-menu li .current-menu-parent > a,
    .consult-nav .consult-menu .sub-menu li .current-menu-item > a {
        color: #B4D13D;
    }

    .consult-nav .navbar-toggle {
        display: none;
    }
}

</style>

