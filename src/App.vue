<template>
  <div id="app">
    <b-container>
      <div>
        <b-button block v-b-toggle.collapse-1 variant="primary">Greener Pastures - Find Your Best Opportunity!</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <p class="card-text">
              Welcome to Greener Pastures!
            </p>
            <p>
              This app is designed to help your actual compensation for a job based on taxes and cost of living.  It will
              allow you compare job offers in different locations.
            </p>
            <p>
              To use:
              Enter your different job opportunities below.  Click calculate to determine what your after tax pay
              is worth in that location.  Compare multiple opportunities.
            </p>
          </b-card>
        </b-collapse>
      </div>

      <div id="title">
       <b-button block variant="success" @click="addOpportunity">+ Add Another Opportunity</b-button><br/><br/>
      </div>

      <b-card-group deck>
        <OpportunityForm v-for="(opportunity, index) in this.opportunities"
                         v-bind:opportunity="opportunity"
                         v-bind:index="index"
                         v-bind:key="opportunity.id"
                         v-on:deleteOpportunity="deleteOpportunity(index)"
        ></OpportunityForm>
      </b-card-group><br/>
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
        {id: 1}
      ],
      idCount: 1
    }
  },
  methods: {
    addOpportunity() {
      this.idCount++;
      this.opportunities.push({id: this.idCount})
    },
    deleteOpportunity(index) {
      if (this.opportunities.length > 1) {
        this.opportunities.splice(index, 1);
      } else {
        alert("Must have at least one opportunity")
      }
    }
  }
}
</script>
