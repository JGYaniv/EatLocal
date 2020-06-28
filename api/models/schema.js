import { nexusPrismaPlugin } from 'nexus-prisma'
import { queryType, mutationType, makeSchema } from '@nexus/schema'
import path from 'path'
import LocationType from './location-type'
import Location from './location'

const Query = queryType({
  definition (t) {
    LocationType.defineQueries(t)
    Location.defineQueries(t)
  }
})

// const Mutation = mutationType({
//   definition (t) {
//     LocationType.defineMutations(t)
//     Location.defineMutations(t)
//   }
// })

export const schema = makeSchema({
  plugins: [nexusPrismaPlugin({ experimentalCRUD: true })],
  types: [Query, ...LocationType.types, ...Location.types],
  outputs: {
    schema: path.resolve(__dirname, '../../../schema.graphql')
  }
})
