<template>
    <div class="CalculateTax">
        <br/>
        <div id="taxes">
            FedTax: {{ annual.federal.amount }} <br/>
            StateTax: {{ annual.state.amount }} <br/>
            FicaTax: {{ annual.fica.amount }} <br/>
        </div>
<!--            Taxes as percentage of income: {{ taxPercentage }} <br/>-->
            After Tax Pay is: {{ afterTaxPay }}
    </div>
</template>

<script>
    export default {
        props: {
            annual: Object,
            salary: Number,
        },
        computed: {
            totalTax() {
                let totalTaxCalc = this.annual.fica.amount + this.annual.federal.amount + this.annual.state.amount;
                this.$emit('update:totalTax',totalTaxCalc);
                return totalTaxCalc;
            },
            taxPercentage() {
                return this.totalTax / this.salary;
            },
            afterTaxPay() {
                return this.salary - this.totalTax;
            }
        }
    };
</script>

<style>
    #taxes {
        color: #c82333;
    }
</style>
