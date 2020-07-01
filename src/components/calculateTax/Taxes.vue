<template>
    <div class="CalculateTax">
        <b-table-simple striped hover small caption-top responsive>
            <caption>Estimated Income Taxes
                <b-icon-info-circle v-b-popover.click.bottom="'Does not include local, sales, or property taxes'">
                </b-icon-info-circle>
            </caption>
            <b-tbody v-if="showAll">
                <b-tr variant="danger" v-on:click="toggleTaxes" >
                    <b-td><b>
                        <b-icon-chevron-expand></b-icon-chevron-expand>
                        Total Taxes:</b></b-td>
                    <b-td><b>{{ displayTotalTaxes }}</b></b-td>
                </b-tr>
                <b-tr>
                    <b-td>Federal:</b-td>
                    <b-td>{{ fedTax }}</b-td>
                </b-tr>
                <b-tr>
                    <b-td>State:</b-td>
                    <b-td>{{ stateTax }}</b-td>
                </b-tr>
                <b-tr>
                    <b-td>FICA:</b-td>
                    <b-td>{{ ficaTax }}</b-td>
                </b-tr>
                <b-tr variant="primary">
                    <b-td>Income After Taxes:</b-td>
                    <b-td>{{ afterTaxPay }}</b-td>
                </b-tr>
            </b-tbody>

            <b-tbody v-else>
                <b-tr variant="danger" v-on:click="toggleTaxes" >
                    <b-td><b>
                        <b-icon-chevron-expand></b-icon-chevron-expand>
                        Total Taxes:</b></b-td>
                    <b-td><b>{{ displayTotalTaxes }}</b></b-td>
                </b-tr>
                <b-tr variant="primary">
                    <b-td>Income after Taxes:</b-td>
                    <b-td>{{ afterTaxPay }}</b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>


    </div>
</template>

<script>

    import {thousandsSeparators} from "@/utilities/utilities";

    export default {
        props: {
            annual: Object,
            userData: Object,
        },
        data() {
            return {
                salary: this.userData.salary,
                showAll: false
            }
        },
        computed: {
            totalTax() {
                let totalTaxCalc = this.annual.fica.amount + this.annual.federal.amount + this.annual.state.amount;
                this.$emit('update:totalTax',totalTaxCalc);
                return totalTaxCalc;
            },
            displayTotalTaxes() {
              return thousandsSeparators(this.totalTax);
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
        },
        methods: {
            toggleTaxes() {
                this.showAll = !this.showAll;
            }
        }
    };
</script>

