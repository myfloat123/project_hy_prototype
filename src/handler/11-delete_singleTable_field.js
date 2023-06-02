const { ACCESS_TOKEN } = require('../config/config.default')
let data_delete_field = require('../public/data_delete_field.json')
const http = require('../../utils/http')

const delete_singleTable_field = () => http({
  url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/1556064264110878720_del_1664508993852`,
  method: 'post',
  data: data_delete_field,
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
}).then(res => {
  if (res.data.code == 'SA0000') {
    console.log(`删除字段成功`)
  } else {
    console.log(res.data)
  }
}).catch(err => {
  console.log(err)
})

delete_singleTable_field()

module.exports = {
  delete_singleTable_field
}