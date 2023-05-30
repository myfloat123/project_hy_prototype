const { ACCESS_TOKEN, DELETE_PAGECODE, PROJECTCODE } = require('../config/config.default')
let data_delete = require('../public/data_delete.json')
const http = require('../../utils/http')
data_delete.page_code_arr.splice(0, 1, DELETE_PAGECODE)
data_delete.project_code = PROJECTCODE

const delete_menu = () => {
  http({
    url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/bis_api_1669197128555`,
    method: 'post',
    data: data_delete,
    headers: {
      Authorization: 'Bearer ' + ACCESS_TOKEN
    }
  }).then(res => {
    if (res.data.code == 'SA0000') {
      console.log(`删除菜单成功 ${data_delete.page_code_arr[0]}`)
    }
  }).catch(err => {
    console.log(err)
  })
}

delete_menu()

module.exports = {
  delete_menu
}