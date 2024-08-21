# GraphQL and REST

- both approaches for building APIs

**REST** is straightforward, easy to cache, and suitable for simple applications.

**GraphQL** offers flexibility, reduces data transfer overhead, and is ideal for complex, real-time applications where the client needs precise control over the data.

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
