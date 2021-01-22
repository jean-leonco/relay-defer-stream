import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { connectionArgs } from '@entria/graphql-mongo-helpers';

import { nodeField, nodesField } from '../modules/loader/typeRegister';

import { PostConnection } from '../modules/post/PostType';
import * as PostLoader from '../modules/post/PostLoader';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries.',
  fields: () => ({
    id: globalIdField('Query'),
    node: nodeField,
    nodes: nodesField,

    posts: {
      type: GraphQLNonNull(PostConnection.connectionType),
      args: connectionArgs,
      resolve: async (_, args, context) => PostLoader.loadAll(context, args),
    },
  }),
});

export default QueryType;
