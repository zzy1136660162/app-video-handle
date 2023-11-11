import { computed, defineComponent, ref } from 'vue'
import styles from './index.module.scss'
import { QBtn, QCheckbox, QDrawer, QFile, QIcon, QInput, QRadio, QTable, QTh } from 'quasar'

export default defineComponent({
  props: {},
  emits: [],
  setup: () => {
    const _index_name = '_index'
    const inputFileName = ref('')
    const inputFilePath = ref('')
    const csvContent = ref<any[]>([])
    const selectOutColumName = ref<string>('')
    const csvColums = computed(() =>
      csvContent?.value?.length >= 1
        ? [
            {
              name: _index_name,
              label: '序号',
              field: _index_name
            },
            ...Object.keys(csvContent?.value?.[0])
              .filter((s) => s != _index_name)
              .map((s) => {
                return { name: s, label: s, field: s, align: 'left' /*sortable: true */ }
              })
          ]
        : [{ name: _index_name, label: '序号', field: _index_name, align: 'left' }]
    )
    const dense = ref(true)

    const SelectFile = async () => {
      const [filePath, fileName] = await window.api.openFile()
      try {
        const content = await window.api.loadCSVFileData(filePath)
        csvContent.value = content
        csvContent.value.forEach((s, index) => {
          s._index = index + 1
        })
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
    const TransformVideoByCSVURL = async () => {
      const data = await window.api.transformVideoByCSVURL(
        inputFilePath.value,
        couPutDir.value,
        selectOutColumName.value
      )
      console.log('转换完成')
    }
    const pagination = ref({
      rowsPerPage: 0
    })
    return () => (
      <div>
        <div class={styles.container}>
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <div>1.请选择带视频路径的.csv文件</div>
              <QInput
                label="请选择文件"
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
              <div>2.请选择带视频路径的列</div>
              <QTable
                style="height: 400px"
                flat
                bordered
                rows={csvContent.value}
                columns={csvColums.value}
                // dense={dense.value}
                title="CSV内容预览"
                row-key="index"
                virtual-scroll
                separator={'cell'}
                v-model:pagination={pagination.value}
                rowsPerPageOptions={[0]}
              >
                {{
                  'header-cell': (props) => (
                    <QTh props={props} autoWidth={true}>
                      {props.col.label}
                      <QRadio
                        size={'25px'}
                        v-show={props.col.name != _index_name}
                        modelValue={selectOutColumName.value}
                        v-model={selectOutColumName.value}
                        val={props.col.name}
                      ></QRadio>
                    </QTh>
                  )
                }}
              </QTable>
              <div>
                {selectOutColumName.value
                  ? `已选择导出列：${selectOutColumName.value}`
                  : '未选择导出列'}
              </div>
              <div>3.请选择转换封面图片保存的路径</div>
              <QBtn onClick={SelectOutPutFileDir} color="primary" style="width: 200px">
                <div class="ellipsis">请选择输出路径</div>
              </QBtn>
              <div>输出路径：{couPutDir.value}</div>
              <QBtn onClick={TransformVideoByCSVURL} color="primary" style="width: 200px">
                <div class="ellipsis">生成视频封面图片</div>
              </QBtn>
            </div>
          </div>
          {/*<div>从csv文件中批量读取视频url路径，并且批量生成第n秒视频封面图片</div>*/}
          {/*<div>请选择要添加的csv文件</div>*/}
        </div>
      </div>
    )
  }
})
