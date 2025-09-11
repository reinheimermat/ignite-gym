import type { Checkin, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
  findManyByUserId: (userId: string, page: number) => Promise<Checkin[]>
  findById(id: string): Promise<Checkin | null>
  countByUserId(userId: string): Promise<number>
  save(checkIn: Checkin): Promise<Checkin>
}
