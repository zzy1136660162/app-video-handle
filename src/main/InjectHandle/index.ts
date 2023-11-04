import { ipcMain } from 'electron'
import { handleFileOpen } from '../FileOpen'
import { LoadCSVFile, LoadCSVFileData } from '../LoadCSV'
import { TransformVideoByCSVURL } from '../VideoHandle'

export const InitIpcMain = () => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('loadCSVFile', LoadCSVFile)
  ipcMain.handle('loadCSVFileData', LoadCSVFileData)
  ipcMain.handle('transformVideoByCSVURL', TransformVideoByCSVURL)
}
export default { InitIpcMain }
