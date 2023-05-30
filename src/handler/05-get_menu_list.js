const { ACCESS_TOKEN, PROJECTCODE } = require('../config/config.default')
// const data_menu = require('../public/data_menu.json')
const http = require('../../utils/http')

const get_menu_list = () => http({
  url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/bis_api_1552706634785107969`,
  method: 'post',
  data: {
    project_code: PROJECTCODE
  },
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
}).then(res => {
  if (res.data.code == 'SA0000') {
    let menuList = res.data.result.data.map(item => {
      return {
        pid: item.pid,
        id: item.id,
        name: item.name,
        project_code: item.project_code,

      }
    })
    console.log(menuList)
    return menuList
  } else {
    console.log(res)
  }
}).catch(err => {
  console.log(err)
})

get_menu_list()

module.exports = {
  get_menu_list
}