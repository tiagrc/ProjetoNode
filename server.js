import { fastify } from 'fastify'
// import {DatabaseMemory} from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'


const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()


server.post('/videos', async (request, reply) => {
    const { tittle, description, duration } = request.body


    await database.create({
      tittle,
      description,
      duration,
})
    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.List(search)

    return videos
})

server.put('/videos/:id', (request, reply)=> {
    const videoId = request.params.id
    const { tittle, description, duration } = request.body

    database.update(videoId, {
        tittle,
        description,
        duration,
    })
    return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply )=> {
    const videoId = request.params.id 

    database.delete(videoId)

    return reply.status(204).send()
})
server.listen({
    port: 3333,
})