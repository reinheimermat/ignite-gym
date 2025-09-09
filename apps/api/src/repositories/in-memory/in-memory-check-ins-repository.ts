import { randomUUID } from 'node:crypto'
import type { Checkin, Prisma } from '@prisma/client'
import type { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: Checkin[] = []

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<Checkin | null> {
    const checkOnSameDate = this.items.find((checkIn) => {
      const checkInDate = checkIn.created_at

      return (
        checkIn.user_id === userId &&
        checkInDate.getUTCFullYear() === date.getUTCFullYear() &&
        checkInDate.getUTCMonth() === date.getUTCMonth() &&
        checkInDate.getUTCDate() === date.getUTCDate()
      )
    })

    if (!checkOnSameDate) {
      return null
    }

    return checkOnSameDate
  }

  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
