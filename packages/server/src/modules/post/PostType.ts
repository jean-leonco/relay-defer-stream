import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import {
  objectIdResolver,
  timestampResolver,
  connectionDefinitions,
  withFilter,
  connectionArgs,
} from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../loader/typeRegister';

import { GraphQLContext } from '../../types';

import { CommentConnection } from '../comment/CommentType';
import * as CommentLoader from '../comment/CommentLoader';

import { IPost } from './PostModel';
import { load } from './PostLoader';

const PostType = new GraphQLObjectType<IPost, GraphQLContext>({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: globalIdField('Post'),
    ...objectIdResolver,
    content: {
      type: GraphQLString,
      resolve: post => post.content,
    },
    comments: {
      type: GraphQLNonNull(CommentConnection.connectionType),
      args: connectionArgs,
      resolve: async (post, args, context) => CommentLoader.loadAll(context, withFilter(args, { post: post._id })),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(PostType, load);

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});

export default PostType;
