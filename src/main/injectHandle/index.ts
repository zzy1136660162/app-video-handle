import { ipcMain } from 'electron'
import { handleFileOpen } from '../FileOpen'
import { LoadCSVFile, LoadCSVFileData } from '../LoadCSV'

export const InitIpcMain = () => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('loadCSVFile', LoadCSVFile)
  ipcMain.handle('loadCSVFileData', LoadCSVFileData)
}
export default { InitIpcMain }
