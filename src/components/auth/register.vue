<template>
  <div class="container-fluid auth d-flex bg-dark"
    :style="$vuetify.breakpoint.smAndDown ? 'height: calc(100vh - 56px)' : 'height: calc(100vh - 64px)'">
    <div class="row justify-content-center">
      <div class="col-12 col-md-7 col-lg-5 col-xl-4 align-self-center" style="position: relative;bottom: 5rem;">
        <div class="card mt-25 shadow">
          <v-btn fab dark small class="button-close-float" @click="$router.go(-1)">
            <i aria-hidden="true" class="fa fa-times fa-lg"></i>
          </v-btn>
          <div class="card-header text-center row m-0" style="background-color: rgba(0,0,0,0);">
            <div class="col-4">
              <img src="https://api.habitemos.com/images/LOGO-HABITEMOS-VERTICAL.png" alt="Card image cap"
                class="card-img-top rounded flotting-45 mb-2">
            </div>
            <div class="col-8 my-auto">
              <h4 style="color: #848688">
                Registrarse
              </h4>
            </div>
          </div>
          <div class="card-body pb-0">
            <div class="d-flex">

              <router-link to="/login" class="link-no-hover"
                :style="active == 'login' ? 'cursor: default' : 'hr-inactive'" style="color: #000 !important;">
                <div class="p-2">
                  Iniciar Sesión
                  <hr class="w-50 text-center mx-auto m-2" :class="active == 'login' ? 'hr-active' : 'hr-inactive'">
                </div>
              </router-link>
              <router-link to="/register" class="link-no-hover"
                :style="active == 'register' ? 'cursor: default' : 'hr-inactive'" style="color: #000 !important;">
                <div class="p-2">
                  Registrarse
                  <hr class="w-50 text-center mx-auto m-2" :class="active == 'register' ? 'hr-active' : 'hr-inactive'">
                </div>
              </router-link>
            </div>
          </div>


          <div class="card-body">
            <div v-if="errors.message" >
                <v-alert dense outlined type="error">
                  {{errors.message}}
                </v-alert>
            </div>
            <form @submit.prevent="createObject()">
              <div class="input-group mb-3">
                <input name="name" v-model="object.name" type="text" id="name" placeholder="Nombre" required="required" autofocus="autofocus" class="form-control" :class="{ 'is-invalid': errors.errors ? errors.errors.name : '' }">
                <div class="input-group-append">
                  <span id="basic-addon2" class="input-group-text" style="width: 34px;">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
                <div v-if="errors.errors" class="invalid-feedback">
                  <div v-for="error in errors.errors.name" :key="error">
                    {{error}}
                  </div>
                 </div>
              </div>
              <div class="input-group mb-3">
                <input name="email" v-model="object.email" type="email" id="email" placeholder="Correo electrónico" required="required" autofocus="autofocus" class="form-control" :class="{ 'is-invalid': errors.errors ? errors.errors.email : '' }">
                <div class="input-group-append">
                  <span id="basic-addon2" class="input-group-text" style="width: 34px;">
                    <i aria-hidden="true" class="fa fa-envelope"></i>
                  </span>
                </div>
                 <div v-if="errors.errors" class="invalid-feedback">
                  <div v-for="error in errors.errors.email" :key="error">
                    {{error}}
                  </div>
                 </div>
              </div>
              <div class="input-group mb-3">
                <input name="password" v-model="object.password" type="password" id="password" placeholder="Contraseña" required="required" autofocus="autofocus" class="form-control" :class="{ 'is-invalid': errors.errors ? errors.errors.password : '' }">
                <div class="input-group-append">
                  <span id="basic-addon2" class="input-group-text" style="width: 34px;">
                    <i aria-hidden="true" class="fa fa-lock"></i>
                  </span>
                </div>
                <div v-if="errors.errors" class="invalid-feedback">
                  <div v-for="error in errors.errors.password" :key="error">
                    {{error}}
                  </div>
                 </div>
              </div>
              <div class="input-group mb-3">
                <input name="password-confirmation" v-model="object.password_confirmation" type="password" id="password-confirmation" placeholder="Repetir Contraseña" required="required" autofocus="autofocus" class="form-control" :class="{ 'is-invalid': errors.errors ? errors.errors.password_confirmation : '' }">
                <div class="input-group-append">
                  <span id="basic-addon2" class="input-group-text" style="width: 34px;">
                    <i aria-hidden="true" class="fa fa-lock"></i>
                  </span>
                </div>
                <div v-if="errors.errors" class="invalid-feedback">
                  <div v-for="error in errors.errors.password_confirmation" :key="error">
                    {{error}}
                  </div>
                 </div>
              </div>
              <div class="form-group">

                <div class="d-flex mt-5">
                  <div class="p-2">
                    <button type="submit" class="btn btn-green btn-block" :disabled="loading">
                      <span class="px-2" v-if="!loading">Registrarse</span>
                      <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span v-if="loading" class="pl-2">Cargando...</span>
                    </button>
                  </div>
                  <div class="p-2 align-self-center">
                    <router-link style="color: #00ADEF !important" to="/login">Olvidó su contraseña?</router-link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    created() {
      if (this.$route.meta.status == 'login') {
        this.active = 'login';
      } else {
        this.active = 'register';
      }
    },
    mounted() {
      //
    },
    data() {
      return {
        titleSee: 'Ver Usuario',
        titleEdit: 'Editar Usuario',
        title: 'Crear Usuario',
        disabled: true,
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
        object: {},
        status: 'ver',
        getDepend: null,
        errors: {
          errors:null,
          message:null
        },
        crudstatus: 'show',
        loading: false,
      }
    },
    methods: {
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
      createObject: function () {
        this.errors = {
          errors:null,
          message:null
        },
        this.loading = true;
        axios({
            method: 'post',
            url: '/auth/register',
            data: this.object,
          })
          .then(response => {
            this.login(response.data)
            this.alertSwal('success', 'Te has registrado correctamente.')
            this.$router.push({
              path: '/'
            });
          })
          .catch(error => {
            this.errors = error.response.data;
            if (this.errors.message == 'The given data was invalid.') {
              this.errors.message = 'Los datos ingresados son inválidos.'
            }
          })
          .finally(() => {
            this.loading = false
          }); 
      },
    }
  }
</script>
