<template>
  <div class="map">
    <h1>Map Demo</h1>
    <div id="mapgameid"></div>
  </div>
</template>

<style>
#mapgameid {
  height: 800px;
}
</style>

<script>
/* globals L */

export default {
  mounted: () => {
    const mymap = L.map('mapgameid').setView([68, -80], 3);
    L.tileLayer(
      'img/{id}/tile_{z}_{x}_{y}.png',
      {
        attribution:
          'MapGame Google+ Community',
        maxZoom: 7,
        minZoom: 1,
        id: 'mapgame',
      },
    ).addTo(mymap);
  },
};
</script>
