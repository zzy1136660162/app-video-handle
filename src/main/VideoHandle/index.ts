import { LoadCSVFileData } from '../LoadCSV'
import cp from 'child_process'
import fs from 'fs'
import path from 'node:path'
import http from 'node:http'
import https from 'node:https'
import pathToFfmpeg from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'
import { IpcMainInvokeEvent } from 'electron'
import { date } from 'quasar'

ffmpeg.setFfmpegPath(pathToFfmpeg as string)

const tempDirPath = './temp'
const fsPromise = fs.promises

class TempFileDirPath {
  #tempFileDir

  constructor(localDirPath, tempDirPath) {
    this.#tempFileDir = path.join(localDirPath, tempDirPath)
  }

  getTempFileDirPath() {
    return this.#tempFileDir
  }

  getTempFilePath(fileName) {
    return path.join(this.#tempFileDir, fileName)
  }
}

const InitTempFileDir = async (localDirPath: string) => {
  const tempFileDirPath = new TempFileDirPath(localDirPath, tempDirPath)
  try {
    await fsPromise.access(tempFileDirPath.getTempFileDirPath())
  } catch (e) {
    await fsPromise.mkdir(tempFileDirPath.getTempFileDirPath(), { recursive: true })
  }
  return tempFileDirPath
}
const HttpRequestDownFilePromise = (url: string, localDirPath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      InitTempFileDir(localDirPath).then((outPutDir) => {
        const fileName = path.basename(url)
        const filePathName = outPutDir.getTempFilePath(fileName)
        console.log(filePathName)
        const requestUtil = url.indexOf('https://') == 0 ? https : http
        requestUtil.get(url, (res) => {
          res.pipe(fs.createWriteStream(filePathName)).on('finish', () => {
            resolve(filePathName)
          })
        })
      })
    } catch (error) {
      reject(error)
    }
  })
}
const TransformVideoFileToImage = (fileName, outPutDir) => {
  return new Promise((resolve, reject) => {
    console.log('TransformVideoFileToImage', fileName)
    ffmpeg(fileName)
      .setStartTime('00:00:00')
      .duration('00:00:01')
      .noAudio()
      .size('640x1136')
      .addOption('-frames:v', '1')
      .toFormat('image2')
      .output(outPutDir)
      .on('end', () => {
        console.log('Conversion finished.')
        resolve({ success: true })
      })
      .on('error', (err) => {
        console.error('Error:', err)
        reject({ success: false })
      })
      .on('start', (commandLine) => console.error('start:', commandLine))
      .run()
  })
}


export const TransformVideoByCSVURL = async (
  _event: IpcMainInvokeEvent,
  csvPath: string,
  outPutDir: string,
  urlField: string
) => {
  const dataJson = await LoadCSVFileData(null, csvPath, true)
  const urlList = dataJson.map((s) => s[urlField])

  for (let i = 0; i < urlList.length; i++) {
    const localFilePathName = await HttpRequestDownFilePromise(urlList[i], outPutDir)
    await TransformVideoFileToImage(
      localFilePathName,
      path.join(
        outPutDir,
        path.basename(localFilePathName, path.extname(localFilePathName)) + '.png'
      )
    )
    await fsPromise.unlink(localFilePathName)
  }
  return
}

export default {
  HttpRequestDownFilePromise,
  TransformVideoByCSVURL
}
