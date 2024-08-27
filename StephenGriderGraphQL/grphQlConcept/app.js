const express = require('express');
const { graphqlHTTP } = require('express-graphql'); // Corrected import
const app = express();
const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4001, () => console.log('Server Connected on port 3001'));
