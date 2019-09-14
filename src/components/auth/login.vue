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
          <div class="card-body">
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
            <form @submit.prevent="doLogin()">
              <div class="input-group mb-3"><input name="email" v-model="email" type="email"
                  placeholder="Correo electrónico" aria-describedby="basic-addon2" required="required"
                  autofocus="autofocus" class="form-control">
                <div class="input-group-append"><span id="basic-addon2" class="input-group-text" style="width: 34px;"><i
                      aria-hidden="true" class="fa fa-envelope"></i></span></div>
              </div>
              <div class="input-group mb-3"><input name="password" v-model="password" type="password"
                  placeholder="Contraseña" aria-describedby="basic-addon2" required="required" autofocus="autofocus"
                  class="form-control">
                <div class="input-group-append"><span id="basic-addon2" class="input-group-text" style="width: 34px;"><i
                      aria-hidden="true" class="fa fa-lock"></i></span></div>
              </div>
              <div class="form-group">
                <div class="custom-control custom-checkbox mb-3"><input type="checkbox" id="customCheck1"
                    class="custom-control-input"> <label for="customCheck1"
                    class="custom-control-label">Recordarme</label></div>

                <div class="d-flex mb-3">
                  <div class="p-2">
                    <button type="submit" class="btn btn-green btn-block">Iniciar Sesión</button></div>
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
  export default {
    data() {
      return {
        email: null,
        password: null,
        key: 'value',
        errors: [],
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
      doLogin: function () {
        this.$axios.post('/auth/login', {
            email: this.email,
            password: this.password
          })
          .then(response => {
            localStorage.Authorization = 'Bearer ' + response.data.access_token;
            this.alertSwal('success', 'Has iniciado sesión correctamente.')
            this.$router.push({
              path: '/'
            });
          })
          .catch(error => {
            //     this.errors = error.response.data;
            //         if (this.errors.errors.email) {
            //             this.Swal(this.errors.errors.email[0], 'error');
            //         }
            //         if (this.errors.errors.password) {
            //             this.Swal(this.errors.errors.password[0], 'error');
            //         }
            // this.alertSwal('error', error)
            console.log(error)

          })
      },
      alertSwal(type, title) {
        // Use sweetalert2
        this.$swal({
          title: title,
          type: type,
          confirmButtonText: 'Aceptar',
          showConfirmButton: false,
          timer: 1500
        });
      },
    },
  }
</script>

