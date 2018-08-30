<template>
  <div class="map">
    <h1>Map Demo</h1>
    <div id="jerrysmap"></div>
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
    const mymap = L.map('jerrysmap').setView([68, -80], 3);
    L.tileLayer(
      'img/{id}/tile_{z}_{x}_{y}.png',
      {
      //  tileSize: L.point(240, 300), 
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
