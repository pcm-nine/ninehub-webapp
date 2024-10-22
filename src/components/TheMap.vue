<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import mapboxgl, { Map, MapMouseEvent, type GeoJSONFeature } from 'mapbox-gl';
import { type MapLocation } from '@/utils/types';

mapboxgl.accessToken =
  'pk.eyJ1IjoianN6LW5pbmUiLCJhIjoiY20yZWc4MGNvMWg1dDJrcXc2cW5jM2diYSJ9.UoEyXwUOhg9MIxXqYTod-A';

const mapStyle: string = 'mapbox://styles/jsz-nine/cm2ek9r24004h01pgfiltcedg';

const defaultLocation: MapLocation = {
  lng: 12.585646,
  lat: 55.681055,
  bearing: 0,
  pitch: 0,
  zoom: 12,
};

const mapContainer = useTemplateRef('map-container');
const location = ref<MapLocation>(defaultLocation);
const map = ref<Map | undefined>();

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: mapContainer.value as HTMLDivElement,
    style: mapStyle,
    center: [location.value.lng, location.value.lat],
    zoom: location.value.zoom,
    bearing: location.value.bearing,
    pitch: location.value.pitch,
  });
});

function getLocation(): MapLocation | undefined {
  if (map.value) {
    return {
      ...map.value?.getCenter(),
      bearing: map.value?.getBearing(),
      pitch: map.value?.getPitch(),
      zoom: map.value?.getZoom(),
    };
  }
}

function updateLocation(): void {
  const newLocation: MapLocation | undefined = getLocation();
  if (newLocation) {
    location.value = newLocation;
  }
}

map.value?.on('move', updateLocation);
map.value?.on('zoom', updateLocation);
map.value?.on('rotate', updateLocation);
map.value?.on('pitch', updateLocation);

map.value?.on('click', (event: MapMouseEvent) => {
  console.log(event.point);
  // If the user clicked on one of your markers, get its information.
  const features: GeoJSONFeature[] =
    map.value?.queryRenderedFeatures(event.point, {
      layers: ['YOUR_LAYER_NAME'], // replace with your layer name
    }) ?? [];
  if (!features.length) {
    return;
  }
  const feature = features[0];

  if (map.value) {
    const popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry?.coordinates)
      .setHTML(
        `<h3>${feature.properties?.title}</h3><p>${feature.properties?.description}</p>`
      )
      .addTo(map.value);
    console.log(popup);
  }
});

watch(location, (newVal) => {
  const curr: MapLocation | undefined = getLocation();
  if (curr?.lng != newVal.lng || curr?.lat != newVal.lat)
    map.value?.setCenter({ lng: newVal.lng, lat: newVal.lat });
  if (curr?.pitch != newVal.pitch) map.value?.setPitch(newVal.pitch);
  if (curr?.bearing != newVal.bearing) map.value?.setBearing(newVal.bearing);
  if (curr?.zoom != newVal.zoom) map.value?.setZoom(newVal.zoom);
});
</script>

<template>
  <div class="base-text">
    <img
      src="../assets/Nine-Logo-Hvidt.png"
      alt="Nine logo"
      class="nine-logo"
    />
    <input type="text" class="search-bar" placeholder="Søg" />
    <div ref="map-container" class="nine-map" />
  </div>
</template>

<style src="../node_modules/mapbox-gl/dist/mapbox-gl.css" lang="css"></style>
