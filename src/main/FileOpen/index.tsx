import { dialog } from 'electron'

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({})

  if (!canceled) {
    return filePaths[0]
  }
  return ''
}

export default { handleFileOpen }
