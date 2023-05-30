const { ACCESS_TOKEN, USERAGENT, XFORWARDEDFOR } = require('../src/config/config.default')
const axios = require('axios')

const http = axios.create()

http.interceptors.request.use(config => {

  // config.headers.Authorization = 'Bearer ' + ACCESS_TOKEN

  // console.log(config.headers.Authorization)

  config.headers['User-Agent'] = USERAGENT
  config.headers['X-Forwarded-For'] = XFORWARDEDFOR
  return config
},
  error => {
    // console.log(error)
    return Promise.reject(error)
  }
)

http.interceptors.response.use(res => {
  return res
},
  error => {
    // console.log(error)
    return Promise.reject(error)
  }
)

// console.log(http)

module.exports = http
