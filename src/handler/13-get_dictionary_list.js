const http = require('../../utils/http')
const { ACCESS_TOKEN, PROJECTCODE } = require('../config/config.default')

const get_dictionary_list = () => http({
  url: `http://192.168.13.11:7090/hy/saas/hy/generator/api/1580830654583681024_list_1665769698155`,
  method: 'post',
  data: { project_code: PROJECTCODE },
  headers: {
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
}).then(res => {
  if (res.data.code == 'SA0000') {
    // console.log(res.data.result)
    return res.data.result
  } else {
    // console.log(res.data)
    return res.data
  }

}).catch(err => {
  console.log(err)
})

const exec = async () => {
  let res = await get_dictionary_list()
  console.log(res)
}
exec()

module.exports = {
  get_dictionary_list
}