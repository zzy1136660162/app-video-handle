import csvParser from 'csv-parser'
import fsPromise from 'node:fs/promises'
import fs from 'node:fs'
import { IpcMainInvokeEvent } from 'electron'

const maxLines = 5 // 以这个值为例，您可以设置为您希望解析的行数
export const LoadCSVFile = async (_event: IpcMainInvokeEvent, filePath) => {
  const data = await fsPromise.readFile(filePath)
  return data.toString()
}

export const LoadCSVFileData = (_event: IpcMainInvokeEvent, filePath: string) => {
  const readStream = fs.createReadStream(filePath)
  let lineCount = 0
  const resData: any = []
  const parser = csvParser()
  console.log('const maxLines = 5 // 以这个值为例，您可以设置为您希望解析的行数')
  return new Promise((resolve, reject) => {
    const readFinish = () => {
      console.log('读取完成')
      console.log(resData)
      resolve(resData)
    }
    readStream
      .pipe(parser)
      .on('data', (data) => {
        lineCount++
        if (lineCount >= maxLines) {
          readStream.destroy(true) // 如果达到最大行数，销毁读取流以停止解析
        } else {
          resData.push(data)
        }
      })
      .on('end', readFinish)
      .on('close', () => {
        console.log(111)
        readFinish()
      })

      .on('error', (err) => {
        console.log('err')
        reject(err)
      })
  })
}
// LoadCSVFile('C:\\Users\\zhangziyang\\Desktop\\项目文件夹\\nodejs视频取帧\\csv\\v_link.csv')
export default { LoadCSVFile, LoadCSVFileData }
