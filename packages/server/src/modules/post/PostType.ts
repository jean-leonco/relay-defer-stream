import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import faker from 'faker';
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
      resolve: async (post, args, context) => {
        // Emulate a slow query for test purpose
        const randomTimeout = faker.random.number({ min: 750, max: 2500 });
        await new Promise(resolve => setTimeout(resolve, randomTimeout));
        return CommentLoader.loadAll(context, withFilter(args, { post: post._id }));
      },
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
