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

.leaflet-grid-label .lng {
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

      const mymap = L.map('mapgameid', {
      center: [-55.5,66.5],
      crs: L.CRS.Simple,
      maxBounds: L.latLngBounds(L.latLng(-6, 0), L.latLng(-123, 128)),
      maxZoom: 7,
      minZoom: 3,
      zoom: 3,
    });

    L.tileLayer(
      'img/{id}/tile_{z}_{x}_{y}.png',
      {
      //  tileSize: L.point(240, 300), 
        attribution: 'MapGame Google+ Community',
        id: 'mapgame',
      },
    ).addTo(mymap);

    const center = L.latLng(-55.5, 66.5);
    const nw = L.latLng(-6, 0);
    const ne = L.latLng(-6, 128);
    const se = L.latLng(-123, 128);
    const sw = L.latLng(-123, 0);
  }
};

</script>
