<template>
  <div id="app">
    <b-container>

      <b-row>
        <b-col>
        <b-button block v-b-toggle.collapse-1 variant="primary" class="mb-1 mt-1">
          <b-icon-chevron-bar-expand></b-icon-chevron-bar-expand>
          Greener Pastures - Find Your Best Opportunity!
        </b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card class="mb-1">
            <p class="card-text">
              Welcome to Greener Pastures!
            </p>
            <p>
              This app is designed to help you calculate actual compensation for a job based on taxes and cost of living.  It will
              allow you compare opportunities in different locations.
            </p>
            <p>
              To use:
              Enter your different job opportunities below.  Click calculate to determine what your after tax pay
              is worth in that location.  Compare multiple opportunities.
            </p>
          </b-card>
        </b-collapse>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button block variant="success" @click="addOpportunity"><b-icon-plus></b-icon-plus>Add Another Opportunity</b-button><br/><br/>
        </b-col>
      </b-row>

      <b-row>
      <b-card-group deck>
        <OpportunityForm v-for="(opportunity, index) in this.opportunities"
                         v-bind:opportunity="opportunity"
                         v-bind:index="index"
                         v-bind:key="opportunity.id"
                         v-bind:best="opportunity.best"
                         v-on:deleteOpportunity="deleteOpportunity(index)"
                         v-on:update-adj-pay-to-app="updateOpportunityList(index, $event)"
        ></OpportunityForm>
      </b-card-group><br/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import OpportunityForm from './components/OpportunityForm.vue'
export default {
  name: 'App',
  components: {
    OpportunityForm
  },
  data() {
    return {
      opportunities: [
        {id: 1, adjPay: null, best: false}
      ],
      idCount: 1
    }
  },
  methods: {
    addOpportunity() {
      if (this.opportunities.length < 5) {
        this.idCount++;
        this.opportunities.push({id: this.idCount, adjPay: null, best: false})
        } else {
        alert("Limit to 5 opportunities")
      }
      this.bestOpportunity();
    },
    deleteOpportunity(index) {
      if (this.opportunities.length > 1) {
        this.opportunities.splice(index, 1);
      } else {
        alert("Must have at least one opportunity")
      }
      this.bestOpportunity();
    },
    updateOpportunityList(index, event) {
      this.opportunities[index].adjPay = event;
      this.bestOpportunity();
    },
    bestOpportunity() {
      let bestIndex = null;
      let highest = 0;

      for (let index = 0; index < this.opportunities.length; index++) {
        if (Number(this.opportunities[index].adjPay) > highest) {
          bestIndex = index;
          highest = this.opportunities[index].adjPay;
        }
      }

      for (let i = 0; i < this.opportunities.length; i++) {
        this.opportunities[i].best = false;
      }

      console.log(this.opportunities);
      this.opportunities[bestIndex].best = true;
      console.log("BEST OPPORTUNITY IS:" + bestIndex);
    }
  }
}
</script>
