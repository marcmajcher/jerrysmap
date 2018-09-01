<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Jerry's Map</router-link> |
      <router-link to="/mapgame">Map Game</router-link>
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
