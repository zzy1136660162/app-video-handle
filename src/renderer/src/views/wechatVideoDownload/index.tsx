import { defineComponent } from 'vue'
import { QBtn, QTable } from 'quasar'

export default defineComponent({
  props: {},
  emits: [],
  setup: (props, { slots, emit, expose, attrs }) => {
    return () => (
      <div>
        <div class="App-inited">
          <QBtn
            className="App-inited-clear"
            // icon={<ClearOutlined />}
            onClick={() => send('e_清空捕获记录')}
          >
            清空
          </QBtn>
          <QTable
            sticky
            dataSource={captureList}
            columns={[
              {
                title: '视频地址（捕获中……）',
                dataIndex: 'url',
                key: 'url',
                render: (value) => value,
                ellipsis: true
              },
              {
                title: '大小',
                dataIndex: 'prettySize',
                key: 'prettySize',
                width: '100px',
                render: (value) => value
              },
              {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '210px',
                render: (_, { url, hdUrl, fixUrl, fullFileName }) => (
                  <div>
                    {fullFileName ? (
                      <Button
                        icon={<EyeOutlined />}
                        type="primary"
                        onClick={() => {
                          shell.openPath(fullFileName)
                        }}
                        size="small"
                        ghost
                      >
                        查看
                      </Button>
                    ) : (
                      <Button
                        icon={<DownloadOutlined />}
                        type="primary"
                        onClick={() => {
                          send({ type: 'e_下载', url: hdUrl || url })
                        }}
                        size="small"
                      >
                        {hdUrl ? '高清' : ''}下载
                      </Button>
                    )}
                    &nbsp; &nbsp;
                    <Button
                      icon={<PlaySquareOutlined />}
                      onClick={() => {
                        send({ type: 'e_预览', url: fixUrl || url })
                      }}
                      size="small"
                    >
                      预览
                    </Button>
                  </div>
                )
              }
            ]}
            pagination={{ position: ['none', 'none'] }}
          ></QTable>
        </div>
      </div>
    )
  }
})
