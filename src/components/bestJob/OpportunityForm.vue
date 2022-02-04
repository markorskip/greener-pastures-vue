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
    //import axios from 'axios';
    //let authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVlMGNiMzE1MGM1ZDE5MjkxMWQzNDg1MiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU3Nzg5MDU4MX0.-gjctbfrZpR0Hw3C-CavZNEGAl2-890FJSG5TSml3i0'

    import InputForm from "@/components/bestJob/inputForm/InputForm";
    import Taxes from "@/components/bestJob/calculateTax/Taxes";
    import CostOfLiving from "@/components/bestJob/calculateCOL/CostOfLiving";
    import DisplayInputs from "@/components/bestJob/inputForm/DisplayInputs";

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
    function calculateAnnualTaxes(state, filing_status, pay_rate) {
      console.log(state);
      console.log(filing_status);
      console.log(pay_rate);
      //TODO make an API call here to get taxes
      // TODO update - the backend api taxee-stats are open source, import them to the
      // project and remove all external api calls - yay!
      // api address
      return {
          totalTax: 18000,
          federal: 10000,
          state: 5000,
          fica: 3000
      };
    }

    // TODO implement - can do in memory
    function calculateValueOfDollar(state) {
      console.log(state)
      //TODO get values from json string
      return 1.1;
    }

    // TODO implement - can do in memory
    function calculateStateAverageRent(state) {
      console.log(state)
      return 1200;
    }

    export default {
        name: 'OpportunityForm',
        // components: {DisplayInputs, InputForm, Taxes, CostOfLiving },
      components: {DisplayInputs, InputForm, Taxes, CostOfLiving },
        props: {
            index: Number,
            opp: Object
        },
         methods: {
            calculateTax() {
                if (this.opp.inputs.state == null) { alert("Enter State"); return null; }
                if (this.opp.inputs.pay_rate == null) { alert("Enter Salary Data"); return null; }
                console.log("Calculating Tax API request");

                let annualTaxes = calculateAnnualTaxes(this.opp.inputs.state, this.opp.inputs.filing_status, this.opp.inputs.pay_rate);
                let valueOfADollar = calculateValueOfDollar(this.opp.inputs.state);
                let averageRent = calculateStateAverageRent(this.opp.inputs.state);
                let afterTaxPay = this.opp.inputs.pay_rate - annualTaxes.totalTax;
                let adjustedPay = afterTaxPay * valueOfADollar;
                let response = {
                  data: {
                    adjPay: adjustedPay,
                    inputs: {
                      state: this.opp.inputs.state,
                      filing_status: this.opp.inputs.filing_status,
                      pay_rate: this.opp.inputs.pay_rate
                    },
                    annual: annualTaxes,
                    stateCostOfLiving: {
                      averageRent: averageRent,
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

                // axios({
                //     method: 'post',
                //     headers: {
                //         'authorization': authorization,
                //         'Access-Control-Allow-Origin':'*'
                //     },
                //     data: {
                //         state: this.opp.inputs.state,
                //         pay_rate: this.opp.inputs.pay_rate,
                //         filing_status: this.opp.inputs.filing_status
                //     },
                //     url: "https://greenpastures.herokuapp.com/calculate" // TODO make this a property depending on where it is deployed
                // }).then(response => {
                //     let update = {
                //         index: this.index,
                //         data: response.data
                //     }
                //     this.$store.commit('updateOpportunity', update)
                //     this.opp.calculateClicked = true;
                // })
                //     .catch(e => console.log(e))
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
