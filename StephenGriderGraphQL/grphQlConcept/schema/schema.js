const graphQl = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphQl; // Changed GraphQLInputObjectType to GraphQLObjectType
// const _ = require('lodash'); // Corrected the package name
const axios = require("axios");

const companyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(userType),
      resolve: (parentVal, args) => {
        console.log("parentVal", parentVal);
        //Relation b/w two data(array)
        return axios
          .get(`http://localhost:3000/companies/${parentVal.id}/people`)
          .then((res) => res.data);
      },
    },
  }),
});

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: companyType,
      resolve: (parentValue, args) => {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((res) => res.data);
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: userType,
      args: { id: { type: GraphQLString } },
      resolve: (parentVal, arg) => {
        // return _.find(people, { id: arg.id }); // Corrected to use people instead of users
        return axios
          .get(`http://localhost:3000/people/${arg.id}`)
          .then((resp) => resp.data);
      },
    },
    company: {
      type: companyType,
      args: { id: { type: GraphQLString } },
      resolve: (parentVal, arg) => {
        return axios
          .get(`http://localhost:3000/companies/${arg.id}`)
          .then((res) => res.data);
      },
    },
  },
});

const mutationData = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addUse: {
      type: userType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve: (parentVal, { firstName, age }) => {
        return axios
          .post(`http://localhost:3000/people`, { firstName, age })
          .then((res) => res.data);
      },
    },

    deleteUser: {
      type: userType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: (preVal, { id }) => {
        return axios
          .delete(`http://localhost:3000/people/${id}`)
          .then((res) => res.data);
      },
    },

    editUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve: (parentVal, arg) => {
        return axios
          .patch(`http://localhost:3000/people/${arg.id}`, arg)
          .then((res) => res.data);
      },
    },
    
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: mutationData,
});
