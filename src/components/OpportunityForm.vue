<template>
    <b-col md="auto">
    <b-card :header="title" style="max-width: 20rem">
        <div v-if="this.calculateClicked">
            <display-inputs :user-data="userData"></display-inputs>
            <calculate-tax
                    :annual="this.annual"
                    :userData="this.userData"
                    v-bind:totalTax.sync="totalTax"></calculate-tax>
            <calculate-c-o-l
                    v-bind:state="this.userData.state"
                    v-bind:after-tax-income="afterTaxIncome"
                    :totalCol.sync="totalCol" >
            </calculate-c-o-l>
        </div>
        <div v-else>
            <input-form :user-data="userData"></input-form>
            <b-button block variant="primary" v-on:click="calculateTax">Calculate</b-button>
        </div>
        <b-button block variant="danger" v-on:click="deleteOpportunity">Delete</b-button>
        <b-button block v-on:click="reset">Reset</b-button>
    </b-card>
    </b-col>
</template>

<script>
    import axios from 'axios';
    let authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVlMGNiMzE1MGM1ZDE5MjkxMWQzNDg1MiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU3Nzg5MDU4MX0.-gjctbfrZpR0Hw3C-CavZNEGAl2-890FJSG5TSml3i0'

    import InputForm from "@/components/InputForm/InputForm";
    import CalculateTax from "@/components/CalculateTax/Taxes";
    import CalculateCOL from "@/components/CalculateCOL/CostOfLiving";
    import DisplayInputs from "@/components/InputForm/DisplayInputs";
    export default {
        name: 'OpportunityForm',
        components: {DisplayInputs, CalculateCOL, CalculateTax, InputForm },
        data: function () {
            return {
                userData: {
                    jobName: null,
                    state: "AL",
                    salary: null,
                    filing_status: "single",
                },
                annual: {
                    federal: {amount: null},
                    state: {amount: 0},
                    fica: {amount: null}
                },
                totalTax: 0,
                totalCol: 0,
                col: 0,
                taxData: 0,
                calculateClicked: false,
                title: 'Enter Opportunity Data Below'
            }
        },
        computed: {
            afterTaxIncome() {
                return this.userData.salary - this.totalTax;
            }
        },
        methods: {
            calculateTax() {
                if (this.userData.state == null) { alert("Enter State"); return null; }
                if (this.userData.salary == null) { alert("Enter Salary Data"); return null; }
                console.log("Calculating Tax API request");
                this.calculateClicked = true;
                this.title = this.userData.jobName;
                axios({
                    method: 'post',
                    headers: {
                        'authorization': authorization,
                       // 'content-type' : 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin':'*'
                    },
                    data: {
                        state: this.userData.state,
                        pay_rate: this.userData.salary,
                        filing_status: this.userData.filing_status
                    },
                    url: "https://taxee.io/api/v2/calculate/2020",
                }).then(response => {
                    console.log(response.data.annual);
                    this.annual = response.data.annual;
                })
                    .catch(e => console.log(e))
            },
            deleteOpportunity() {
                this.$emit('deleteOpportunity')
            },
            reset() {
                console.log("Reset clicked");
                this.userData.salary = null;
                this.userData.state = "AL";
                this.calculateClicked = false;
                this.title = "Enter Opportunity Data Below";
            }
        }
    }
</script>
