const koa = require('koa');
const koaBody = require('koa-bodyparser');

const { ApolloServer, gql, PubSub } = require('apollo-server-koa');

const PORT = process.env || 4005
const PATH = '/graphql'

const app = new koa();
app.use(koaBody());

const { resolvers } = require('./graphql/resolvers/Query');
// const typeDefs = require('./graphql/graphql-schema');

const typeDefs = `type Query {
	posts: [Post]
}

type Mutation {
	addPost(author: String, comment: String): Post
}

type Post {
	author: String
	comment: String
}`

const httpServer = app.listen({ port: 4005 }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${PATH}`),
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  formatError: (error) => {
    console.log('\n>>>xxxxxxxxxxxxxxxxxxxx ERROR xxxxxxxxxxxxxxxxxx >>> \n');
    console.log(JSON.stringify(error, null, 2));
    console.log('\n>>>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx >>> \n');
    return error;
  },
  formatResponse: (response) => {
    console.log('\n>>>=============== RESPONSE BEGINS ================>>> \n');
    console.log(JSON.stringify(response, null, 2));
    console.log('\n<<<=============== RESPONSE ENDED =================<<< \n');
    return response;
  }
});

server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);