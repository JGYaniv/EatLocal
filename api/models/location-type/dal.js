// import { PrismaClient } from '@prisma/client'

// export const roomUpdatedPayload = async id => {
//   const query = PrismaClient().room.findOne({ where: { id } })
//   const room = await query
//   const clips = await query.clips({ orderBy: { id: 'asc' } })
//   const members = await query.members()
//   return { ...room, clips, members }
// }

// export const publishUpdated = async id =>
//   pubsub().publish('ROOM_UPDATED', await roomUpdatedPayload(id))
