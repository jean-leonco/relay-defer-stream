import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { timestampResolver } from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../../loader/typeRegister';

import { GraphQLContext } from '../../types';

import PostLoader from '../post/PostLoader';
import PostType from '../post/PostType';

import { IComment } from './CommentModel';
import CommentLoader from './CommentLoader';

const CommentType = new GraphQLObjectType<IComment, GraphQLContext>({
  name: 'Comment',
  description: 'Comment data',
  fields: () => ({
    id: globalIdField('Comment'),
    body: {
      type: GraphQLString,
      resolve: (data) => data.body,
    },
    post: {
      type: PostType,
      resolve: (data, _args, context) => PostLoader.load(context, data.post),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(CommentType, CommentLoader.load);

export const CommentConnection = connectionDefinitions({
  name: 'Comment',
  nodeType: CommentType,
});

export default CommentType;
