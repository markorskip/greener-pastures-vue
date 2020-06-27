<template>
    <div class="CalculateTax">

            <b-table-simple hover small caption-top responsive>
                <caption>Estimated Taxes</caption>
                <b-thead head-variant="dark">
                    <b-tr>
                        <b-th>Federal</b-th>
                        <b-th>State</b-th>
                        <b-th>FICA</b-th>
                        <b-th>Total</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr>
                        <b-td>{{ fedTax }}</b-td>
                        <b-td>{{ stateTax }}</b-td>
                        <b-td>{{ ficaTax }}</b-td>
                        <b-td variant="danger">{{ total }}</b-td>
                    </b-tr>
                </b-tbody>
                <b-tfoot>
                    <b-tr>
                        <b-td colspan="4" variant="secondary" class="text-right">
                            After tax pay is: <b>{{ afterTaxPay }}</b>
                        </b-td>
                    </b-tr>
                </b-tfoot>
            </b-table-simple>

    </div>
</template>

<script>

    import {thousandsSeparators} from "@/utilities";

    export default {
        props: {
            annual: Object,
            userData: Object,
        },
        data() {
            return {
                salary: this.userData.salary
            }
        },
        computed: {
            totalTax() {
                let totalTaxCalc = this.annual.fica.amount + this.annual.federal.amount + this.annual.state.amount;
                this.$emit('update:totalTax',totalTaxCalc);
                return totalTaxCalc;
            },
            total() {
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
        }
    };
</script>

