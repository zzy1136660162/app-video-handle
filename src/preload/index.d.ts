import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      openFile: () => Promise<any>,
      loadCSVFile: (args) => Promise<any>,
    };
  }
}
