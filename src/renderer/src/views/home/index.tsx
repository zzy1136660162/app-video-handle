import { defineComponent } from 'vue'
import styles from './index.module.scss'

export default defineComponent({
  props: {},
  emits: [],
  setup: () => {
    return () => (
      <div>
        <div class={styles.container}>1</div>
      </div>
    )
  }
})
