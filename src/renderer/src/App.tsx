import { defineComponent } from 'vue'

import { RouterView } from 'vue-router'

export default defineComponent({
  props: {},
  emits: [],
  setup: () => {
    return () => <RouterView></RouterView>
  }
})
