const { ACCESS_TOKEN, PROJECTCODE, PID, NAME, PAGECODE } = require('../config/config.default')
let data_son_menu = require('../public/data_son_menu.json')
const http = require('../../utils/http')
data_son_menu.pid = PID
data_son_menu.name = NAME
data_son_menu.page_code = PAGECODE
data_son_menu.project_code = PROJECTCODE

const add_son_menu = () => http({
  url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/bis_api_1668758139293`,
  method: 'post',
  data: data_son_menu,
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
}).then(res => {
  if (res.data.code == 500) {
    console.log(res.data)
    return res.data
  } else {
    let menuList = res.data.result.data.map(item => {
      return {
        pid: item.pid,
        id: item.id,
        name: item.name,
        project_code: item.project_code
      }
    })
    console.log(menuList)
    return menuList
  }
}).catch(err => {
  console.log(err.response.data)
})

add_son_menu()

module.exports = {
  add_son_menu
}