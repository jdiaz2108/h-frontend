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
export default {
  data() {
    return {
     //
    };
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
