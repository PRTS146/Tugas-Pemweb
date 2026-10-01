const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const { typeDefs, resolvers } = require('./graphql');

async function createApp() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers, csrfPrevention: false });
  await server.start();

  app.use('/graphql', cors(), express.json(), expressMiddleware(server));
  return app;
}


module.exports = { createApp };