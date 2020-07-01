<template>
    <b-col md="auto" class="m-1">
        <b-card style="max-width: 20rem">
            <div v-show="this.opp.best" variant="success">
                <b-alert variant="success" show v-b-popover.hover.bottom="'This opportunity has your highest adjusted pay!!'">
                    BEST PAY!
                </b-alert>
            </div>
            <div v-if="this.opp.calculateClicked">
                <display-inputs :user-data="this.opp.userData"></display-inputs>
                <calculate-tax
                        :annual="this.opp.annual"
                        :userData="this.opp.userData"></calculate-tax>
                <calculate-c-o-l
                        :state="this.opp.userData.state"
                        :after-tax-income="this.afterTaxIncome"
                        v-on:update-adj-pay="updateAdjPay">
                </calculate-c-o-l>
            </div>

            <div v-else>
                <input-form :user-data="this.opp.userData"></input-form>
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

    import InputForm from "@/components/inputForm/InputForm";
    import CalculateTax from "@/components/calculateTax/Taxes";
    import CalculateCOL from "@/components/calculateCOL/CostOfLiving";
    import DisplayInputs from "@/components/inputForm/DisplayInputs";
    export default {
        name: 'OpportunityForm',
        components: {DisplayInputs, CalculateCOL, CalculateTax, InputForm },
        props: {
            index: Number,
            opp: Object
        },
        computed: {
            totalTax() {
                return this.opp.annual.federal.amount +
                        this.opp.annual.state.amount +
                        this.opp.annual.fica.amount;
            },
            afterTaxIncome() {
                return this.opp.userData.salary - this.totalTax;
            }
        },
         methods: {
            calculateTax() {
                if (this.opp.userData.state == null) { alert("Enter State"); return null; }
                if (this.opp.userData.salary == null) { alert("Enter Salary Data"); return null; }
                console.log("Calculating Tax API request");
                this.opp.calculateClicked = true;
                axios({
                    method: 'post',
                    headers: {
                        'authorization': authorization,
                       // 'content-type' : 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin':'*'
                    },
                    data: {
                        state: this.opp.userData.state,
                        pay_rate: this.opp.userData.salary,
                        filing_status: this.opp.userData.filing_status
                    },
                    url: "https://taxee.io/api/v2/calculate/2020",
                }).then(response => {
                    console.log(response.data.annual);
                    this.opp.annual = response.data.annual;
                })
                    .catch(e => console.log(e))
            },
            deleteOpportunity() {
                this.$store.commit('deleteOpportunity',this.index);
                console.log(this.$store.state.opportunities);
            },
            reset() {
                console.log("Reset clicked");
                this.updateAdjPay(0);
                this.opp.userData.salary = null;
                this.opp.userData.state = "AL";
                this.opp.calculateClicked = false;
            },
            updateAdjPay(event) {
                this.opp.adjPay = event;
            }
        },
        mounted() {
            this.$ua.trackView("calculator");
            console.log("Opportunity Form Mounted");
        }

    }
</script>
