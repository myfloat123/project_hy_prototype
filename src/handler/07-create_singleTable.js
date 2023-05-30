const { ACCESS_TOKEN, PROJECTCODE, FORMCODE, FORMNAME, TABLECODE, TABLENAME, SINGLE_PAGECODE } = require('../config/config.default')
let data_single_table = require('../public/data_single_table.json')
const http = require('../../utils/http')
data_single_table.tablearr[0].table_code = FORMCODE
data_single_table.tablearr[0].table_name = FORMNAME
data_single_table.tablearr[1].table_code = TABLECODE
data_single_table.tablearr[1].table_name = TABLENAME
data_single_table.tablearr.forEach(item => {
  item.project_code = PROJECTCODE
  item.page_code = SINGLE_PAGECODE
})

const single_table = () => http({
  url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/bis_api_1666842970588`,
  method: 'post',
  data: data_single_table,
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
}).then(res => {
  console.log(res.data)
  // if (res.data.code == 500) {
  //   console.log(res.data)
  //   return res.data
  // } else {
  //   let menuList = res.data.result.data.map(item => {
  //     return {
  //       pid: item.pid,
  //       id: item.id,
  //       name: item.name,
  //       project_code: item.project_code
  //     }
  //   })
  //   console.log(menuList)
  //   return menuList
  // }
}).catch(err => {
  console.log(err.response.data)
})

// single_table()

module.exports = {
  single_table
}