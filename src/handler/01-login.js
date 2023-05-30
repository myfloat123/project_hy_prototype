const FormData = require('form-data')
const { USERAGENT, XFORWARDEDFOR, USERNAME, PASSWORD } = require('../config/config.default')
// let data_login = require('../public/data_login.json')
const http = require('../../utils/http')
let uname = 'H03566'
let pwd = 'v9fiBquTJhVLiiDDfgDUaA=='
// console.log(Object.prototype.toString.call(pwd))
// console.log(Object.prototype.toString.call(uname))
// let bodyFormData = new FormData(data_login)
let bodyFormData = new FormData()
bodyFormData.append('username', uname)
bodyFormData.append('password', pwd)
bodyFormData.append('client_id', 'client_hy_web')
bodyFormData.append('client_secret', 'hy123456')
bodyFormData.append('lessee_code', 'hy')
bodyFormData.append('app_code', 'generator')
bodyFormData.append('pwd_encryption_type', 2)
bodyFormData.append('client_type', 1)
bodyFormData.append('grant_type', 'password')
bodyFormData.append('scop', 'all')
const login = () => http({
  url: `http://192.168.13.11:6060/login`,
  method: 'post',
  data: bodyFormData,
  headers: {
    'Content-Type': `application/x-www-form-urlencoded`,
    'User-Agent': USERAGENT,
    'X-Forwarded-For': XFORWARDEDFOR
  }

}).then(res => {
  if (res.status == 200) {
    console.log('用户身份认证token:', res.data.access_token)
    return res.data
  }
}).catch(err => {
  // console.log(err.response.data)
  if (JSON.parse(err.response.data.error_description).code == 'A0205') {

    http({
      url: `http://192.168.13.11:6060/verifyCode/sliderCaptcha/generate?loginName=${USERNAME}&lessee_code=hy&app_code=generator`,
      method: 'get',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        'X-Forwarded-For': '1.1.1.1'
      }
    }).then(res => {
      // console.log(res.data)
      // console.log(res.data.result.captcha.backgroundImage)
      console.log(res.data.result.captcha.sliderImage)
    }).catch(err => {
      console.log(err)
    })

  }
})

login()

module.exports = {
  login
}