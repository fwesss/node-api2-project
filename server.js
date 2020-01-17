import express from 'express'
import postsRouter from './posts/posts-router'

const server = express()

server.use(express.json())
server.use('/api/posts', postsRouter)

server.get('/', (_req, res) => res.send('<h2>Welcome</h2>'))

export default server
