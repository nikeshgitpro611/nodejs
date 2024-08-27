const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const {schema} = require("./grphQlApi/schema");
const graphqlResolver = require("./grphQlApi/resolvers")

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: graphqlResolver,
    graphiql: true
}))

app.listen(4000, () =>
  console.log("Server running on http://localhost:4000/graphql")
);
