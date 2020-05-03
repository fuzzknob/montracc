import './libs/env'
import fastify from 'fastify'
import routes from './routes'

const server = fastify()

server.register(routes)

const PORT = process.env.PORT || 8000

server.listen(PORT, '0.0.0.0').then(() => {
  console.log(`Started server in http://localhost:${PORT}`)
})
