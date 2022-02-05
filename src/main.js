import Vue from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import app from '../src/App.vue';
import VueRouter from "vue-router";


Vue.use(require('vue-script2'))

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueRouter);

const routes = [
  {
    path: '/calculator',
    name: 'Calculator',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "calculator" */ './components/bestJob/BestJobCalculator.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

import Vuex from 'vuex'
import About from "@/components/archive/About";
Vue.use(Vuex);


function newOpportunity() {
  return {
    inputs: {
      state: "AL",
      pay_rate: null,
      filing_status: "single",
    },
    annual: {
      federal: Number,
      state: Number,
      fica: Number,
      totalTax: Number
    },
    stateCostOfLiving: {
      averageRent: Number,
      valueOfADollar: Number,
      initials: String,
      stateName: String,
    },
    calculateClicked: false,
    adjPay: Number,
    best: false  // for displaying attributes within
  }
}

const store = new Vuex.Store({
  state: {
    opportunities: [
     newOpportunity()
    ]
  },
  mutations: {
    addOpportunity(state) {
      if (state.opportunities.length < 5) {
        state.opportunities.push(newOpportunity())
      } else {
        alert ("No more then 5 opportunities");
      }
    },
    deleteOpportunity(state, index) {
      console.log('Delete opportunity with index: ' + index);

      state.opportunities.splice(index, 1);
          },
    updateOpportunityList(state, index, event) {
      state.opportunities[index].adjPay = event;
    },
    updateOpportunity(state, update) {
      console.log("Updating this opportunity")
      console.log(update.data.afterTaxPay);
      state.opportunities[update.index].annual = update.data.annual;
      state.opportunities[update.index].inputs = update.data.inputs;
      state.opportunities[update.index].adjPay = update.data.adjustedPay;
      state.opportunities[update.index].afterTaxPay = update.data.afterTaxPay;
      state.opportunities[update.index].stateCostOfLiving = update.data.stateCostOfLiving;
      state.opportunities[update.index].adjPay = update.data.adjPay;
      console.log(state.opportunities[update.index])
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(app)
}).$mount('#app');
