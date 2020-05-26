const { PubSub } = require('apollo-server-koa');

const arr = [{author: 'chin', comment: 'hello'}];
const POST_ADDED = 'POST_ADDED'
const pubsub = new PubSub();
const resolvers = {
  // Subscription: {
  //   postAdded: {
  //     subscribe: () => pubsub.asyncIterator([POST_ADDED]),
  //   },
  // },
  Query: {
    posts(root, args, context) {
      return arr;
    },
  },
  Mutation: {
    addPost(root, args, context) {
      pubsub.publish(POST_ADDED, { postAdded: args });
      arr.push({author: args.author, comment: args.comment})
      return arr.push({author: args.author, comment: args.comment});
    },
  }
}

module.exports = {
  resolvers,
}