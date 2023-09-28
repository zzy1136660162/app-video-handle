import { LoadCSVFileData } from '../LoadCSV'
import cp from 'child_process'
import fs from 'fs'
import path from 'path'
import http from 'http'
import pathToFfmpeg from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'
console.log(pathToFfmpeg)
ffmpeg.setFfmpegPath(pathToFfmpeg)

const dirPath = './temp'
const fsPromise = fs.promises

class TempFileDirPath {
  #tempFileDir

  constructor(dirPath) {
    this.#tempFileDir = dirPath
  }

  getTempFileDirPath() {
    return this.#tempFileDir
  }

  getTempFilePath(fileName) {
    return path.join(this.#tempFileDir, fileName)
  }
}

const tempFileDirPath = new TempFileDirPath(dirPath)
;(async () => {
  try {
    await fsPromise.access(tempFileDirPath.getTempFileDirPath())
  } catch (e) {
    fsPromise.mkdir(tempFileDirPath.getTempFileDirPath(), { recursive: true })
  }
})()
const HttpRequestDownFilePromise = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = path.basename(url)
      const filePathName = tempFileDirPath.getTempFilePath(fileName)
      http.get(url, (res) => {
        res.pipe(fs.createWriteStream(filePathName)).on('finish', () => {
          resolve(filePathName)
        })
      })
    } catch (error) {
      reject(error)
    }
  })
}
const TransformVideoFileToImage = async (fileName, outPutDir) => {}
const execJpg = (pathFile, saveFilePath) => {
  return new Promise((resolve, reject) => {

    // ffmpeg.
    const bb = `ffmpeg -ss 00:00:05 -t 00:00:06 -i ${pathFile} -an -f image2 -s 640:1136 ${saveFilePath} -y`
    // console.log('当前指令:', bb)
    cp.exec(bb, function (res) {
      // console.log('执行的结果:', JSON.stringify(res))
      console.log(`${saveFilePath} success...`)
      resolve({ success: true })
    })
  })
  //这个指令也能转
  // const aa = `./ffmpeg -i ${pathFile} -y -f image2 -frames 1 ${saveFilePath}`
  // ./ffmpeg -ss 00:00:00 -t 00:00:01 -i f9.mp4 -an -f image2 -s 640:1136 a123.jpeg
}

const TransformVideoByCSVURL = async (csvPath: string, outPutDir: string, urlField) => {
  const dataJson = await LoadCSVFileData(null, csvPath, true)
  const urlList = dataJson.map((s) => s[urlField || 'url' || 'URL'])
  for (let i = 0; i < urlList.length; i++) {
    const localFilePathName = await HttpRequestDownFilePromise(urlList[i])
    await TransformVideoFileToImage(localFilePathName)
    await fsPromise.unlink(localFilePathName)
  }
}

export default {
  HttpRequestDownFilePromise
}
