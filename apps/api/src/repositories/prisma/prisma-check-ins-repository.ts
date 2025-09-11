import type { Checkin, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'
import type { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = prisma.checkin.create({
      data,
    })

    return checkIn
  }

  findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date').toDate()
    const endOfTheDay = dayjs(date).endOf('date').toDate()

    const checkIn = prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
    })

    return checkIn
  }

  findManyByUserId(userId: string, page: number) {
    const checkIns = prisma.checkin.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return checkIns
  }

  findById(id: string) {
    const checkIn = prisma.checkin.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  countByUserId(userId: string) {
    const count = prisma.checkin.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  save(checkIn: Checkin) {
    const updatedCheckIn = prisma.checkin.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })

    return updatedCheckIn
  }
}
