<template>
    <div>
        <b-row>
            <b-col>
                <b-card-title>What is my best opportunity?</b-card-title>
            </b-col>

        </b-row>
        <b-row>
            <b-col>
                <b-button variant="success" @click="addOpportunity" class="mb-2"
                ><b-icon-plus></b-icon-plus>Add Another Opportunity</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-card-group deck>
                <OpportunityForm v-for="(opportunity, index) in $store.state.opportunities"
                                 :opp="opportunity"
                                 :key="index"
                                 :index="index"
                                 >
                ></OpportunityForm>
            </b-card-group>
        </b-row>
    </div>

</template>

<script>
    import OpportunityForm from "@/components/bestJob/OpportunityForm";

    export default {
        name: 'calculator',
        components: {
            OpportunityForm
        },
        methods: {
            addOpportunity() {
                this.$store.commit('addOpportunity')
                console.log(this.$store.state.opportunities)
            }
            // bestOpportunity() {
            //     let bestIndex = null;
            //     let highest = 0;
            //
            //     for (let index = 0; index < this.opportunities.length; index++) {
            //         if (Number(this.opportunities[index].adjPay) > highest) {
            //             bestIndex = index;
            //             highest = this.opportunities[index].adjPay;
            //         }
            //     }
            //
            //     for (let i = 0; i < this.opportunities.length; i++) {
            //         this.opportunities[i].best = false;
            //     }
            //
            //     console.log(this.opportunities);
            //     this.opportunities[bestIndex].best = true;
            //     console.log("BEST OPPORTUNITY IS:" + bestIndex);
            // }
        }
    };
</script>
