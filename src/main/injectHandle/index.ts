import { ipcMain } from 'electron'
import { handleFileOpen } from '../FileOpen'
import { LoadCSVFile } from '../LoadCSV'

export const InitIpcMain = () => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('loadCSVFile', LoadCSVFile)
}
export default { InitIpcMain }
