<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Map</router-link> |
      <router-link to="/jm">Jerry</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
