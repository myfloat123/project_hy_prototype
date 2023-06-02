const { ACCESS_TOKEN, SONMENUID, PAGECODE, NAME } = require('../config/config.default')
let data_menu_relevance_singleTable = require('../public/data_menu_relevance_singleTable.json')
const http = require('../../utils/http')

data_menu_relevance_singleTable.data[0].id = SONMENUID
data_menu_relevance_singleTable.data[0].name = NAME
data_menu_relevance_singleTable.data[0].page_code = PAGECODE
const menu_relevance_singleTable = () => http({
  url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/bis_api_1663723695338`,
  method: 'post',
  data: data_menu_relevance_singleTable,
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
}).then(res => {
  console.log(res.data)
}).catch(err => {
  console.log(err)
})



// menu_relevance_singleTable()

module.exports = {
  menu_relevance_singleTable
}