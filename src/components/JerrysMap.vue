<template>
  <div class="map">
    <h1>Jerry's Map</h1>
    <div id="jerrysmap"></div>
  </div>
</template>

<style>
#jerrysmap {
  height: 800px;
}
.leaflet-container {
    background-color:rgba(255,0,0,0.0);
}
/* .leaflet-tile-loaded {
  border: 1px solid red;
} */
leaflet-grid-label .lng {
  margin-left: 8px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.leaflet-grid-label .lat,
.leaflet-grid-label .lng {
  text-shadow: -2px 0 #FFFFFF, 0 2px #FFFFFF, 2px 0 #FFFFFF, 0 -2px #FFFFFF;
}
</style>

<script>
/* globals L */

export default {
  mounted: () => {
    const center = L.latLng([13, 9]);
    const nw = L.latLng([22.5, 0]);
    const se = L.latLng([0, 18]);
    const jmap = L.map('jerrysmap', {
      center,
      crs: L.CRS.Simple,
      maxBounds: L.latLngBounds(nw, se),
      maxZoom: 9,
      minZoom: 4,
      zoom: 4,
    });

    L.tileLayer('img/{id}/tile_{z}_{x}_{y}.jpg', {
      attribution: 'Jerry Gretzinger',
      id: 'jerrysmap',
    }).addTo(jmap);
    // L.grid().addTo(jmap);
  },
};
</script>
