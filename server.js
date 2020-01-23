import express from 'express'
import postRouter from './resources/posts/post.router'

const server = express()

server.use(express.json())
server.use('/api/posts', postRouter)

server.get('/', (_req, res) => res.send('<h2>Welcome</h2>'))

export default server
