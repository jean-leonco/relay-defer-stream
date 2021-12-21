import { connectionArgs } from '@entria/graphql-mongo-helpers';
import { GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { nodeField } from '../loader/typeRegister';

import PostLoader from '../modules/post/PostLoader';
import { PostConnection } from '../modules/post/PostType';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries.',
  fields: () => ({
    node: nodeField,

    posts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      args: connectionArgs,
      resolve: async (_, args, context) => PostLoader.loadAll(context, args),
    },
  }),
});

export default QueryType;
