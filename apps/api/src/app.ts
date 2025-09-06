import fastify from 'fastify'
import { ZodError } from 'zod'
import { appRoutes } from './http/routes'
import { fromZodError } from 'zod-validation-error'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: fromZodError(error),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: here we should log the error to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
