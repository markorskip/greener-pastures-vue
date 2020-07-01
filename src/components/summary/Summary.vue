<template>
    <div class="summary">
        <b-card>
            <b-card-title>Summary</b-card-title>
                <OpportunitySummary v-for="opportunity in opportunities"
                                    :opp="opportunity"
                                    :key="opportunity.index"></OpportunitySummary>
        </b-card>
    </div>
</template>

<script>
    import OpportunitySummary from "@/components/summary/OpportunitySummary/OpportunitySummary";
    export default {
        components: {OpportunitySummary},
        data: function () {
            return {
                opportunities: this.$store.state.opportunities
            }
        }
    };
</script>
