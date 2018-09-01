<template>
  <div class="map">
    <h1>Map Game Demo</h1>
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
    const center = L.latLng(-55.5, 66.5);
    const nw = L.latLng(-6, 0);
    const se = L.latLng(-123, 128);

    const mymap = L.map('mapgameid', {
      center,
      crs: L.CRS.Simple,
      maxBounds: L.latLngBounds(nw, se),
      maxZoom: 7,
      minZoom: 3,
      zoom: 3,
    });

    L.tileLayer(
      'img/{id}/tile_{z}_{x}_{y}.png',
      {
        attribution: 'MapGame Google+ Community',
        id: 'mapgame',
      },
    ).addTo(mymap);
  },
};

</script>
