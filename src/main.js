import Vue from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueAnalytics from 'vue-analytics'

import app from '../src/App.vue';
import VueRouter from "vue-router";
import Intro from "@/components/intro/Intro";

Vue.use(require('vue-script2'))
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueAnalytics, {
  id: 'UA-37301669-3'
});

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Intro',
    component: Intro
  },
  {
    path: '/calculator',
    name: 'Calculator',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "calculator" */ './components/calculator/Calculator.vue')
  },
  {
    path: '/summary',
    name: 'Summary',
    component: Summary
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

import Vuex from 'vuex'
import Summary from "@/components/summary/Summary";
Vue.use(Vuex)


function newOpportunity() {
  return {
    userData: {
      jobName: null,
      state: "AL",
      salary: null,
      filing_status: "single",
    },
    annual: {
      federal: {amount: null},
      state: {amount: 0},
      fica: {amount: null}
    },
    calculateClicked: false,
    adjPay: null,
    best: false
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
    deleteOpportunity(state, indexToDelete) {
      console.log('Delete opportunity with index: ' + indexToDelete);
      state.opportunities.splice(indexToDelete, 1);
          },
    updateOpportunityList(state, index, event) {
      state.opportunities[index].adjPay = event;
    },
  }
});


new Vue({
  router,
  store,
  render: (h) => h(app)
}).$mount('#app');
