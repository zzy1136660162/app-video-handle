import { ElectronAPI } from "@electron-toolkit/preload";
import { LoadCSVFileData } from "../main/LoadCSV";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      openFile: () => Promise<any>,
      loadCSVFile: (args) => Promise<any>,
      loadCSVFileData: (args) => Promise<any>,
    };
  }
}
