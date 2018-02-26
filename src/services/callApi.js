import axios from 'axios'
import { errorMsg } from '@/utils/tools'
// 设置默认响应拦截器
axios.interceptors.response.use(function (response) {
  let data = response.data
  if (data.code !== '200' && data.code !== 200) {
    console.log('请求-------', data)
    if (data.msg !== '') {
      errorMsg(data.msg)
    }

    // 判断用户登录状态并对未登录用户进行对应操作
    if(data.code === '401' || data.code === '1001') {
      setTimeout(function() {
        console.log('跳转到sso')
        // window.location.href = Functions.getSso()
      }, 2000)
    }
    return Promise.reject(data)
  } else {
    return data.result
  }
}, function (error) {
  // 服务端无响应
  console.log('服务端无响应', error)
  errorMsg('数据请求失败')
})

export default axios
