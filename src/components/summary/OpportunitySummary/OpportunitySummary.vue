<template>
    <div v-show="this.display" class="OpportunitySummary">
        {{ this.opp.userData.salary}} salary located in
        {{ this.opp.userData.state }} generates an adjusted pay of:
        {{ this.opp.adjPay }}
    </div>
</template>

<script>
    export default {
        props: {
            opp: Object
        },
        computed: {
            display() {
                if (this.opp.adjPay > 0) return true;
                return false;
            }
        }
    };
</script>
