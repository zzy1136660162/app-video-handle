import { ipcMain } from 'electron'
import { handleFileOpen } from '../FileOpen'

ipcMain.handle('dialog:openFile', handleFileOpen)
