# nPM
- npm i --save graphql express-graphql.
- npm i graphql express lodash express-graphql

**graphql**: Used for creating and defining your GraphQL schema, types, queries, and resolvers. It provides the core functionality needed to build a GraphQL API.

**express-graphql**: A middleware for integrating GraphQL with an Express server. It helps in parsing incoming requests, executing GraphQL queries, and returning the appropriate response.

# GraphQL and REST

- both approaches for building APIs

**REST** is straightforward, easy to cache, and suitable for simple applications.

**GraphQL** offers flexibility, reduces data transfer overhead, and is ideal for complex, real-time applications where the client needs precise control over the data.

Note : 
1. Use post for getting Data.
2. Fetching, prepares and return Data
3. Only Single End Point(Typicaly/Graphql).

> **When to use GraphQL:**

- Applications with complex data relationships where clients need to request nested or specific data.
- When you want to avoid multiple round-trips to the server and reduce bandwidth by fetching only the data that’s needed.
- Real-time applications that require subscriptions for data updates.
- Scenarios where front-end developers need more flexibility in querying the backend.

> **When to use REST API:**

- Simple, CRUD-based applications where each resource can be easily mapped to a specific endpoint.
- Applications that benefit from HTTP caching and require predictable performance.
- Scenarios where the client doesn’t need fine-grained control over the data they receive.

**REST API:**
**Architecture**: REST (Representational State Transfer) is an architectural style that uses standard HTTP methods (GET, POST, PUT, DELETE) to interact with resources. Each resource is identified by a unique URL.

**Fixed Endpoints**: In REST, each endpoint represents a specific resource, and the server determines the shape and size of the response. For example, GET /users/1 might return data about a specific user.
Over-fetching and Under-fetching: Clients often receive more data than needed (over-fetching) or might need to make multiple requests to gather all the required data (under-fetching).

**Versioning**: REST APIs often use versioning (e.g., api/v1/resource) to manage changes over time.
Cacheable: REST responses can be easily cached since each request is generally idempotent.

> **GraphQL**

**Architecture**: GraphQL is a query language for APIs and a runtime for executing those queries by using a type system defined by your data. Clients send a single request to a GraphQL endpoint (usually /graphql), specifying the exact data they need.

**Flexible Queries**: Clients can specify precisely what data they want in their query, reducing over-fetching and under-fetching issues. For example, a query can request only the name and email of a user, rather than the entire user object.
Single Endpoint: Unlike REST, GraphQL uses a single endpoint, and the client defines the structure of the response.

**Real-time Data**: GraphQL natively supports subscriptions, which can be used to push real-time updates to clients.

**Complexity**: GraphQL can be more complex to implement and optimize, especially in large-scale applications where query performance and security need careful consideration.

**No Versioning**: GraphQL APIs are typically version-less since clients can ask for specific fields, making backward compatibility easier to maintain.

# GraphQL Query

- In GraphQL, a query is used to request specific data from the server.

```
{
    query{ //Operation type
**endpoint** ->  user{  // other type for mutation subscription.
            name,
            age  **//Both are Requested Field**
        }
    }
}
```
# What is resolver (operation type is called resolver)

- resolver contaon server side logic.

*Three type of controller*

**Query**: For retrieving data.

**Mutation**: For modifying data.

**Subscription**: For real-time updates.
>  Query
**Purpose**: Fetch data from the server.

**Usage**: Used when you want to retrieve data without making any changes to the server state.
```
query {
  user(id: 1) {
    id
    name
    email
  }
}
```
> Mutation
**Purpose**: Modify data on the server (create, update, delete).

**Usage**: Used when you need to change the server's state, such as creating a new user, updating an existing record, or deleting an item.

```
mutation {
  createUser(input: {name: "John Doe", email: "john.doe@example.com"}) {
    id
    name
    email
  }
}
```
> Subscription
**Purpose**: Receive real-time updates from the server.

**Usage**: Used when you need to subscribe to data changes and receive updates whenever a certain event occurs on the server.

```
subscription {
  messageAdded {
    id
    content
    author {
      name
    }
  }
}
```
**Explanation**: This subscription listens for new messages being added. Whenever a new message is added, the server pushes the messageAdded event to the client, including the message's id, content, and author details.

# Creat Schema

**GraphQLInputObjectType** is essential for defining structured input data for mutations and queries. It allows you to enforce the shape and types of the input that clients must provide, making it easier to validate and process data on the server side. This ensures that operations like creating or updating a blog post are handled with the correct data structure.

> **fragments**

**GraphQL fragments** are a powerful feature that allows you to reuse pieces of query logic in multiple queries, mutations, or subscriptions. By defining a fragment.

```
step -01 
fragment UserFields on User {
  id
  name
  email
}

step -02
query GetUserAndFriends {
  user(id: "1") {
    ...UserFields
    friends {
      ...UserFields
    }
  }
}
```

```
{
    apple : company(id: "1") {
      ...idDuplication
    }
  Google: company(id: "2") {
      ...idDuplication
    }
}
fragment idDuplication on Company {
    id,
    name,
    description
}
```

:::::::::::::::::Mutation::::::::::::

**Mutation** : it can be update,creat,delete records.

> graphql-express and Apollo Server

Both **graphql-express** and **Apollo Server** are libraries used to build GraphQL APIs in Node.js, but they have different approaches and feature sets. Here’s a comparison of the two.

1. **graphql-express (express-graphql)**
express-graphql is a middleware for Express, used to serve a GraphQL API.

```
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,  // Enable GraphiQL UI
}));

app.listen(4000, () => console.log('Server is running on http://localhost:4000/graphql'));
```

2. Apollo Server

Apollo Server is a fully-featured GraphQL server library, designed to work out of the box with more batteries included.

It’s part of the Apollo ecosystem, which offers various features like caching, performance monitoring, and schema federation.

Can be used with or without Express. If you are using Express, you can apply it as middleware, but it also works standalone or with other HTTP frameworks like Koa or Fastify.

```
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// Define your schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });  // Add Apollo middleware to Express

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
```

```
Type Files
type user {
  id: String!
  firstName : String
  age: Int
  company: Company
}

type Company{
  id: String!
  name: String
  employees : [User]
}

RESOLVER FILE
const resolverFunction = {
  Query : {
    users(){
      return users;
    }
  }
}
```
**Which to Choose?**

Use **express-graphql** if you are building a minimal, custom GraphQL server and prefer flexibility or if you are already using Express heavily in your app and want a lightweight GraphQL solution.

Use **Apollo Server** if you want a more feature-rich server with caching, subscriptions, performance monitoring, and other advanced features out of the box.