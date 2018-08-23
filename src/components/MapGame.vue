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
    const mymap = L.map('mapgameid').setView([50, -70], 3);
    L.tileLayer(
      'img/{id}/tile_{z}_{x}_{y}.png',
      {
       tileSize: L.point(320, 400), 
        attribution:
          'MapGame Google+ Community',
        maxZoom: 7,
        minZoom: 2,
        id: 'mapgame',
      },
    ).addTo(mymap);
  },
};
</script>
