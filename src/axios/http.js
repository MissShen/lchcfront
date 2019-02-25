import axios from 'axios'
// 配置API接口地址
const root = '/'

const service = axios.create({
  baseURL: root,
  withCredentials: false,
  timeout: 50000,
});
export default service
