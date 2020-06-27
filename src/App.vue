<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
        <b-button block v-b-toggle.collapse-1 variant="primary">
          <b-icon-chevron-bar-expand></b-icon-chevron-bar-expand>
          Greener Pastures - Find Your Best Opportunity!

        </b-button>
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
                         v-on:deleteOpportunity="deleteOpportunity(index)"
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
        {id: 1}
      ],
      idCount: 1
    }
  },
  methods: {
    addOpportunity() {
      if (this.opportunities.length < 5) {
        this.idCount++;
        this.opportunities.push({id: this.idCount})
        } else {
        alert("Limit to 5 opportunities")
      }

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
