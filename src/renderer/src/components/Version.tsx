import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  setup: () => {
    const versions = reactive({ ...window.electron.process.versions })
    const filePath = ref('')
    const HandleClick = async () => {
      filePath.value = await window.api.openFile()
      console.log(filePath.value)
    }
    return () => (
      <ul class="versions">
        <li class="electron-version">Electron v{versions.electron}</li>
        <li class="chrome-version">Chromium v{versions.chrome}</li>
        <li class="node-version">Node v{versions.node}</li>
        <li class="v8-version" onClick={HandleClick}>
          V8 v{versions.v8}{filePath.value}
        </li>
      </ul>
    )
  }
})
