<template>
    <div class="CalculateTax">
        <br/>
            FedTax: {{ annual.federal.amount }} <br/>
            StateTax: {{ annual.state.amount }} <br/>
            FicaTax: {{ annual.fica.amount }} <br/>
            Taxes as percentage of income: {{ taxPercentage }} <br/>
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
        }
    };
</script>
