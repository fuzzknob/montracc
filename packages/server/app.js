const fastify = require('fastify')

const server = fastify()

server.register(require('./routes'))

const PORT = process.env.PORT || 8000

server.listen(PORT, '0.0.0.0').then(() => {
  console.log(`Started server in http://localhost:${PORT}`)
})
