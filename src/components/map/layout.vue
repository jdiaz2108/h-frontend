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
                    <div class="input-group input-group-lg">
                      <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                    </div>
                    								<!-- Start BuildFor Zone -->
								<div class="col-12 row p-2">
									<div class="py-2 col-5"><label for="buildArea" class="form-control-label">*Seleccione tipo de oferta:</label></div>
									<div class="py-2 col-7 text-left">
										<v-select v-model="search.offer_id" :multiple="true" label="Seleccionar" item-value="label" :items="buildForTypes" item-text="label" solo></v-select>
									</div>
								</div>
								<!-- Start Property Type Zone -->
								<div class="col-12 row p-2">
									<div class="py-2 col-5"><label for="buildArea" class="form-control-label">*Seleccione tipo de propiedad:</label></div>
									<div class="py-2 col-7 text-left">
										<v-select v-model="search.type_id" :multiple="true" label="Seleccionar" item-value="label" :items="properTypes" item-text="label" solo></v-select>
									</div>
								</div>
                <button @click="searching" class="btn btn-danger">Buscar</button>
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
//
    };
  },
  // created() {
  //   this.search.offer_id = this.buildForTypes.map(x => x.label)
  //   this.search.type_id = this.properTypes.map(x => x.label)
  // },
  mounted() {
    
  },
  methods: {
    searching(){
            this.$axios({
             method: 'get',
             url: '/property',
             params: {
               type: this.search,
             },
           })
           .then(response => {
            console.log("TCL: searching -> response", response)
           })
          .catch(error => {
            console.log("TCL: searching -> error", error)
          })
    }
  },
      computed: {
      ...mapState(['properTypes', 'buildForTypes', 'search'])
    },
};
</script>

<style scoped>
.back-index{
    background-image: url(https://api.habitemos.com/images/image-3.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    z-index: 0;
}
</style>
