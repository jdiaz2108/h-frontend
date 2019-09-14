<template>
  <div>
    <v-dialog v-model="this.$route.meta.showModal" :persistent="lightbox" max-width="85%" content-class="fullHeightModal" @keydown.esc="gotoMap(true)" @click:outside="gotoMap">
    <v-card class="fullHeightModal">
      <div class="row m-0 bg-light">
        <div class="col-7 p-0">
          <img :src="showBuildObj.image" class="img-fluid w-100" alt="">
          <div class="row m-0" id="selector1">
            <div class="col-6 p-1" v-for="(images, index) in showBuildObj.images" :key="index">
              <div class="item" :data-src="images.src">
                <img :src="images.src" @click="showModal" class="img-fluid w-100" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-5 p-0">
          <div class="row m-0">
            <div class="col-12 p-1">
              <div class="card shadow">
                <div class="card-body">
                  <h5 class="card-title">{{showBuildObj.name}}</h5>
                  <h5 class="card-title">
                    {{showBuildObj.priceSale | currency('$', 0, { thousandsSeparator: '.', spaceBetweenAmountAndSymbol: true }) }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
  data() {
    return {
      dialog: true,
      showBuildObj: {},
      lightbox: false,
    }
  },
  mounted() {
    console.log(this)
    this.showBuild(this.$route.params.id)
  },
  methods: {
    gotoMap(esc) {
      if (!this.lightbox) {
        this.$router.push({ path: '/H/mapa' })
      }
    },
      showModal() {
        let el = this;
        this.lightbox = true;
        this.selector1 = $("#selector1").lightGallery({
          selector: '.item',
          zoom: true,
          download: false,
        })
        this.selector1.on('onBeforeClose.lg', function (event) {
          el.lightbox = false;
        });
      },
      showBuild(id) {
        axios
          .get('/builds/' + id)
          .then(response => {
            console.log(response);
            this.showBuildObj = response.data.data;
          })
          .catch(error => {
            console.log(error)
          })
      },
  },
}
</script>

<style>

</style>
