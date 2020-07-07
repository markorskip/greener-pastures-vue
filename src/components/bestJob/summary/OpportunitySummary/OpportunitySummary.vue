<template>
    <div v-show="this.display" class="OpportunitySummary">
        {{ displaySalary }} salary located in
        {{ this.opp.userData.state }} generates an adjusted pay of:
        {{ displayAdjPay}}
    </div>
</template>

<script>
    import {thousandsSeparators} from "@/utilities/formattingUtilities";

    export default {
        props: {
            opp: Object
        },
        computed: {
            display() {
                return this.opp.adjPay > 0;
            },
            displaySalary: function () {
                return thousandsSeparators(this.opp.userData.salary);
            },
            displayAdjPay: function() {
                return thousandsSeparators(this.opp.adjPay);
            }
        }
    };
</script>
