import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { LoadCSVFileData } from '../main/LoadCSV'
import { HandleOpenFileOptions } from '../main/FileOpen'

// Custom APIs for renderer
const api = {
  openFile: (options: HandleOpenFileOptions, ...args) =>
    ipcRenderer.invoke('dialog:openFile', options, ...args),
  loadCSVFile: (...args) => ipcRenderer.invoke('loadCSVFile', ...args),
  loadCSVFileData: (...args) => ipcRenderer.invoke('loadCSVFileData', ...args)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
