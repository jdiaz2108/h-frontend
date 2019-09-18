<template>
  <div>
    <div class="container-fluid auth bg-dark">
      <div class="row p-0 m-0 justify-center">
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 card-group p-0" :key="index" v-for="(plan, index) in planes">
        <div class="card m-3 p-0 shadow">
            <div class="card-body d-flex flex-column">
              <div class="card shadow mb-4" style="background-color: #00adef">
                <div class="card-body text-white">
              <h4 class="card-title">{{plan.name}}</h4>
              <h3 v-if="plan.price != 0" class="card-title">{{plan.price | currency('$', 0, { thousandsSeparator: '.', spaceBetweenAmountAndSymbol: true })}}</h3>

                </div>
              </div>
              <ul class="list-card px-4">
              <li>
                <p><strong>{{plan.days}}</strong> Dias</p>
              </li>
              <li>
                <p><strong>100</strong> components</p>
              </li>
              <li>
                <p><strong>150</strong> features</p>
              </li>
              <li>
                <p><strong>200</strong> members</p>
              </li>
              <li>
                <p><strong>250</strong> messages</p>
              </li>
            </ul>
            <div class="d-flex align-items-end">

        <button class="btn btn-green btn-lg btn-block" @click="getPayu(plan.slug)">Pagar</button>
            </div>
            </div>

        </div>
        </div>
      </div>
    </div>
 <form method="POST" ref="PayuForm" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
  <input name="merchantId"    type="hidden"  :value.sync="payu.merchantId"   >
  <input name="referenceCode" type="hidden"  :value.sync="payu.referenceCode" >
  <input name="description"   type="hidden"  :value.sync="payu.description"  >
  <input name="amount"        type="hidden"  :value.sync="payu.amount"   >
  <input name="tax"           type="hidden"  :value.sync="payu.tax"  >
  <input name="taxReturnBase" type="hidden"  :value.sync="payu.taxReturnBase" >
  <input name="accountId"     type="hidden"  :value.sync="payu.accountId" >
  <input name="currency"      type="hidden"  :value.sync="payu.currency" >
  <input name="signature"     type="hidden"  :value.sync="payu.signature"  >
  <input name="test"          type="hidden"  :value.sync="payu.test" >
  <input name="buyerEmail"    type="hidden"  :value.sync="payu.buyerEmail" >
  <input name="buyerFullName"    type="hidden"  :value.sync="payu.buyerFullName" >
  <input name="extra1"    type="hidden"  :value.sync="payu.extra1" >
  <input name="extra2"    type="hidden"  :value.sync="payu.extra2" >
  <input name="responseUrl"    type="hidden"  :value.sync="payu.responseUrl" >
  <input name="confirmationUrl"    type="hidden"  :value.sync="payu.confirmationUrl" >

</form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        planes: [],
        property: null,
        payu: {}
      }
    },
    mounted() {
      this.getPlans();
      this.property = 'H-lrakylaLP';
    },
    methods: {
      getPlans() {
        axios
          .get('/plans')
          .then(response => {
            this.planes = response.data;
          })
          .catch(error => {
            console.log(error)
          })
      },
      getPayu(plan) {
        console.log("TCL: getPayu -> axios", axios)
        axios
          .get('/plans/' + this.property, {
            params: {
              plan: plan
            }
          })
          .then(response => {
            this.payu = response.data;
            setTimeout(() => {
              this.$refs.PayuForm.submit()
            }, 100);
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
  }
</script>

<style>
  .list-card li {
    border-bottom: 1px solid rgba(180,209,61,.5);
    margin-bottom: 1rem;
}

.list-card {
    list-style-type: none;
    padding: 0;
}
</style>
