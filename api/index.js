const { GraphQLServer } = require('graphql-yoga')

const locationTypes = [
    {
        id: 1,
        name: "Farmer's Markets"
    },
    {
        id: 2,
        name: "CSA Dropoffs"
    },
    {
        id: 3,
        name: "Farm Stands"
    },
    {
        id: 4,
        name: "Food Hubs"
    }
]

const typeDefs = `
    type Query {
        locationType(locationTypeId: Int!): LocationType 
        allLocationTypes: [LocationType!]!
    }
    type LocationType {
        id: Int
        name: String
    }
    type Mutation {
        addLocationType(name: String!): LocationType
    }
`

const resolvers = {
  Query: {
    locationType: (_, { locationTypeId }, context, info) => {
      return locationTypes.filter(
        (locationType) => locationType.id === locationTypeId
      )[0];
    },
    allLocationTypes: (_, args, contect, info) => {
      return locationTypes;
    },
  },
  Mutation: {
    addLocationType: (_, { name }, context, info) => {
      const newLocationType = {
        id: 5,
        name,
      };
      locationTypes.push(newLocationType);
      return newLocationType;
    },
  },
};

const server = new GraphQLServer({typeDefs, resolvers})
server.start(() => console.log('Server is running on localhost:4000'))