<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import mapboxgl from 'mapbox-gl';
import { type MapLocation } from '@/utils/types';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoianN6LW5pbmUiLCJhIjoiY20yZWc4MGNvMWg1dDJrcXc2cW5jM2diYSJ9.UoEyXwUOhg9MIxXqYTod-A';

const defaultLocation = {
  lng: 12.585646,
  lat: 55.681055,
  bearing: 0,
  pitch: 0,
  zoom: 12,
};

const map = ref();
const location = ref<MapLocation>(defaultLocation);
const mapContainer = useTemplateRef('map-container');

function getLocation() {
  return {
    ...map.value.getCenter(),
    bearing: map.value.getBearing(),
    pitch: map.value.getPitch(),
    zoom: map.value.getZoom(),
  };
}

function updateLocation() {
  location.value = getLocation();
}

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: mapContainer.value as HTMLDivElement,
    style: 'mapbox://styles/jsz-nine/cm2ek9r24004h01pgfiltcedg',
    center: [location.value.lng, location.value.lat],
    zoom: location.value.zoom,
    bearing: location.value.bearing,
    pitch: location.value.pitch,
  });

  map.value.on('move', updateLocation);
  map.value.on('zoom', updateLocation);
  map.value.on('rotate', updateLocation);
  map.value.on('pitch', updateLocation);
});

onUnmounted(() => {
  map.value.remove();
  map.value = null;
});

watch(location, (newVal) => {
  const curr = getLocation();
  if (curr.lng != newVal.lng || curr.lat != newVal.lat)
    map.value.setCenter({ lng: newVal.lng, lat: newVal.lat });
  if (curr.pitch != newVal.pitch) map.value.setPitch(newVal.pitch);
  if (curr.bearing != newVal.bearing) map.value.setBearing(newVal.bearing);
  if (curr.zoom != newVal.zoom) map.value.setZoom(newVal.zoom);
});
</script>

<template>
  <div class="base-text">
    <img
      src="../assets/Nine-Logo-Hvidt.png"
      alt="Nine logo"
      class="nine-logo"
    />
    <div ref="map-container" class="nine-map" />
  </div>
</template>
