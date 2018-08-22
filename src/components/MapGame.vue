<template>
  <div class="map">
    <h1>Map Demo</h1>
    <div id="mapgameid"></div>
  </div>
</template>

<style>
#mapgameid {
  height: 600px;
}
</style>

<script>
/* globals L */

export default {
  mounted: () => {
    const mymap = L.map("mapgameid", {
      crs: L.CRS.Simple,
      attributionControl: false
    });
    const bounds = [[0, 0], [1000, 1000]];
    const mapImage = L.imageOverlay("./img/mapgame-map.png", bounds).addTo(
      mymap
    );
    mymap.fitBounds(bounds);

    // L.tileLayer(
    //   'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    //   {
    //     attribution:
    //       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox.streets',
    //     accessToken:
    //       'pk.eyJ1IjoibWFqY2hlciIsImEiOiJjamw0ZGY5NG4yYXhvM3Fxamd0YXhjbXA5In0.RJaLDHr064DigHF4bXGYoA',
    //   },
    // ).addTo(mymap);
  }
};
</script>
