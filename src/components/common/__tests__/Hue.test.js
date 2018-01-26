import { mount, shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'
import randomInt from 'random-int'

import Hue from '../Hue'

describe('Hue.vue', () => {
  test('renders correctly', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Hue)
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  test('has the right class in vertical mode', () => {
    const wrapper = mount(Hue, {
      propsData: {
        direction: 'vertical'
      }
    })
    expect(wrapper.classes()).toContain('vc-hue--vertical')
  })

  test('should not exceed min and max', () => {
    const wrapper = mount(Hue, {
      propsData: {
        direction: 'vertical',
        color: {
          h: 0,
          s: randomInt(100),
          l: randomInt(100)
        }
      }
    })
    const pointer = wrapper.find('.vc-hue-pointer')

    expect(pointer.hasStyle('bottom', '0%')).toBe(true)

    wrapper.setProps({
      direction: 'horizontal',
      color: {
        h: 360,
        s: randomInt(100),
        l: randomInt(100)
      }
    })

    expect(pointer.hasStyle('left', '0%')).toBe(true)
  })

  test('drag', () => {
    const wrapper = mount(Hue)
    wrapper.setData({ containerSize: 100 })

    /* --- 触发顺序 -- */
    /* PC 拖拽:  mousedown(handleMouseDown) -> onDragStart -> onDragging * n -> onDragEnd */
    /* PC 点击:  mousedown(handleMouseDown) -> onDragStart -> onDragEnd */
    /* mobile 拖拽:  mousedown(handleMouseDown) -> onDragStart -> onDragging * n -> onDragEnd */
    /* mobile 点击:  touchstart(handleMouseDown) -> onDragStart -> onDragEnd */

    // wrapper.vm.handleSliderClick({ clientX: 60, clientY: 0, preventDefault () {} })
    // expect(wrapper.vm.$data._color.hsl.h).toBe(216)

    // wrapper.vm.handleSliderClick({ clientX: 120, clientY: 0, preventDefault () {} })
    // expect(Math.floor(wrapper.vm.$data._color.hsl.h)).toBe(359)

    // wrapper.vm.handleSliderClick({ clientX: 0, clientY: 0, preventDefault () {} })
    // wrapper.vm.onDragging({ clientX: 30, clientY: 0, preventDefault () {} })
    // expect(wrapper.vm.$data._color.hsl.h).toBe(108)
    // // expect(wrapper.vm.startPosition).toBe(0)
    // wrapper.vm.onDragEnd()

    // wrapper.vm.onDragStart({ clientX: 30, clientY: 0, preventDefault () {} })
    // wrapper.vm.onDragging({ clientX: -10, clientY: 0, preventDefault () {} })
    // wrapper.vm.onDragEnd()
    // expect(wrapper.vm.$data._color.hsl.h).toBe(0)
  })

  // test('emit', () => {})
})
