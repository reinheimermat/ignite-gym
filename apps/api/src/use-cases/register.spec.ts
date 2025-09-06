import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      findByEmail: async () => null,
      async create(user) {
        return {
          id: 'user-1',
          name: user.name,
          email: user.email,
          password_hash: user.password_hash,
          created_at: new Date(),
        }
      }
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    const isPasswordHashed = await compare('password123', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })
})
