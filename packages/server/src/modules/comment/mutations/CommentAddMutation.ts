import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import {
  errorField,
  getObjectId,
  successField,
} from '@entria/graphql-mongo-helpers';

import * as PostLoader from '../../post/PostLoader';

import { GraphQLContext } from '../../../types';

import CommentModel from '../CommentModel';
import * as CommentLoader from '../CommentLoader';
import { CommentConnection } from '../CommentType';

interface CommentAddMutationArgs {
  post: string;
  body: number;
}

const mutation = mutationWithClientMutationId({
  name: 'CommentAdd',
  inputFields: {
    post: {
      type: GraphQLNonNull(GraphQLID),
    },
    body: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (
    args: CommentAddMutationArgs,
    context: GraphQLContext
  ) => {
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
