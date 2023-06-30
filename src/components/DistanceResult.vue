<template>
  <div id="result-wrapper">
    <Globe />
    <div id="results-typography">
      <h1>Wynik</h1>
      <p v-if="loading">Ładowanie...</p>
      <p v-else-if="error">Wystąpił błąd: {{ error }}</p>
      <p v-else>Odległość między punktami wynosi:</p>
      <p id="result">
        {{ units === "kilometers" ? distance : distance * 1000 }}
      </p>
      <p id="unit">{{ units === "kilometers" ? "kilometrów" : "metrów" }}</p>
    </div>
    <Globe />
  </div>
</template>

<script>
import Globe from "./Globe.vue";
import { inject } from "vue";

export default {
  name: "DistanceResult",
  props: ["loading", "distance", "error", "units"],
  setup() {
    const units = inject("units", () => {});
    return { units };
  },
  components: { Globe },
};
</script>

<style scoped>
#result-wrapper {
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(0, 0, 0);
  padding: 0 2rem;
  border: 1px solid #ffffff7f;
  border-top: none;
  display: flex;
}

#results-typography {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
}

h1 {
  color: #f6f6f6;
}

p {
  font-size: 1.2rem;
  margin: 0;
}

#result {
  font-weight: bold;
  font-size: 2rem;
  color: #f6f6f6;
  margin-bottom: 0;
  margin: 1.5rem 0;
}

#unit {
  color: #f6f6f6bb;
  margin-bottom: 1.5rem;
}
</style>
