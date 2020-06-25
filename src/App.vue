<template>
  <div id="app">
    <div id="title">
      <h1>Best Opportunity Calculator</h1>
      <h5>Enter your current and potential opportunities for comparison</h5><br/>
     <b-button variant="success" @click="addOpportunity">+ Add Another Opportunity</b-button><br/><br/>
    </div>
    <b-card-group deck>
      <OpportunityForm v-for="(opportunity, index) in this.opportunities"
                       v-bind:opportunity="opportunity"
                       v-bind:index="index"
                       v-bind:key="opportunity.id"
                       v-on:deleteOpportunity="deleteOpportunity(index)"
      ></OpportunityForm>
    </b-card-group><br/>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  align-content: center;
  color: #2c3e50;
  margin-top: 60px;
  margin:auto;
  position:relative;
  width: 1200px;
}

  #title {
    text-align: center;
  }
</style>
