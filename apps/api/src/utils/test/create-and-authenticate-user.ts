import type { FastifyJWT } from '@fastify/jwt'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: 'password123',
  })

  const { token } = authResponse.body as { token: FastifyJWT }

  return {
    token,
  }
}
