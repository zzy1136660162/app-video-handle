import HttpsProxyAgent from 'https-proxy-agent'

const proxy = 'http://127.0.0.1:1080'

const agent = HttpsProxyAgent(proxy)
export default agent
