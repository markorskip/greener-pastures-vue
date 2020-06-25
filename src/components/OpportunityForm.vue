<template>
    <b-card title="Opportunity"
            sub-title="Enter Data Below"
            style="max-width: 20rem">
        <input-form @emitUserData="update($event)" :user-data="this.userData"></input-form>
        <calculate-tax :annual="this.annual" :salary="this.userData.salary" :totalTax.sync="totalTax"></calculate-tax>
        <calculate-c-o-l :total-col="totalCol" @totalCol="totalCol = $event" ></calculate-c-o-l>
        <display :salary="this.userData.salary" :total-tax="this.totalTax" :total-col="this.totalCol" ></display>
        <b-button variant="danger" v-on:click="deleteOpportunity">Delete</b-button>
    </b-card>
</template>

<script>
    import axios from 'axios';
    let authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVlMGNiMzE1MGM1ZDE5MjkxMWQzNDg1MiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU3Nzg5MDU4MX0.-gjctbfrZpR0Hw3C-CavZNEGAl2-890FJSG5TSml3i0'

    import InputForm from "@/components/InputForm/InputForm";
    import CalculateTax from "@/components/CalculateTax/Taxes";
    import CalculateCOL from "@/components/CalculateCOL/CostOfLiving";
    import Display from "@/components/Display/GreenerPastureScore";
    export default {
        name: 'OpportunityForm',
        components: {CalculateCOL, CalculateTax, Display, InputForm },
        data: function () {
            return {
                userData: {
                    state: "KY",
                    salary: 125000,
                    filing_status: "married",
                },
                annual: {
                    federal: {amount: null},
                    state: {amount: 0},
                    fica: {amount: null}
                },
                totalTax: 0,
                totalCol: 0,
                col: 0,
                taxData: null
            }
        },
        computed: {
            totalColCalculation() {
                return this.col;
            }
        },
        methods: {
            update(event) {
                this.userData = event;
                this.calculateTax();
            },
            calculateTax() {
                console.log("Calculating Tax API request");
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
            }
        },
        mounted() {
            console.log("Mounted!");
        }
    }
</script>

<style>


</style>
