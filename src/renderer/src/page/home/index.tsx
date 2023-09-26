import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  emits: [],
  setup: (props, { slots, emit, expose, attrs }) => {
    return () => <div>1</div>
  }
})
