
import { QInput } from 'quasar'

declare module 'quasar' {
  interface quasar {
    class?: any
    modelValue?: any
    'v-model'?: any
    'v-slots'?: any
  }

  export interface QInput {
    onClick?: any
  }
}
