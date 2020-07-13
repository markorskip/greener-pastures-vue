<template>
    <div>
    <b-table-simple striped hover small caption-top responsive>
        <caption>Details</caption>
        <b-tbody>
            <b-tr>
                <b-td>State:</b-td>
                <b-td>{{ this.inputs.state }}</b-td>
            </b-tr>
            <b-tr>
                <b-td>Salary:</b-td>
                <b-td>{{ displaySalary }}</b-td>
            </b-tr>
            <b-tr>
                <b-td>Filing Status:</b-td>
                <b-td>{{ displayFilingStatus }}</b-td>
            </b-tr>
        </b-tbody>
    </b-table-simple>
    </div>
</template>

<script>
    import {thousandsSeparators} from "@/utilities/formattingUtilities";

    export default {
        props: {
            inputs: Object
        },
        computed: {
            displayFilingStatus() {
                if (this.inputs.filing_status === 'married') return 'Married';
                if (this.inputs.filing_status === 'single') return 'Single';
                if (this.inputs.filing_status === 'head_of_household') return 'Head of Household';
                return null;
            },
            displaySalary() {
                return thousandsSeparators(this.inputs.pay_rate);
            }
        }
    };
</script>
