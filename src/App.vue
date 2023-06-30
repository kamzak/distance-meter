<template>
  <div id="wrapper">
    <DistanceForm @calculate-distance="getDistance" />
    <DistanceResult
      v-if="distance"
      :distance="distance"
      :loading="loading"
      :error="error"
      :units="units"
    />
  </div>
</template>

<script>
import DistanceForm from "./components/DistanceForm.vue";
import DistanceResult from "./components/DistanceResult.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    DistanceForm,
    DistanceResult,
  },
  data() {
    return {
      distance: null,
      loading: false,
      error: null,
      units: null,
    };
  },
  mounted() {
    document.title = "Kalkulator odległości geograficznej";
  },
  methods: {
   async getDistance(coordinates) {
      const options = {
        method: "GET",
        url: "https://distance-calculator.p.rapidapi.com/distance/simple",
        params: {
          lat_1: coordinates.latitude1,
          long_1: coordinates.longitude1,
          lat_2: coordinates.latitude2,
          long_2: coordinates.longitude2,
          unit: coordinates.units,
          decimal_places: "2",
        },
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.VUE_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.VUE_APP_RAPID_API_HOST,
        },
      };

      try {
        this.loading = true;
        this.error = null;
        await axios
          .request(options)
          .then((response) => {
            this.distance = response.data.distance;
            this.units = response.data.unit;
          })
          .catch((error) => {
            console.log(error);
            this.error = error.response.data.error;
          })
          .finally(() => {
            this.loading = false;
          });
      } catch (error) {
        this.error = error;
      }
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
  flex-direction: column;
  gap: 0;
  align-items: center;
  background-image: url("./assets/map.png");
  background-blend-mode: soft-light;
}

#wrapper {
  display: flex;
  flex-direction: column;
}
body {
  margin: 0;
}
</style>
