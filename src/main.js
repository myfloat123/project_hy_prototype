const { APP_PORT } = require('./config/config.default')

const app = require('./app')

// 6. 启动服务器，监听3000端口
app.listen(APP_PORT, () => {
  console.log(`server is running at http://localhost:${APP_PORT}`)
})