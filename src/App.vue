<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Map</router-link> |
      <router-link to="/austin">Austin</router-link>
    </div>
    <router-view/>
    <footer>Build {{Date.now()}}</footer>
  </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

footer {
  font-size: .1em;
  color: #eee;
}
</style>
