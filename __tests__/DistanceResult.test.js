import { shallowMount } from '@vue/test-utils'
import DistanceResult from '@/components/DistanceResult.vue'

describe('DistanceResult.vue', () => {
  it('displays loading message when loading', () => {
    const wrapper = shallowMount(DistanceResult, {
      propsData: { loading: true }
    })

    expect(wrapper.text()).toContain('Ładowanie...')
  })

  it('displays error message when error occurs', () => {
    const wrapper = shallowMount(DistanceResult, {
      propsData: { error: 'An error occurred' }
    })

    expect(wrapper.text()).toContain('Wystąpił błąd: An error occurred')
  })

  it('displays distance and unit when not loading and no error', () => {
    const wrapper = shallowMount(DistanceResult, {
      propsData: { 
        loading: false, 
        error: null, 
        distance: 500, 
        units: 'meters' 
      }
    })

    expect(wrapper.text()).toContain('Odległość między punktami wynosi:')
    expect(wrapper.text()).toContain('500')
    expect(wrapper.text()).toContain('metrów')
  })
})
