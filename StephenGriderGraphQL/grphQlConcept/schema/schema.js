const graphQl = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphQl; // Changed GraphQLInputObjectType to GraphQLObjectType
const _ = require('lodash'); // Corrected the package name

const people = [
  { id: "1", firstName: "Alice", age: 30 },
  { id: "2", firstName: "Bob", age: 25 },
  { id: "3", firstName: "Charlie", age: 35 },
  { id: "4", firstName: "David", age: 28 },
  { id: "5", firstName: "Eve", age: 22 },
];

const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: userType,
      args: { id: { type: GraphQLString } },
      resolve: (parentVal, arg) => {
        return _.find(people, { id: arg.id }); // Corrected to use people instead of users
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery
});
