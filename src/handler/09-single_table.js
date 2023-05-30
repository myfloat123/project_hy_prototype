const { menu_to_singleTable } = require('./06-menu_relevance_singleTable')
const { single_table } = require('./07-create_singleTable')

const { create_singleTable_button } = require('./08-create_singleTable_button')

async function exec() {
  await menu_to_singleTable()
  await single_table()
  await create_singleTable_button()
}

exec()