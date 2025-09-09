import type { Gym } from '@prisma/client'
import type { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Omit<Gym, 'id'>): Promise<Gym> {
    const gym = {
      id: 'gym-01',
      title: data.title,
      description: data.description || null,
      phone: data.phone || null,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }
}
