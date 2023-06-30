import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import axios from "axios";

// create an axios mock
jest.mock("axios");

describe("App.vue", () => {
  // Inspect the raw component options
  it("has data", () => {
    expect(typeof App.data).toBe("function");
  });

  // Evaluate the results of fetching data
  it("makes API request and sets data on form submit", async () => {
    const apiResponse = {
      data: {
        distance: 6016990.39,
        unit: "meters",
      },
    };
    axios.request.mockResolvedValue(apiResponse);

    const wrapper = shallowMount(App);

    await wrapper
      .findComponent({ name: "DistanceForm" })
      .vm.$emit("calculate-distance", {
        latitude1: 47.3736,
        longitude1: 8.541109,
        latitude2: 42.335321,
        longitude2: -71.023516,
        units: "meters",
      });

    // wait for promises to resolve -  once for the axios promise and once for the Vue update cycle
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // check that the API was called with the correct parameters
    expect(axios.request).toHaveBeenCalledWith({
      method: "GET",
      url: "https://distance-calculator.p.rapidapi.com/distance/simple",
      params: {
        lat_1: 47.3736,
        long_1: 8.541109,
        lat_2: 42.335321,
        long_2: -71.023516,
        unit: "meters",
        decimal_places: "2",
      },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.VUE_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.VUE_APP_RAPID_API_HOST,
      },
    });

    // check that the response data was set correctly
    expect(wrapper.vm.distance).toBe(6016990.39);
    expect(wrapper.vm.units).toBe("meters");
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.error).toBe(null);
  });
});
