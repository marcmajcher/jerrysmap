<template>
  <div class="map">
    <h1>Map Game Demo</h1>
    <div id="mapgameid"></div>
  </div>
</template>

<style>
#mapgameid {
  height: 400px;
}
</style>

<script>
export default {
  mounted: () => {
    const mymap = L.map("mapgameid").setView([40.7218, -74], 13);

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken:
          "pk.eyJ1IjoibWFqY2hlciIsImEiOiJjamw0ZGY5NG4yYXhvM3Fxamd0YXhjbXA5In0.RJaLDHr064DigHF4bXGYoA"
      }
    ).addTo(mymap);
  }
}
</script>
