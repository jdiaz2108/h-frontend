  <template>
    <div class="container-fluid auth pt-5 bg-dark">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-6 col-lg-3 pt-0">
          <div class="card shadow">
            <div class="card-header bg-white">
              Mi Perfil
            </div>
            <div class="card-body text-left">
              <h5>
                Nombre: {{user.name}}
              </h5>
              <h5>
                Email: {{user.email}}
              </h5>
              <h5>
                Inscrito desde: {{user.date}}
              </h5>
              <h5>

              </h5>
            </div>
            <div class="card-body">
              Datos de Contacto:

            </div>
          </div>
        </div>
          <div class="col-12 col-sm-6 col-lg-7 m-0 p-0">
            <div class="card shadow">
              <div class="card-header bg-white">
                Mis Predios
              </div>
              <div class="card-body">
                <div class="row ">
                  <div class="col-4 p-3" v-if="properties.length == 0">
                    <div class="card shadow bg-secondary text-white">
                      <img class="card-img-top" src="b.image">
                      <div class="card-body ">
                        <h5 class="card-title">No hay predios creados</h5>
                        <h5 class="card-title">
                         <button type="submit" class="btn btn-green btn-block">Iniciar Sesión</button>
                        </h5>
                        <p class="card-text">descripcion</p>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-6 col-lg-4 p-3" v-for="(property, index) in properties" :key="index">
                    <div class="card shadow h-100">
                      <div class="card-timeago">
                        <i class="fa fa-clock-o pr-1"></i>
                        <span class="card-title">{{property.created_at | timeago}}</span>
                      </div>

                      <img class="card-img-top" :src="property.image">

                      <div class="card-body ">
                        <h5 class="card-title">{{property.name}}</h5>
                        <h5 class="card-title">
                          {{property.priceSale | currency('$', 0, { thousandsSeparator: '.', spaceBetweenAmountAndSymbol: true }) }}
                        </h5>
                        <p class="card-text">{{property.description}}</p>
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
import moment from 'moment'

import axios from 'axios'
import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState(['user', 'properties'])
    },
    created() {
      moment.locale('es');
    },
    filters: {
      timeago: function (value) {
        return moment(value, "YYYY-MM-DD HH:ii:ss").fromNow()
      }
    },
  }
</script>


<style>
  .card-timeago {
    border-radius: calc(.25rem - 1px) 0 calc(.25rem - 1px) 0;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    padding: 3px 10px;
    text-transform: uppercase;
        text-align: center;
  }

</style>
