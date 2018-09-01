<template>
  <div id="app">
    <router-view/>
    <div id="nav">
      <router-link to="/">Jerry's Map</router-link> |
      <router-link to="/mapgame">Map Game</router-link>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
