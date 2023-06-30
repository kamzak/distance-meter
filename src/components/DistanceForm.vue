<template>
  <div id="calc-wrapper">
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
import { inject, watch, ref, provide } from "vue";

export default {
  name: "DistanceForm",
  setup() {
    const coordinates = inject("coordinates", () => {});
    const currPos = inject("currPos", () => {});
    const otherPos = inject("otherPos", () => {});

    const latitude1 = ref(coordinates.value.lat);
    const longitude1 = ref(coordinates.value.lng);
    const latitude2 = ref(0);
    const longitude2 = ref(0);
    const units = inject('units', () => {});

    watch(currPos, (newVal) => {
      if (newVal) {
        latitude1.value = newVal.lat;
        longitude1.value = newVal.lng;
      }
    });

    watch(otherPos, (newVal) => {
      if (newVal) {
        latitude2.value = parseFloat(newVal.lat);
        longitude2.value = parseFloat(newVal.lng);
      }
    });

    const submitForm = () => {
      // Emit event with current values
      this.$emit("calculate-distance", {
        latitude1: latitude1.value,
        longitude1: longitude1.value,
        latitude2: latitude2.value,
        longitude2: longitude2.value,
        units: units.value,
      });
    };

    return {
      latitude1,
      longitude1,
      latitude2,
      longitude2,
      units,
      submitForm,
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
  width: 100%;
  box-sizing: border-box;
  max-width: 400px;
  background-color: rgb(8, 28, 44);
  border-top: none;
  border-left: 1px solid #ffffff7f;
}

#form-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
  border-top: none;
}

h1 {
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

form > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

input {
  width: 150px;
  height: 1.5rem;
  font-size: 1rem;
}

label {
  text-align: right;
  width: 175px;
}

select {
  height: 1.85rem;
  font-size: 1rem;
  width: 172px;
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

@media screen and (max-width: 1200px) {
  #calc-wrapper {
    max-width: 100%;
  }
}

@media screen and (max-width: 600px) {
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
