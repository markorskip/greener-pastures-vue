<template>
    <div class="CalculateTax">
        <br/>
        <div id="taxes">
            Federal Tax: ${{ fedTax }} <br/>
            <span v-if="annual.state.amount > 0">State Tax: ${{ stateTax }} <br/></span>
            Fica Tax: ${{ ficaTax }} <br/>
        </div>
<!--            Taxes as percentage of income: {{ taxPercentage }} <br/>-->
        <i>After Tax Pay is {{ afterTaxPay }} dollars.</i>
    </div>
</template>

<script>
    import {thousandsSeparators} from "currency-thousand-separator";

    export default {
        props: {
            annual: Object,
            salary: Object,
        },
        data() {
            return {
                showStateTax: false
            }
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
            fedTax() {
                return thousandsSeparators(this.annual.federal.amount);
            },
            stateTax() {
                    return thousandsSeparators(this.annual.state.amount);
            },
            ficaTax() {
                return thousandsSeparators(this.annual.fica.amount);
            },
            afterTaxPay() {
                return thousandsSeparators((this.salary - this.totalTax));
            }
        }
    };
</script>

