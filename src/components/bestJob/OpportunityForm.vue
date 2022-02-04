<template>
    <b-col md="auto" class="m-1">
        <b-card style="max-width: 20rem">
            <div v-show="this.opp.best" variant="success">
                <b-alert variant="success" show v-b-popover.hover.bottom="'This opportunity has your highest adjusted pay!!'">
                    BEST PAY!
                </b-alert>
            </div>
            <div v-if="this.opp.calculateClicked">
               <display-inputs :inputs="this.opp.inputs"></display-inputs>
                <Taxes :annual="this.opp.annual" :net-income="this.opp.afterTaxPay"></Taxes>
                <CostOfLiving :rent="this.opp.stateCostOfLiving.averageRent"
                              :adjusted-income="this.opp.adjPay"
                              :value-of-a-dollar="this.opp.stateCostOfLiving.valueOfADollar"></CostOfLiving>
            </div>

            <div v-else>
                <input-form :inputs="this.opp.inputs"></input-form>
                <b-button block variant="primary" v-on:click="calculateTax" class="mb-2 mt-2">Calculate</b-button>
            </div>

            <b-button block variant="danger" v-on:click="deleteOpportunity">Delete</b-button>
            <b-button block v-on:click="reset">Reset</b-button>
        </b-card>
    </b-col>
</template>

