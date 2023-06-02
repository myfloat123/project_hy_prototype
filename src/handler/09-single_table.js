const { menu_relevance_singleTable } = require('./06-menu_relevance_singleTable')
const { create_single_table } = require('./07-create_singleTable')

const { create_singleTable_button } = require('./08-create_singleTable_button')

async function exec() {
  await menu_relevance_singleTable()
  await create_single_table()
  await create_singleTable_button()
}

exec()

module.exports = {
  exec
}