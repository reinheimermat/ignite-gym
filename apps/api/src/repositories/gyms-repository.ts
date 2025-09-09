import type { Gym } from '@prisma/client'

export interface GymsRepository {
  findById: (id: string) => Promise<Gym | null>
  create: (data: Omit<Gym, 'id'>) => Promise<Gym>
}
