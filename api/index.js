import { GraphQLServer } from 'graphql-yoga'
import { schema } from './models/schema'
import { PrismaClient } from '@prisma/client'

export const server = new GraphQLServer({
  schema,
  context: () => ({ prisma: PrismaClient() })
})

export default server.express