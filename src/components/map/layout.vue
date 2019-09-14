<template>
  <div>
    <router-view name="page" />
    <v-layout row justify-center>
        <router-view name="rule" />
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
     //
    };
  },
  created() {
          var myHtml = document.getElementsByTagName('html')[0];
      myHtml.classList.add('overHidden');
  },
};
</script>
