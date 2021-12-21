import { connectionArgs, timestampResolver, withFilter } from '@entria/graphql-mongo-helpers';
import faker from 'faker';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '../../loader/typeRegister';

import { GraphQLContext } from '../../types';

import CommentLoader from '../comment/CommentLoader';
import { CommentConnection } from '../comment/CommentType';

import PostLoader from './PostLoader';
import { IPost } from './PostModel';

const PostType = new GraphQLObjectType<IPost, GraphQLContext>({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: globalIdField('Post'),
    content: {
      type: GraphQLString,
      resolve: (post) => post.content,
    },
    comments: {
      type: new GraphQLNonNull(CommentConnection.connectionType),
      args: connectionArgs,
      resolve: async (post, args, context) => {
        // Emulate a slow query for test purpose
        const randomTimeout = faker.datatype.number({ min: 750, max: 2500 });
        await new Promise((resolve) => setTimeout(resolve, randomTimeout));
        return CommentLoader.loadAll(context, withFilter(args, { post: post._id }));
      },
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(PostType, PostLoader.load);

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});

export default PostType;
