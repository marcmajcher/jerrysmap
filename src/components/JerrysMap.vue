<template>
  <div class="map">
    <h1>Jerry's Map {{ year }}</h1>
    <div class="slider">
    <vue-slider v-bind="sliderconf" v-model="year" v-on:callback="updateMap()"></vue-slider>
    </div>
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

.slider {
  width: 400px;
  margin: 0px auto 40px auto;
}
</style>

<script>
/* globals L */
import vueSlider from 'vue-slider-component';

export default {
  components: {
    vueSlider,
  },
  data() {
    return {
      year: 2013,
      sliderconf: {
        min: 2013,
        max: 2015,
        lazy: true,
        tooltip: false,
        height: 4,
        dotSize: 14,
        piecewise: true,
        piecewiseLabel: true,
      },
    };
  },
  methods: {
    updateMap: function updateMap() {
      // TK fix the blink
      // https://stackoverflow.com/questions/39102191/how-to-update-redraw-a-grid-layer-without-blinking
      window.jml.options.year = this.year;
      window.jml.redraw();
    },
  },
  mounted: () => {
    const center = L.latLng([13, 28]);
    const sw = L.latLng([-10, -10]);
    const ne = L.latLng([95, 75]);
    const jmap = L.map('jerrysmap', {
      center,
      crs: L.CRS.Simple,
      maxBounds: L.latLngBounds(sw, ne),
      maxZoom: 9,
      minZoom: 3,
      zoom: 5,
    });

    // window.jml = L.tileLayer('img/{id}/{year}/tile_{z}_{x}_{y}.jpg', {
    window.jml = L.tileLayer('http://static.majcher.com/jmt/{year}/tile_{z}_{x}_{y}.jpg', {
      attribution: 'Jerry Gretzinger',
      id: 'jerrysmap',
      year: '2013',
    }).addTo(jmap);
    // L.grid().addTo(jmap);
  },
};
</script>
