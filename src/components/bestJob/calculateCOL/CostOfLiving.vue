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
                <b-td>{{ displayValueOfDollar }}</b-td>
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
    import {thousandsSeparators} from "@/utilities/formattingUtilities";

    export default {
        props: {
            rent: Number,
            valueOfADollar: Number,
            adjustedIncome: Number
        },
        computed: {
            displayAdjustedIncome: function() {
                return thousandsSeparators(this.adjustedIncome);
            },
            displayRent: function() {
                return thousandsSeparators(this.rent);
            },
            displayValueOfDollar() {
                return "$" + this.valueOfADollar;
            }
        }
    };
</script>
