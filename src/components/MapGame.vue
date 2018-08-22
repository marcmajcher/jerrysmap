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
    // const mymap = L.map("mapgameid", {
    //   crs: L.CRS.Simple,
    //   attributionControl: false
    // });
    // const bounds = [[0, 0], [1000, 1000]];
    // const mapImage = L.imageOverlay("./img/mapgame-map.png", bounds).addTo(
    //   mymap
    // );
    // mymap.fitBounds(bounds);

    const mymap = L.map('mapgameid').setView([0, 0], 0);
    L.tileLayer(
      'img/{id}/{z}_{x}_{y}.png',
      {
        attribution:
          'noisy noise maker',
        maxZoom: 2,
        id: 'noise',
      },
    ).addTo(mymap);
  },
};
</script>
