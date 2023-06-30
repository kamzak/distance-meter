<template>
  <div id="calc-wrapper">
    <div id="video-wrapper">
      <video autoplay loop muted>
        <source src="../assets/globe.mp4" type="video/mp4" />
      </video>
    </div>
    <div id="form-wrapper">
      <h1>Odległość geograficzna</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="latitude1">Szerokość punktu 1: </label>
          <input
            id="latitude1"
            v-model="latitude1"
            type="number"
            step="any"
            min="-90"
            max="90"
            required
          />
        </div>
        <div>
          <label for="longitude1">Długość punktu 1: </label>
          <input
            id="longitude1"
            v-model="longitude1"
            type="number"
            step="any"
            min="-180"
            max="180"
            required
          />
        </div>
        <div>
          <label for="latitude2">Szerokość punktu 2: </label>
          <input
            id="latitude2"
            v-model="latitude2"
            type="number"
            step="any"
            min="-90"
            max="90"
            required
          />
        </div>
        <div>
          <label for="longitude2">Długość punktu 2: </label>
          <input
            id="longitude2"
            v-model="longitude2"
            type="number"
            step="any"
            min="-180"
            max="180"
            required
          />
        </div>
        <div>
          <label for="units">Jednostka: </label>
          <select v-model="units" id="units">
            <option value="meters">Metry</option>
            <option value="kilometers">Kilometry</option>
          </select>
        </div>
        <button type="submit">Oblicz odległość</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DistanceForm",
  data() {
    return {
      latitude1: null,
      longitude1: null,
      latitude2: null,
      longitude2: null,
      units: "meters",
    };
  },
  methods: {
    submitForm() {
      this.$emit("calculate-distance", {
        latitude1: this.latitude1,
        longitude1: this.longitude1,
        latitude2: this.latitude2,
        longitude2: this.longitude2,
        units: this.units,
      });
    },
  },
  emits: ["calculate-distance"],
};
</script>

<style scoped>
#calc-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
}

#video-wrapper {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  max-width: 500px;
  background-color: rgb(8, 28, 44);
  border: 1px solid #ffffff7f;
}

#form-wrapper {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  max-width: 500px;
  background-color: rgb(8, 28, 44);
  border: 1px solid #ffffff7f;
  border-top: none;
}

video {
  width: 100%;
  height: auto;
}

h1 {
  color: #ffffff;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

input {
  width: 200px;
  height: 1.5rem;
  font-size: 1rem;
}

label {
  text-align: right;
  width: 200px;
}

select {
  height: 1.85rem;
  font-size: 1rem;
  width: 208px;
}

button {
  align-self: center;
  padding: 0.5rem 1.5rem;
  font-size: 1.2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

#result {
  font-size: 2rem;
  margin-top: 2rem;
}

@media (max-width: 600px) {
  form div {
    flex-direction: column;
    justify-content: center;
  }

  input {
    width: 100%;
  }

  select {
    width: 100%;
  }

  label {
    text-align: center;
    width: 100%;
  }
}
</style>
