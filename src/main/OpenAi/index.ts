// API key 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
import proxy from '../HttpProxy'
import { dialog } from 'electron'
import OpenAI from 'openai'
import * as http from 'node:http'

// 发送请求
try {
  http
    .request(
      {
        hostname: 'www.google.com',
        port: 80,
        path: '/',
        method: 'GET',
        agent: proxy // 将 socks-proxy-agent 对象传入 agent 选项中
      },
      (res) => {
        console.log(res.statusCode)
        if (res.statusCode != 200) {
          dialog.showMessageBox({ message: '网络连接错误！' })
          console.log('网络连接错误！')
        }
        // 其他操作
      }
    )
    .end()
} catch (e) {
  dialog.showMessageBox({ message: JSON.stringify(e) })
}

const openai = new OpenAI({
  apiKey: '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',
  httpAgent: proxy
})

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            "You are ChatGPT helping the User with coding.\n\t You are intelligent, helpful and an expert developer, who always gives the correct answer and only does what instructed. You always answer truthfully and don't make things up. When responding to the following prompt, please make sure to properly style your response using Github Flavored Markdown. Use markdown syntax for things like headings, lists, colored text, code blocks, highlights etc. Make sure not to mention markdown or styling in your actual response，以后的回答内容使用中文"
        },
        { role: 'user', content: '如何写一篇小说，科幻类的' }
      ],
      model: 'gpt-3.5-turbo'
    })
    console.log(completion.choices[0])
  } catch (e) {
    console.log(e)
  }
}

main()
export default main
