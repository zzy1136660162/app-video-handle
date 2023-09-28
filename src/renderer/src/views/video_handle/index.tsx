import { defineComponent, ref } from 'vue'
import styles from './index.module.scss'
import { QBtn, QDrawer, QFile, QIcon, QInput } from "quasar";
import { LoadCSVFileData } from '../../../../main/LoadCSV'

export default defineComponent({
  props: {},
  emits: [],
  setup: () => {
    const inputFileName = ref('')
    const inputFilePath = ref('')
    const dense = ref(true)

    const SelectFile = async () => {
      const [filePath, fileName] = await window.api.openFile()
      try {
        const content = await window.api.loadCSVFileData(filePath)
        console.log(content)
      } catch (e) {
        console.log(e)
      }
      inputFileName.value = fileName
      console.log(inputFileName.value, 'fileName')
      inputFilePath.value = filePath
    }
    const couPutDir = ref('')
    const SelectOutPutFileDir = async () => {
      const [fileDirPath] = await window.api.openFile({ properties: ['openDirectory'] })
      couPutDir.value = fileDirPath
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
              <QBtn onClick={SelectOutPutFileDir} color="primary" style="width: 200px">
                <div class="ellipsis">
                  This is some very long text that is expected to be truncated
                </div>
              </QBtn>
              <div>输出路径：{couPutDir.value}</div>
            </div>
          </div>
          {/*<div>从csv文件中批量读取视频url路径，并且批量生成第n秒视频封面图片</div>*/}
          {/*<div>请选择要添加的csv文件</div>*/}
        </div>
      </div>
    )
  }
})
