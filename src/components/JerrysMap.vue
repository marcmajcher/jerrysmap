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
  background-color: rgba(255, 0, 0, 0);
}
leaflet-grid-label .lng {
  margin-left: 8px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.leaflet-grid-label .lat,
.leaflet-grid-label .lng {
  text-shadow: -2px 0 #ffffff, 0 2px #ffffff, 2px 0 #ffffff, 0 -2px #ffffff;
}

.slider {
  width: 400px;
  margin: 0px auto 40px auto;
}
</style>

<script>
/* globals L */
/* eslint-disable comma-dangle */
import vueSlider from 'vue-slider-component';

export default {
  components: {
    vueSlider
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
        piecewiseLabel: true
      },
      jml: undefined,
      jmlNoFlash: undefined,
    };
  },

  methods: {
    updateMap () {      
      this.jml.options.year = this.year;
      this.jml.redraw();
    }
  },
  mounted () {
    const center = L.latLng([13, 28]);
    const sw = L.latLng([-10, -10]);
    const ne = L.latLng([95, 75]);
    const jmap = L.map('jerrysmap', {
      center,
      crs: L.CRS.Simple,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topleft'
      },
      maxBounds: L.latLngBounds(sw, ne),
      maxZoom: 9,
      minZoom: 3,
      zoom: 5,
    });

    const jmlOptions = {
      attribution: 'Jerry Gretzinger',
      id: 'jerrysmap',
      year: '2013'
    };

    this.jmlNoFlash = L.tileLayer(
      'http://static.majcher.com/jmt/{year}/tile_{z}_{x}_{y}.jpg',
      jmlOptions
    ).addTo(jmap);

    this.jml = L.tileLayer(
      'http://static.majcher.com/jmt/{year}/tile_{z}_{x}_{y}.jpg',
      jmlOptions
    ).addTo(jmap).on('load', () => {
      setTimeout(() => {
        this.jmlNoFlash.options.year = this.jml.options.year;
        this.jmlNoFlash.redraw();
      }, 250);
    });

// L.grid().addTo(jmap);
  }
};
</script>
