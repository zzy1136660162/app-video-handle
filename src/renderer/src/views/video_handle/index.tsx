import { defineComponent, ref } from 'vue'
import styles from './index.module.scss'
import { QFile, QIcon, QInput } from 'quasar'

export default defineComponent({
  props: {},
  emits: [],
  setup: () => {
    const inputFileName = ref('')
    const inputFilePath = ref('')
    const dense = ref(true)

    const SelectFile = async () => {
      const [filePath, fileName] = await window.api.openFile()
      console.log(filePath, fileName);
      const content = await window.api.loadCSVFile(filePath)
      console.log(content)
      inputFileName.value = fileName
      inputFilePath.value = filePath
    }
    return () => (
      <div>
        <div class={styles.container}>
          <div class="q-pa-md">
            <div class="q-gutter-md" style="max-width: 300px">
              <QInput
                onClick={SelectFile}
                dense={dense.value}
                outlined
                v-model={inputFileName.value}
                modelValue={inputFileName.value}
              >
                {{
                  prepend: () => <QIcon name="attach_file" />
                }}
              </QInput>
            </div>
          </div>
          {/*<div>从csv文件中批量读取视频url路径，并且批量生成第n秒视频封面图片</div>*/}
          {/*<div>请选择要添加的csv文件</div>*/}
        </div>
      </div>
    )
  }
})
