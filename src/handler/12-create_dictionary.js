const { ACCESS_TOKEN } = require('../config/config.default')
// let data_dictionary = require('../public/data_dictionary.json')
const http = require('../../utils/http')

const create_dictionary = (data) => http({
  url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/1580830654583681024_insert_1665769686522`,
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

// create_dictionary(data_dictionary)

module.exports = {
  create_dictionary
}