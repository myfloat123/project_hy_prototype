const { ACCESS_TOKEN } = require('../config/config.default')
const data_menu = require('../public/data_menu.json')
const http = require('../../utils/http')

const add_menu = () => http({
  url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/bis_api_1668758139293`,
  method: 'post',
  data: data_menu,
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
}).then(res => {
  if (res.data.code == 500) {
    console.log(res.data)
    return res.data
  } else {
    console.log(res.data.result)
    return res.data.result
  }
}).catch(err => {
  console.log(err)
})

add_menu()

module.exports = {
  add_menu
}