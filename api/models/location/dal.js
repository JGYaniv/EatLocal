// import { PrismaClient } from '@prisma/client'

// export const locationUpdatedPayload = async id => {
//   const query = PrismaClient().location.findOne({ where: { id } })
//   const location = await query
//   const locationType = await query.locationType
//   return { ...location, locationType }
// }

// export const publishUpdated = async id =>
//   pubsub().publish('LOCATION_UPDATED', await locationUpdatedPayload(id))
