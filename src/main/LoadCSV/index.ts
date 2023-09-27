import csvParser from 'csv-parser'
import fsPromise from 'node:fs/promises'
import fs from 'node:fs'
import { IpcMainInvokeEvent } from 'electron'
import csvParser from 'csv-parser'
export const LoadCSVFile = async (_event: IpcMainInvokeEvent, filePath) => {
  console.log(filePath)
  const data = await fsPromise.readFile(filePath)
  console.log(data)
  return data.toString()
}




const parser = csvParser()

let lineCount = 0
const maxLines = 5 // 以这个值为例，您可以设置为您希望解析的行数
export const LoadCSVFileData = async (_event: IpcMainInvokeEvent, filePath) => {
  const readStream = fs.createReadStream(filePath)

}
// LoadCSVFile('C:\\Users\\zhangziyang\\Desktop\\项目文件夹\\nodejs视频取帧\\csv\\v_link.csv')
export default { LoadCSVFile }
