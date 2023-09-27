import { dialog } from 'electron'
import path from 'node:path'

export async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  console.log(filePaths);
  if (!canceled) {
    return [filePaths[0], path.basename(filePaths[0])]
  }
  return null
}

export default { handleFileOpen }
