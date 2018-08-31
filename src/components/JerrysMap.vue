<template>
  <div class="map">
    <h1>Map Demo</h1>
    <div id="jerrysmap"></div>
  </div>
</template>

<style>
#jerrysmap {
  height: 800px;
}
</style>

<script>
/* globals L */

export default {
  mounted: () => {
    const mymap = L.map('jerrysmap').setView([0, 0], 3);
    L.tileLayer(
      // 'img/mapgame/tile_{z}_{x}_{y}.png',
      'img/{id}/tile_x_{x}_{y}.jpg',
      {
        attribution:
          'Jerry Gretzinger',
        maxZoom: 7,
        minZoom: 2,
        id: 'jerrysmap',
      },
    ).addTo(mymap);
  },
};
</script>
