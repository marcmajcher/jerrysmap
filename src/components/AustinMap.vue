<template>
  <div class="map">
    <h1>Austin Map Demo</h1>
    <div id="austinmap"></div>
  </div>
</template>

<style>
#austinmap {
  height: 800px;
}
</style>

<script>
/* globals L */

export default {
  mounted: () => {
    const austinMap = L.map('austinmap').setView([30.27, -97.74], 13);
    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken:
          'pk.eyJ1IjoibWFqY2hlciIsImEiOiJjamw0ZGY5NG4yYXhvM3Fxamd0YXhjbXA5In0.RJaLDHr064DigHF4bXGYoA',
      },
    ).addTo(austinMap);
  },
};
</script>
