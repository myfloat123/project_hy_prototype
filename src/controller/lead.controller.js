class ImportController {
  async lead(ctx) {
    console.log('导入成功')
    ctx.body = {
      code: 0,
      message: '导入成功',
      result: ''
    }
  }
}

module.exports = new ImportController()