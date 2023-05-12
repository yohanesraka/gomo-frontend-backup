<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'BaseMap',
  props: {
    center: {
      type: Object,
      default: () => null,
    },
    zoom: {
      type: Number,
      default: 12,
    },
    pickerMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['lat-lng'],
  data: () => ({
    map: null,
    marker: null,
  }),
  computed: {
    centerMap() {
      return this.center;
    },
  },
  mounted() {
    if (this.centerMap.lat && this.centerMap.lng) this.initMap();
  },
  unMounted() {
    this.resetMap();
  },
  methods: {
    initMap() {
      const icon = L.icon({
        iconUrl: 'data:image/svg+xml;utf-8,<svg aria-hidden="true" focusable="false" data-icon="map-marker-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><g><path fill="blue" d="M192 0C86 0 0 86 0 192c0 77.41 27 99 172.27 309.67a24 24 0 0 0 39.46 0C357 291 384 269.41 384 192 384 86 298 0 192 0zm0 288a96 96 0 1 1 96-96 96 96 0 0 1-96 96z" opacity="0.75"></path><path fill="skyblue" d="M192 256a64 64 0 1 1 64-64 64 64 0 0 1-64 64z" opacity="1/0"></path></g></svg>',
        iconSize: [38, 51],
        iconAnchor: [19, 51],
        popupAnchor: [-3, -76],
      });
      // initial map
      this.map = L.map('map').setView(
        new L.LatLng(this.centerMap.lat, this.centerMap.lng),
        this.zoom,
      );
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      // mark location by gps
      this.marker = L.marker([this.centerMap.lat, this.centerMap.lng], {
        icon,
        draggable: this.pickerMode,
      }).addTo(this.map);
      // Picker
      this.marker.on('dragend', (e) => {
        this.marker = e.target;
        const position = this.marker.getLatLng();
        this.map.panTo(new L.LatLng(position.lat, position.lng));
        this.$emit('lat-lng', this.marker.getLatLng());
      });
    },
    resetMap() {
      this.map.remove();
      this.map = null;
    },
  },
};
</script>

<template>
  <div id="map" style="min-height: 600px; min-width: 500px; height: 100%" class="border rounded">
    <div class="d-flex flex-column align-items-center justify-content-center h-100 w-100 text-danger">
      <p class="display-1"><i class="fas fa-map-location-dot text-danger"></i></p>
      <p class="display-4">Lokasi tidak ditemukan!</p>
    </div>
  </div>
</template>
