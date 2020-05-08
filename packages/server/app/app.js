import './libs/env'
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import routes from './routes'

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(
  cors({
    origin: true,
  }),
)
server.use(routes)

const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  console.log(`Started server in http://localhost:${PORT}`)
})
