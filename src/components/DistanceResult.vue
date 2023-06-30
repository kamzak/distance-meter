<template>
  <div id="result-wrapper">
    <h1>Wynik</h1>
    <p v-if="loading">Ładowanie...</p>
    <p v-else-if="error">Wystąpił błąd: {{ error }}</p>
    <p v-else>Odległość między punktami wynosi:</p>
    <p id="result">{{ distance }}</p>
    <p id="unit">{{ units === "kilometers" ? "kilometrów" : "metrów" }}</p>
  </div>
</template>

<script>
export default {
  name: "DistanceResult",
  props: ["loading", "distance", "error", "units"],
};
</script>

<style scoped>
#result-wrapper {
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  background-color: rgb(8, 56, 92);
  padding: 0 2rem;
  border: 1px solid #ffffff7f;
  border-top: none;
  margin-bottom: 1rem;
}

h1 {
  color: #f6f6f6;
}

p {
  font-size: 1.2rem;
}

#result {
  font-weight: bold;
  font-size: 2rem;
  color: #f6f6f6;
  margin-bottom: 0;
}

#unit {
  color: #f6f6f6bb;
}
</style>
