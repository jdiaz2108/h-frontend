<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-center p-5">
        <div class="col-10">
          <div class="card">
            <h5 class="card-header">{{msg}}</h5>
            <div class="card-body">
              <pre>
                {{payuResponse}}
                </pre>
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
      msg: 'hola',
      payuResponse: this.$route.query
    }
  },
  methods: {
    transactionState() {
      console.log('entra');
      var foo = parseInt(this.payuResponse.transactionState);
      switch(foo) {
        case 4:
          this.msg = 'APROBADA';
        break;
        case 6:
          this.msg = 'RECHAZADA';
        break;
        case 104:
          this.msg = 'ERROR';
        break;
        case 5:
          this.msg = 'EXPIRADA';
        break;
        case 7:
          this.msg = 'PENDIENTE';
        break;
      }
    }
  },
  mounted() {
    console.log(this.payuResponse.transactionState)
    this.transactionState(this.payuResponse.transactionState)
  }
}
</script>