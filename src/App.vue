<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Intro</router-link> |
      <router-link to="/calculator">Calculate Best Job Opportunity</router-link>
      <router-link v-show="false" to="/salaryToSelfEmployedCalculator">Calculate Real Compensation</router-link> |
      <router-link v-show="true" to="/blog">Blog</router-link>
    </div>
    <b-container class="align-items-center">
      <router-view/>
    </b-container>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
