import { ElectronAPI } from "@electron-toolkit/preload";
import { LoadCSVFileData } from "../main/LoadCSV";
import { HandleOpenFileOptions } from "../main/FileOpen";
import { TransformVideoByCSVURL } from "../main/VideoHandle";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      openFile: (options: HandleOpenFileOptions, ...args) => Promise<any>,
      loadCSVFile: (...args) => Promise<any>,
      loadCSVFileData: (...args) => Promise<any>,
      transformVideoByCSVURL: (csvPath: string, outPutDir: string, urlField: string, ...args) => Promise<any>,
    };
  }
}
