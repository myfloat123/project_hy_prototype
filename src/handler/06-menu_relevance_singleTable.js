const { ACCESS_TOKEN, SONMENUID } = require('../config/config.default')
let data_menu_to_singleTable = require('../public/data_menu_to_singleTable.json')
const http = require('../../utils/http')

data_menu_to_singleTable.data[0].id = SONMENUID
const menu_to_singleTable = () => {
  http({
    url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/bis_api_1663723695338`,
    method: 'post',
    data: data_menu_to_singleTable,
    headers: {
      Authorization: 'Bearer ' + ACCESS_TOKEN
    }
  }).then(res => {
    console.log(res.data)
  }).catch(err => {
    console.log(err)
  })
}

// menu_to_singleTable()

module.exports = {
  menu_to_singleTable
}