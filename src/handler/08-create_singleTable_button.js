const { ACCESS_TOKEN, PROJECTCODE, FORMCODE, TABLECODE } = require('../config/config.default')
let data_create_singleTable_button = require('../public/data_create_singleTable_button.json')
const http = require('../../utils/http')
data_create_singleTable_button.project_code = PROJECTCODE
for (let i = 0; i < data_create_singleTable_button.data.length; i++) {
  if (i < 2) {
    data_create_singleTable_button.data[i].table_code = FORMCODE
  } else {
    data_create_singleTable_button.data[i].table_code = TABLECODE
  }

}

const create_singleTable_button = () => http({
  url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/bis_api_1672816740264`,
  method: 'post',
  data: data_create_singleTable_button,
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
}).then(res => {
  console.log(res.data)
}).catch(err => {
  console.log(err)
})

// create_singleTable_button()

module.exports = {
  create_singleTable_button
}