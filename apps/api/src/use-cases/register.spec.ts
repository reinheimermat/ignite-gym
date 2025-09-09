import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    const isPasswordHashed = await compare('password123', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john.doe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'password123',
    })

    await expect(
      sut.execute({
        name: 'John Doe',
        email,
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
