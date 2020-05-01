const HomeController = require('./controller/Home')

async function routes(server) {
  server.get('/', HomeController.home)
}

module.exports = routes
