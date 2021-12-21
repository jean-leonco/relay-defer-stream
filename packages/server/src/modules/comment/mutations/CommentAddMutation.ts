import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import pubSub, { EVENTS } from '../../../pubSub';
import { GraphQLContext } from '../../../types';

import PostLoader from '../../post/PostLoader';

import CommentLoader from '../CommentLoader';
import CommentModel from '../CommentModel';
import { CommentConnection } from '../CommentType';

interface CommentAddMutationArgs {
  post: string;
  body: number;
}

const mutation = mutationWithClientMutationId({
  name: 'CommentAdd',
  inputFields: {
    post: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The post Global Id.',
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The comment body.',
    },
  },
  mutateAndGetPayload: async (args: CommentAddMutationArgs, context: GraphQLContext) => {
    const objectId = getObjectId(args.post);

    if (!objectId) {
      return {
        success: false,
        error: 'Post not found.',
      };
    }

    const post = await PostLoader.load(context, objectId);

    if (!post) {
      return {
        success: false,
        error: 'Post not found.',
      };
    }

    const comment = await CommentModel.create({
      post: post._id,
      body: args.body,
    });

    await pubSub.publish(`${args.post}${EVENTS.COMMENT.NEW}`, { commentId: comment._id, postId: args.post });

    return {
      id: comment._id,
      success: true,
      error: null,
    };
  },
  outputFields: {
    commentEdge: {
      type: CommentConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const comment = await CommentLoader.load(context, id);

        if (!comment) {
          return null;
        }

        return {
          cursor: toGlobalId('Comment', comment._id),
          node: comment,
        };
      },
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;
