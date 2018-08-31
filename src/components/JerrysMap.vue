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
    const jmap = L.map('jerrysmap', {
      center: [0,0],
      crs: L.CRS.Simple,
      // maxBounds: L.latLngBounds(nw, se),
      maxZoom: 7,
      minZoom: 3,
      zoom: 3,
      attribution: 'Jerry Gretzinger',
    });

    L.tileLayer(
      'img/{id}/tile_x_{x}_{y}.jpg', {
        id: 'jerrysmap'
      },
    ).addTo(jmap);
  },
};
</script>
