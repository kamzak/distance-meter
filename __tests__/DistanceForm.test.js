import { shallowMount } from '@vue/test-utils'
import DistanceForm from '@/components/DistanceForm.vue'

describe('DistanceForm.vue', () => {
  it('emits the correct payload on submit', () => {
    const wrapper = shallowMount(DistanceForm)

    // set form data
    wrapper.setData({
      latitude1: 47.3736,
      longitude1: 8.541109,
      latitude2: 42.335321,
      longitude2: -71.023516,
      units: 'meters'
    })

    // simulate form submission
    wrapper.find('form').trigger('submit.prevent')

    // check emitted event
    expect(wrapper.emitted('calculate-distance')).toBeTruthy()
    expect(wrapper.emitted('calculate-distance')[0]).toEqual([
      {
        latitude1: 47.3736,
        longitude1: 8.541109,
        latitude2: 42.335321,
        longitude2: -71.023516,
        units: 'meters'
      }
    ])
  })
})