import { SocksProxyAgent } from 'socks-proxy-agent'

// 创建一个SOCKS代理代理对象，将代理的地址和端口作为参数传递
const proxy = new SocksProxyAgent('socks://23.236.66.175:38080')
export default proxy
