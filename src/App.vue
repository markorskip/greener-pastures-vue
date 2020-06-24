<template>
  <div id="app">
    <b-card-group deck>
    <OpportunityForm v-for="(opportunity, index) in opportunities"
                     :opportunity="opportunity"
                     :index="index"
                     :key="opportunity.id"
                     v-on:deleteOpportunity="deleteOpportunity(index)"
    ></OpportunityForm>
    </b-card-group>
    <b-button @click="addOpportunity">Add Another Opportunity</b-button>
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
    deleteOpportunity: function(index) {
      if (this.opportunities.length > 1) {
        this.opportunities.splice(index, 1);
      } else {
        alert("Must have at least one opportunity")
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
