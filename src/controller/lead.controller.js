const xlsx = require('xlsx')
let data_dict_field = require('../public/data_dict_field.json')
let data_dictionary = require('../public/data_dictionary.json')
const {
  FIELDNAME,
  FIELDCODE,
  DICTTYPENAME,
  FIELDLENGTH,
  DICTVALUE,
  DICTSOURCE,
  TABLECODE,
  PROJECTCODE,
  FIELDTYPE
} = require('../config/config.default')
const { get_dictionary_list } = require('../handler/13-get_dictionary_list.js')
const { create_dictionary } = require('../handler/12-create_dictionary')
const { add_singleTable_field } = require('../handler/10-add_singleTable_field')
class ImportController {
  async lead(ctx) {
    let { file = '' } = ctx.request.files
    // console.log(file)
    if (file.filepath == undefined) {
      ctx.body = {
        code: -1,
        message: '请上传文件',
        result: ''
      }
      return
    }

    // 字段类型
    const fieldTypeList = [
      { id: 1, fieldType: 'STRING', fieldType_zh_CN: '字符串' },
      { id: 2, fieldType: 'INT', fieldType_zh_CN: '数字' },
      { id: 3, fieldType: 'TIME', fieldType_zh_CN: '时间' },
      { id: 4, fieldType: 'DATE', fieldType_zh_CN: '日期' },
      { id: 5, fieldType: 'DATE_TIME', fieldType_zh_CN: '日期时间' },
      { id: 6, fieldType: 'TEXT', fieldType_zh_CN: '超大文本' }
    ]
    // 是否
    const whetherList = [
      { id: 0, whether: 'false', whether_zh_CN: '否' },
      { id: 1, whether: 'true', whether_zh_CN: '是' }
    ]

    // 读取上传的xlsx文件为工作簿对象
    const workbook = xlsx.read(file.filepath, { type: 'file' })

    // 第一个表格名字
    const sheetName = workbook.SheetNames[0]
    // 第一个表格内容
    const sheet = workbook.Sheets[sheetName]

    // 将表格内容转化为json类型数据
    const dataList = xlsx.utils.sheet_to_json(sheet)

    // 查找json类型表格内容中“字典类型名称”字段
    let dictTypeNameObj = dataList.find(item => item[FIELDNAME] == DICTTYPENAME)
    // 查找json类型表格内容中“字典值”字段
    let dictValue = dataList.find(item => item[FIELDLENGTH] == DICTVALUE)
    // 定义字段数组和字典数组
    let fieldArr = []
    let dictionaryArr = []
    // 如果查找到“字典类型名称”和“字典值”这两个字段，则通过这两个字段分割出“字段数组”和“字典数组”
    if (dictTypeNameObj && dictValue) {
      let fieldIndexEnd = dataList.findIndex(item => item[FIELDNAME] == DICTTYPENAME)

      let dictionaryIndexStart = dataList.findIndex(item => item[FIELDLENGTH] == DICTVALUE)

      fieldArr = dataList.slice(0, fieldIndexEnd)
      dictionaryArr = dataList.slice(dictionaryIndexStart + 1)
    } else {
      fieldArr = dataList
    }

    // 定义异步新增字段函数
    async function processFieldArr(fieldArr) {
      for (let i = 0; i < fieldArr.length; i++) {
        let item = fieldArr[i]
        if (item[DICTSOURCE] != "" && item[DICTSOURCE] != undefined) {
          let data = data_dict_field
          data.field_size = item[FIELDLENGTH]
          data.table_code = TABLECODE
          data.field_name = item[FIELDNAME]
          data.field_code = item[FIELDCODE]
          // data.dict_source = item[DICTSOURCE]
          data.project_code = PROJECTCODE

          let reg = new RegExp(data.field_name + '$')

          let res = await get_dictionary_list()
          console.log(res)
          let dictArr = res.data
          let is_dictionary = dictArr.some(async item1 => {
            if (reg.test(item1.dict_name)) {
              data.dict_source = item1.dict_name
              let res = await add_singleTable_field(data)
              console.log(res)
              return true
            }
          })

          if (!is_dictionary) {
            data_dictionary.dict_code = item[DICTSOURCE]
            data_dictionary.dict_name = item[FIELDNAME]
            data_dictionary.dictionary_instance_table = []
            dictionaryArr.forEach((item2, i) => {
              if (item2[FIELDNAME] == data_dictionary.dict_name) {
                data_dictionary.dictionary_instance_table.push({
                  name: item2[FIELDTYPE],
                  code: item2[FIELDLENGTH],
                  sort: i + 1,
                  text_color: '#000000'
                })
              }
            })
            let res1 = await create_dictionary(data_dictionary)
            let dictId = res1.id[0]
            let res2 = await get_dictionary_list()
            let dictList = res2.data
            let dictSource = dictList.find(item => item.id == dictId).dict_code
            data.dict_source = dictSource
            await add_singleTable_field(data)
          }
        }

      }
    }

    processFieldArr(fieldArr)

    ctx.body = {
      code: 0,
      message: '导入成功',
      result: {
        dataList,
        fieldArr,
        dictionaryArr
      }
    }
  }
}

module.exports = new ImportController()