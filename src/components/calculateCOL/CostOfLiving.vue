<template>
    <b-table-simple striped hover small caption-top responsive>
        <caption>
            Cost of Living
            <b-icon-info-circle v-b-popover.click.bottom="'Value of a dollar represents how much a dollar is worth in that location.'">
            </b-icon-info-circle>
        </caption>
        <b-tbody>
            <b-tr>
                <b-td>Median Monthly Rent:</b-td>
                <b-td>{{ displayRent }}</b-td>
            </b-tr>
            <b-tr>
                <b-td>Value of a Dollar:</b-td>
                <b-td>${{ multiplier }}</b-td>
            </b-tr>
            <b-tr variant="success">
                <b-td><b>Adjusted Pay:</b></b-td>
                <b-td><b>{{ displayAdjustedIncome }}</b></b-td>
            </b-tr>
        </b-tbody>
    </b-table-simple>
</template>

<script>

    // https://www.patriotsoftware.com/blog/accounting/average-cost-living-by-state/
    import {thousandsSeparators} from "@/utilities/utilities";

    let colMapping = {
        "AL": { dollar: "1.1",  rent: "$998"},
        "AK": { dollar: "0.9", rent: "$1,748"},
        "AZ": { dollar: "1.0", rent: "$1,356"},
        "AR": { dollar: "1.1", rent: "$953"},
        "CA": { dollar: "0.8", rent: "$2,518"},
        "CO": { dollar: "0.97", rent: "$1,927"},
        "CT": { dollar: "0.92", rent: "$1,803"},
        "DE": { dollar: "1.00", rent: "$1,435"},
        "FL": { dollar: "1.00", rent: "$1,590"},
        "GA": { dollar: "1.09", rent: "$1,262"},
        "HI": { dollar: "0.84", rent: "$2,481"},
        "ID": { dollar: "1.08", rent: "$1,238"},
        "IL": { dollar: "1.01", rent: "$1,463"},
        "IN": { dollar: "1.11", rent: "$1,113"},
        "IA": { dollar: "1.11", rent: "$1,057"},
        "KS": { dollar: "1.10", rent: "$1,051"},
        "KY": { dollar: "1.14", rent: "$1,084"},
        "LA": { dollar: "1.11", rent: "$1,245"},
        "ME": { dollar: "1.02", rent: "$1,466"},
        "MD": { dollar: "0.91", rent: "$1,807"},
        "MA": { dollar: "0.93", rent: "$2,252"},
        "MI": { dollar: "1.07", rent: "$1,110"},
        "MN": { dollar: "1.03", rent: "$1,449"},
        "MS": { dollar: "1.16", rent: "$1,055"},
        "MO": { dollar: "1.12", rent: "$1,047"},
        "MT": { dollar: "1.06", rent: "$1,234"},
        "NE": { dollar: "1.10", rent: "$1,253"},
        "NV": { dollar: "1.03", rent: "$1,423"},
        "NH": { dollar: "0.94", rent: "$1,748"},
        "NJ": { dollar: "0.88", rent: "$2,062"},
        "NM": { dollar: "1.07", rent: "$1,200"},
        "NY": { dollar: "0.87", rent: "$2,050"},
        "NC": { dollar: "1.10", rent: "$1,208"},
        "ND": { dollar: "1.09", rent: "$1,290"},
        "OH": { dollar: "1.12", rent: "$1,113"},
        "OK": { dollar: "1.12", rent: "$950"},
        "OR": { dollar: "1.00", rent: "$1,707"},
        "PA": { dollar: "1.02", rent: "$1,242"},
        "RI": { dollar: "1.00", rent: "$1,725"},
        "SC": { dollar: "1.11", rent: "$1,209"},
        "SD": { dollar: "1.13", rent: "$1,213"},
        "TN": { dollar: "1.11", rent: "$1,153"},
        "TX": { dollar: "1.03", rent: "$1,455"},
        "UT": { dollar: "1.03", rent: "$1,526"},
        "VT": { dollar: "0.98", rent: "$1,599"},
        "VA": { dollar: "0.98", rent: "$1,452"},
        "WA": { dollar: "0.95", rent: "$1,838"},
        "WV": { dollar: "1.14", rent: "$888"},
        "WI": { dollar: "1.08", rent: "$1,141"},
        "WY": {dollar: "1.03", rent: "$1,149"},
        "DC": {dollar: "0.84", rent: "$2339"}
        }

    export default {
        props: {
            state: String,
            afterTaxIncome: Number,
        },
        computed: {
            multiplier: function() {
                return colMapping[this.state].dollar;
            },
            calculateAdjustedPay(){
                const adjPay = (this.afterTaxIncome * this.multiplier).toFixed(2);
                this.$emit('update-adj-pay',adjPay);
                return adjPay;
            },
            displayAdjustedIncome: function() {
                const afterTax = this.calculateAdjustedPay;
                if (isNaN(afterTax))  return null;
                else return thousandsSeparators(afterTax);
            },
            displayRent: function() {
                return colMapping[this.state].rent;
            }
        }
    };
</script>
