const { ACCESS_TOKEN } = require('../config/config.default')
// let data_string_field = require('../public/data_string_field.json')
const http = require('../../utils/http')

const add_singleTable_field = (data) => http({
  url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/bis_api_1672197382953`,
  method: 'post',
  data,
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
}).then(res => {
  if (res.data.code == 'SA0000') {
    console.log(res.data.result)
    return res.data.result
  } else {
    console.log(res.data)
    return res.data
  }
}).catch(err => {
  console.log(err)
})

// add_singleTable_field()

module.exports = {
  add_singleTable_field
}