<script>
    import axios from 'axios';
    let authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVlMGNiMzE1MGM1ZDE5MjkxMWQzNDg1MiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU3Nzg5MDU4MX0.-gjctbfrZpR0Hw3C-CavZNEGAl2-890FJSG5TSml3i0'

    import InputForm from "@/components/bestJob/inputForm/InputForm";
    import Taxes from "@/components/bestJob/calculateTax/Taxes";
    import CostOfLiving from "@/components/bestJob/calculateCOL/CostOfLiving";
    import DisplayInputs from "@/components/bestJob/inputForm/DisplayInputs";

    let costOfLivingMap = {
      'AL': { 'dollar': '1.1',  'rent': '$998'},
      'AK': { 'dollar': '0.9', 'rent': '$1,748'},
      'AZ': { 'dollar': '1.0', 'rent': '$1,356'},
      'AR': { 'dollar': '1.1', 'rent': '$953'},
      'CA': { 'dollar': '0.8', 'rent': '$2,518'},
      'CO': { 'dollar': '0.97', 'rent': '$1,927'},
      'CT': { 'dollar': '0.92', 'rent': '$1,803'},
      'DE': { 'dollar': '1.00', 'rent': '$1,435'},
      'FL': { 'dollar': '1.00', 'rent': '$1,590'},
      'GA': { 'dollar': '1.09', 'rent': '$1,262'},
      'HI': { 'dollar': '0.84', 'rent': '$2,481'},
      'ID': { 'dollar': '1.08', 'rent': '$1,238'},
      'IL': { 'dollar': '1.01', 'rent': '$1,463'},
      'IN': { 'dollar': '1.11', 'rent': '$1,113'},
      'IA': { 'dollar': '1.11', 'rent': '$1,057'},
      'KS': { 'dollar': '1.10', 'rent': '$1,051'},
      'KY': { 'dollar': '1.14', 'rent': '$1,084'},
      'LA': { 'dollar': '1.11', 'rent': '$1,245'},
      'ME': { 'dollar': '1.02', 'rent': '$1,466'},
      'MD': { 'dollar': '0.91', 'rent': '$1,807'},
      'MA': { 'dollar': '0.93', 'rent': '$2,252'},
      'MI': { 'dollar': '1.07', 'rent': '$1,110'},
      'MN': { 'dollar': '1.03', 'rent': '$1,449'},
      'MS': { 'dollar': '1.16', 'rent': '$1,055'},
      'MO': { 'dollar': '1.12', 'rent': '$1,047'},
      'MT': { 'dollar': '1.06', 'rent': '$1,234'},
      'NE': { 'dollar': '1.10', 'rent': '$1,253'},
      'NV': { 'dollar': '1.03', 'rent': '$1,423'},
      'NH': { 'dollar': '0.94', 'rent': '$1,748'},
      'NJ': { 'dollar': '0.88', 'rent': '$2,062'},
      'NM': { 'dollar': '1.07', 'rent': '$1,200'},
      'NY': { 'dollar': '0.87', 'rent': '$2,050'},
      'NC': { 'dollar': '1.10', 'rent': '$1,208'},
      'ND': { 'dollar': '1.09', 'rent': '$1,290'},
      'OH': { 'dollar': '1.12', 'rent': '$1,113'},
      'OK': { 'dollar': '1.12', 'rent': '$950'},
      'OR': { 'dollar': '1.00', 'rent': '$1,707'},
      'PA': { 'dollar': '1.02', 'rent': '$1,242'},
      'RI': { 'dollar': '1.00', 'rent': '$1,725'},
      'SC': { 'dollar': '1.11', 'rent': '$1,209'},
      'SD': { 'dollar': '1.13', 'rent': '$1,213'},
      'TN': { 'dollar': '1.11', 'rent': '$1,153'},
      'TX': { 'dollar': '1.03', 'rent': '$1,455'},
      'UT': { 'dollar': '1.03', 'rent': '$1,526'},
      'VT': { 'dollar': '0.98', 'rent': '$1,599'},
      'VA': { 'dollar': '0.98', 'rent': '$1,452'},
      'WA': { 'dollar': '0.95', 'rent': '$1,838'},
      'WV': { 'dollar': '1.14', 'rent': '$888'},
      'WI': { 'dollar': '1.08', 'rent': '$1,141'},
      'WY': {'dollar': '1.03', 'rent': '$1,149'},
      'DC': {'dollar': '0.84', 'rent': '$2339'}
    };
    /*
    public Annual calculateAnnualTaxesOwed(OpportunityInputs inputs) {
        String uri = "https://taxee.io/api/v2/calculate/2020";
        String auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVlMGNiMzE1MGM1ZDE5MjkxMWQzNDg1MiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU3Nzg5MDU4MX0.-gjctbfrZpR0Hw3C-CavZNEGAl2-890FJSG5TSml3i0";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        httpHeaders.setAccessControlAllowOrigin("*");
        httpHeaders.set("Authorization", auth);

        MultiValueMap<String, String> form_inputs = inputsToMultiValueMap(inputs);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(form_inputs, httpHeaders);

        ResponseEntity<TaxeeResponse> response = restTemplate.exchange(
                uri,
                HttpMethod.POST,
                request,
                TaxeeResponse.class);
        return response.getBody().getTaxesOwed();
    }
     */

    //import y2020 from './service/2020/index.js';

    // eslint-disable-next-line no-unused-vars
    async function calculateAnnualTaxes(state, filing_status, pay_rate) {
      let rsp = {};
      await axios({
        method: 'post',
        headers: {
          'authorization': authorization,
          'Access-Control-Allow-Origin': '*',
          'ContentType': 'MediaType.APPLICATION_FORM_URLENCODED'
        },
        data: {
          state: state,
          pay_rate: pay_rate,
          filing_status: filing_status
        },
        url: "https://taxee.io/api/v2/calculate/2020"
      }).then(response => {
        return rsp = response.data.annual;
        })
       .catch(e => console.log(e))

      return rsp;
    }



    function calculateValueOfDollar(state) {
      return costOfLivingMap[state].dollar;
    }

    function calculateStateAverageRent(state) {
      return costOfLivingMap[state].rent;
    }

    export default {
      name: 'OpportunityForm',
      components: {DisplayInputs, InputForm, Taxes, CostOfLiving },
      props: {
          index: Number,
          opp: Object
      },
         methods: {
            async calculateTax() {
              if (this.opp.inputs.state == null) {
                alert("Enter State");
                return null;
              }
              if (this.opp.inputs.pay_rate == null) {
                alert("Enter Salary Data");
                return null;
              }
              console.log("Calculating Tax API request");

              let annual = await calculateAnnualTaxes(this.opp.inputs.state, this.opp.inputs.filing_status, this.opp.inputs.pay_rate);
              console.log("Annual Taxes");
              console.log(annual);
              let valueOfADollar = calculateValueOfDollar(this.opp.inputs.state);

              function calculateTotalTax(annual) {
                return annual.federal.amount + annual.state.amount + annual.fica.amount;
              }
              let totalTax = calculateTotalTax(annual);
              annual.totalTax = totalTax;
              let afterTaxPay = this.opp.inputs.pay_rate - totalTax;
              let adjustedPay = afterTaxPay * valueOfADollar;
              let response = {
                data: {
                  adjPay: adjustedPay,
                  inputs: {
                    state: this.opp.inputs.state,
                    filing_status: this.opp.inputs.filing_status,
                    pay_rate: this.opp.inputs.pay_rate
                  },
                  annual: annual,
                  stateCostOfLiving: {
                    averageRent: calculateStateAverageRent(this.opp.inputs.state),
                    valueOfADollar: valueOfADollar
                  },
                  afterTaxPay: afterTaxPay
                }
              };
              let update = {
                index: this.index,
                data: response.data
              }
              this.$store.commit('updateOpportunity', update)
              this.opp.calculateClicked = true;
            },
            deleteOpportunity() {
                this.$store.commit('deleteOpportunity',this.index);
                console.log(this.$store.state.opportunities);
            },
            reset() {
                console.log("Reset clicked");
                this.opp.adjPay = 0;
                this.opp.inputs.pay_rate = null;
                this.opp.inputs.state = "AL";
                this.opp.calculateClicked = false;
            },
        },
        mounted() {
            this.$ua.trackView("calculator");
            console.log("Opportunity Form Mounted");
        }

    }
</script>
