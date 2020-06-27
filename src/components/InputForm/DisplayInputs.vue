<template>
    <div>

    <b-table-simple hover small caption-top responsive>
        <caption>Input Data</caption>
        <b-thead head-variant="dark">
            <b-tr>
                <b-th>State</b-th>
                <b-th>Salary</b-th>
                <b-th>Status</b-th>
            </b-tr>
        </b-thead>
        <b-tbody>
            <b-tr>
                <b-td>{{ this.userData.state}}</b-td>
                <b-td>{{ displaySalary}}</b-td>
                <b-td>{{ displayFilingStatus }}</b-td>
            </b-tr>
        </b-tbody>
    </b-table-simple>
    </div>
</template>

<script>
    import {thousandsSeparators} from "@/utilities";

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
