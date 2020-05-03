import * as HomeController from './controller/Home'

async function routes(server) {
  server.get('/', HomeController.home)
}

export default routes
