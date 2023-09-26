import { defineComponent, ref } from 'vue'
import Test from './components/Test'
import { QBtn, QInput } from 'quasar'

export default defineComponent({
  props: {},
  emits: [],
  setup: (props, { slots, emit, expose, attrs }) => {
    const ival = ref('')
    const onChange = () => {
      console.log(ival.value)
    }
    return () => (
      <div>
        11
        <div class="q-pa-md q-gutter-sm">
          <QBtn color="white" text-color="black" label="Standard"></QBtn>
          <QInput onBlur={onChange} v-model={ival.value}></QInput>
        </div>
      </div>
    )
  }
})
