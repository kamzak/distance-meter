<template>
  <div id="map-wrapper">
    <div id="map-cords">
      <div>
        <h1>Twoje współrzędne:</h1>
        <p>
          Szerokość geograficzna:
          <span class="cords">{{ coordinates.lat }}</span>
        </p>
        <p>
          Długość geograficzna: <span class="cords">{{ coordinates.lng }}</span>
        </p>
      </div>
      <div>
        <h1>Wybrane współrzędne:</h1>

        <p v-if="!otherPos" id="no-other-cords">
          Wybierz współrzędne geograficzne klikając na mapę lub wpisz koordynaty
          w formularzu
        </p>
        <p v-if="otherPos">
          Szerokość geograficzna:
          <span class="cords">{{ otherPos.lat.toFixed(7) }}</span>
        </p>
        <p v-if="otherPos">
          Długość geograficzna:
          <span class="cords">{{ otherPos.lng.toFixed(7) }}</span>
        </p>
      </div>
    </div>

    <div ref="mapDiv" style="width: 100%; height: 400px" />
  </div>
</template>

<script>
import { onMounted, inject, ref, onUnmounted, computed, watch } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "Map",
  setup(props, { emit }) {
    const coordinates = inject("coordinates", () => {});
    const currPos = computed(() => ({
      lat: coordinates.value.lat,
      lng: coordinates.value.lng,
    }));
    const otherPos = inject("otherPos", () => {});
    const units = inject("units", () => {});
    const locationLoaded = inject("locationLoaded", () => {});

    const apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
    const loader = new Loader({
      apiKey,
    });
    const mapDiv = ref(null);
    let map = ref(null);

    let clickListener = null;

    onMounted(async () => {
      await loader.load();
      map.value = new google.maps.Map(mapDiv.value, {
        center:
          coordinates.value.lat !== 0 && coordinates.value.lng !== 0
            ? coordinates.value
            : currPos.value,
        zoom: 15,
      });

      clickListener = map.value.addListener(
        "click",
        ({ latLng: { lat, lng } }) =>
          (otherPos.value = {
            lat: parseFloat(lat().toFixed(7)),
            lng: parseFloat(lng().toFixed(7)),
          })
      );
    });

    onUnmounted(() => {
      if (clickListener) clickListener.remove();
    });

    let line = null;
    watch([map, currPos, otherPos], () => {
      if (line) line.setMap(null);
      if (map.value && otherPos.value != null)
        line = new google.maps.Polyline({
          path: [currPos.value, otherPos.value],
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map.value,
        });
    });

    watch(
      () => otherPos.value,
      (newVal, oldVal) => {
        console.log("otherPos updated:", newVal);
      }
    );

    watch(
      () => units.value,
      (newVal) => {
        console.log("Units updated:", newVal);
      }
    );

    watch(
      () => locationLoaded.value,
      (newVal) => {
        if (newVal && map.value) {
          map.value.setCenter(currPos.value);
        }
      }
    );

    const haversineDistance = (pos1, pos2) => {
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

      return parseFloat(d * 1.609344).toFixed(2);
    };

    const distance = computed(() =>
      otherPos.value == null
        ? 0
        : haversineDistance(currPos.value, otherPos.value)
    );

    watch(distance, (newVal) => {
      emit("distance-changed", newVal);
    });

    return { coordinates, apiKey, mapDiv, otherPos, currPos, distance, units };
  },
  emits: ["distance-changed"],
};
</script>

<style>
#map-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  max-width: 800px;
  background-color: rgb(8, 28, 44);
  border-top: none;
}

#map-cords {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 1rem;
  padding-top: 0;
  box-sizing: border-box;
  justify-content: space-between;
  gap: 2rem;
}

#map-cords div {
  max-width: 50%;
}

#no-other-cords {
  color: #fffb00;
  font-size: 1.2rem;
  line-height: 2rem;
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
}

.cords {
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
}

@media screen and (max-width: 1200px) {
  #map-wrapper {
    max-width: 100%;
  }
}
</style>
