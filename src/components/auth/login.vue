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
                Iniciar Sesión
              </h4>
            </div>
          </div>
          <div class="card-body pb-0">
            <div class="d-flex">

              <router-link to="/login" style="color: #000 !important"
                :style="active == 'login' ? 'cursor: default' : 'hr-inactive'" class="link-no-hover">
                <div class="p-2">
                  Iniciar Sesión
                  <hr class="w-50 text-center mx-auto m-2" :class="active == 'login' ? 'hr-active' : 'hr-inactive'">
                </div>
              </router-link>
              <router-link to="/register" style="color: #000 !important"
                :style="active == 'register' ? 'cursor: default' : 'hr-inactive'" class="link-no-hover">
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
            <form @submit.prevent="doLogin()">
              <div class="input-group mb-3"><input name="email" v-model="email" type="email" :class="{ 'is-invalid': errors.errors ? errors.errors.email : '' }"
                  placeholder="Correo electrónico" aria-describedby="basic-addon2" required="required"
                  autofocus="autofocus" class="form-control">
                <div class="input-group-append"><span id="basic-addon2" class="input-group-text" style="width: 34px;"><i
                      aria-hidden="true" class="fa fa-envelope"></i></span></div>
                <div v-if="errors.errors" class="invalid-feedback">
                  <div v-for="error in errors.errors.email" :key="error">
                    {{error}}
                  </div>
                 </div>
              </div>
              <div class="input-group mb-3"><input name="password" v-model="password" type="password" :class="{ 'is-invalid': errors.errors ? errors.errors.password : '' }"
                  placeholder="Contraseña" aria-describedby="basic-addon2" required="required" autofocus="autofocus"
                  class="form-control">
                <div class="input-group-append"><span id="basic-addon2" class="input-group-text" style="width: 34px;"><i
                      aria-hidden="true" class="fa fa-lock"></i></span></div>
                                      <div v-if="errors.errors" class="invalid-feedback">
                  <div v-for="error in errors.errors.password" :key="error">
                    {{error}}
                  </div>
                 </div>
              </div>
              <div class="form-group">
                <div class="custom-control custom-checkbox mb-3"><input type="checkbox" id="customCheck1"
                    class="custom-control-input"> <label for="customCheck1"
                    class="custom-control-label">Recordarme</label></div>

                <div class="d-flex mt-5">
                  <div class="p-2">
                    <button type="submit" class="btn btn-green btn-block" :disabled="loading">
                      <span class="px-2" v-if="!loading">Iniciar Sesión</span>
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
  import { mapState, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        email: null,
        password: null,
        key: 'value',
        errors: {},
        loading: false,
      }
    },
    created() {
       if (this.$route.meta.status == 'login') {
                 this.active = 'login';
            } else {
                this.active = 'register';
            }
    },
    methods: {
      ...mapMutations(['propertyUpdate', 'resetProperty', 'loadUser', 'loadToken', 'login']),
      doLogin: function () {
        this.errors = {},
        this.loading = true,
        this.$axios.post('/auth/login', {
            email: this.email,
            password: this.password
          })
          .then(response => {
            this.login(response.data)
            this.alertSwal('success', 'Has iniciado sesión correctamente.')
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
      alertSwal(type, title) {
        this.$swal({
          title: title,
          type: type,
          confirmButtonText: 'Aceptar',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    },
  }
</script>

