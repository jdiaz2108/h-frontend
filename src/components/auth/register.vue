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
          <div class="card-body">
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

            <form @submit.prevent="createObject()">
              <div class="input-group mb-3"><input name="name" v-model="object.name" type="text" id="name"
                  placeholder="Nombre" aria-describedby="basic-addon2" required="required" autofocus="autofocus"
                  class="form-control">
                <div class="input-group-append"><span id="basic-addon2" class="input-group-text" style="width: 34px;"><i
                      class="fa fa-user"></i></span></div>
              </div>
              <div class="input-group mb-3"><input name="email" v-model="object.email" type="email" id="email"
                  placeholder="Correo electrónico" aria-describedby="basic-addon2" required="required"
                  autofocus="autofocus" class="form-control">
                <div class="input-group-append"><span id="basic-addon2" class="input-group-text" style="width: 34px;"><i
                      aria-hidden="true" class="fa fa-envelope"></i></span></div>
              </div>
              <div class="input-group mb-3"><input name="password" v-model="object.password" type="password"
                  id="password" placeholder="Contraseña" aria-describedby="basic-addon2" required="required"
                  autofocus="autofocus" class="form-control">
                <div class="input-group-append"><span id="basic-addon2" class="input-group-text" style="width: 34px;"><i
                      aria-hidden="true" class="fa fa-lock"></i></span></div>
              </div>
              <div class="input-group mb-3"><input name="password-confirmation" v-model="object.password_confirmation"
                  type="password" id="password-confirmation" placeholder="Repetir Contraseña"
                  aria-describedby="basic-addon2" required="required" autofocus="autofocus" class="form-control">
                <div class="input-group-append"><span id="basic-addon2" class="input-group-text" style="width: 34px;"><i
                      aria-hidden="true" class="fa fa-lock"></i></span></div>
              </div>
              <div class="form-group">

                <div class="d-flex mb-3">
                  <div class="p-2">
                    <button type="submit" class="btn btn-green btn-block">Registrarse</button></div>
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
        errors: [],
        crudstatus: 'show',
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
        axios({
            method: 'post',
            url: '/auth/register',
            data: this.object,
          })
          .then(response => {
            localStorage.Authorization = 'Bearer ' + response.data.access_token;
            this.alertSwal('success', 'Te has registrado correctamente.')
            this.$router.push({
              path: '/'
            });
          })
          .catch(error => {
            //this.errors = error.response.data.errors;
            console.log(error.response.data.errors)
          })
      },
    }
  }
</script>
