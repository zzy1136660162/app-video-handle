import { dialog, IpcMainInvokeEvent } from 'electron'
import path from 'node:path'

export interface HandleOpenFileOptions {
  properties?: Array<
    | 'openFile'
    | 'openDirectory'
    | 'multiSelections'
    | 'showHiddenFiles'
    | 'createDirectory'
    | 'promptToCreate'
    | 'noResolveAliases'
    | 'treatPackageAsDirectory'
    | 'dontAddToRecent'
  >
}

export async function handleFileOpen(_event: IpcMainInvokeEvent, options: HandleOpenFileOptions) {
  console.log(options);
  const { canceled, filePaths } = await dialog.showOpenDialog(options)
  console.log(filePaths)
  if (!canceled) {
    return [filePaths[0], path.basename(filePaths[0])]
  }
  return null
}

export default { handleFileOpen }
