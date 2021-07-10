import { subscriptionWithClientId } from 'graphql-relay-subscription';
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import { GraphQLContext } from '../../../types';

import pubSub, { EVENTS } from '../../../pubSub';

import { CommentConnection } from '../CommentType';
import * as CommentLoader from '../CommentLoader';

interface CommentNewSubscriptionArgs {
  post: string;
}

interface CommentNewSubscriptionPayload {
  postId: string;
  commentId: string;
}

const CommentNewSubscription = subscriptionWithClientId<
  CommentNewSubscriptionPayload,
  GraphQLContext,
  CommentNewSubscriptionArgs
>({
  name: 'CommentNew',
  inputFields: {
    post: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The post Global Id.',
    },
  },
  subscribe: (args) => {
    return pubSub.asyncIterator(`${args.post}${EVENTS.COMMENT.NEW}`);
  },
  outputFields: {
    commentEdge: {
      type: CommentConnection.edgeType,
      resolve: async ({ commentId: id }, _, context) => {
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
  },
});

export default CommentNewSubscription;
