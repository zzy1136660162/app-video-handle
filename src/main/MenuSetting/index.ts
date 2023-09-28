import { Menu } from 'electron'

export const createMenu = () => {
  // 创建顶级菜单
  const menu = Menu.buildFromTemplate([
    {
      label: '文件',
      submenu: [
        {
          label: '打开csv文件',
          click: () => {
            // 处理打开文件操作
          }
        },
        {
          type: 'separator' // 分隔线
        },
        {
          label: '退出',
          role: 'quit' // 使用角色来处理退出操作（跨平台）
        }
      ]
    }
  ])

  // 将菜单添加到应用程序
  Menu.setApplicationMenu(menu)
}

export default { createMenu }
