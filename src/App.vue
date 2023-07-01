<template>
  <div id="wrapper">
    <div id="cords-wrapper">
      <Map v-if="!loading" @distance-changed="updateDistance" />
      <DistanceForm v-if="!loading" @calculate-distance="getDistance" />
      <DistanceResult
        v-if="distance"
        :distance="distance"
        :loading="loading"
        :error="error"
        :units="units"
      />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import DistanceForm from "./components/DistanceForm.vue";
import DistanceResult from "./components/DistanceResult.vue";
import { ref, provide, computed, onMounted } from "vue";

export default {
  name: "App",
  components: {
    Map,
    DistanceForm,
    DistanceResult,
  },
  setup() {
    const locationLoaded = ref(false);
    const loading = ref(false);
    const coordinates = ref({ lat: 0, lng: 0 });
    const currPos = computed(() => ({
      lat: coordinates.value.lat,
      lng: coordinates.value.lng,
    }));
    const otherPos = ref(null);
    const units = ref("meters");

    provide("units", units);
    provide("coordinates", coordinates);
    provide("currPos", currPos);
    provide("otherPos", otherPos);
    provide("locationLoaded", locationLoaded);

    onMounted(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            coordinates.value.lat = parseFloat(position.coords.latitude);
            coordinates.value.lng = parseFloat(position.coords.longitude);
            locationLoaded.value = true;
            loading.value = false;
          },
          (error) => {
            alert(error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    });

    return { loading, coordinates, otherPos };
  },
  data() {
    return {
      distance: null,
      error: null,
      units: null,
    };
  },

  mounted() {
    document.title = "Kalkulator odległości geograficznej";
  },
  methods: {
    updateDistance(newDistance) {
      this.distance = newDistance;
    },
    getDistance(coordinates) {
      const pos1 = {
        lat: coordinates.latitude1,
        lng: coordinates.longitude1,
      };
      const pos2 = {
        lat: coordinates.latitude2,
        lng: coordinates.longitude2,
      };

      const R = 3958.8; // Radius of the Earth in miles
      const rlat1 = pos1.lat * (Math.PI / 180); // Convert degrees to radians
      const rlat2 = pos2.lat * (Math.PI / 180); // Convert degrees to radians
      const difflat = rlat2 - rlat1; // Radian difference (latitudes)
      const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180); // Radian difference (longitudes)

      const d =
        2 *
        R *
        Math.asin(
          Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
              Math.cos(rlat1) *
                Math.cos(rlat2) *
                Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
          )
        );

      this.distance = parseFloat(d * 1.609344).toFixed(2);
      this.units = coordinates.units;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b8cee3;
  min-height: 100vh;
  height: 100%;
  box-sizing: border-box;
  background-color: #0b0d16;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  background-image: url("./assets/map.png");
  background-blend-mode: soft-light;
}

#wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  border: 1px solid #ffffff7f;
}

#cords-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

h1 {
  color: #bdd2f1;
}

body {
  margin: 0;
}
</style>
