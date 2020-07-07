<template>
    <div>

    <b-table-simple striped hover small caption-top responsive>
        <caption>Details</caption>
        <b-tbody>
            <b-tr>
                <b-td>State:</b-td>
                <b-td>{{ this.userData.state }}</b-td>
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
            userData: Object
        },
        data() {
            return {
                items: [
                    { State: this.userData.state, Salary: this.userData.salary, Status: this.userData.filing_status },
                ]
            }
        },
        computed: {
            displayFilingStatus() {
                if (this.userData.filing_status === 'married') return 'Married';
                if (this.userData.filing_status === 'single') return 'Single';
                if (this.userData.filing_status === 'head_of_household') return 'Head of Household';
                return null;
            },
            displaySalary() {
                return thousandsSeparators(this.userData.salary);
            }
        }
    };
</script>
