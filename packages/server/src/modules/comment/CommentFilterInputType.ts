import { GraphQLID, GraphQLInputObjectType } from 'graphql';

import {
  FILTER_CONDITION_TYPE,
  getObjectId,
} from '@entria/graphql-mongo-helpers';

export const commentFilterMapping = {
  post: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (post: string) => getObjectId(post),
  },
};

const CommentFilterInputType = new GraphQLInputObjectType({
  name: 'CommentFilter',
  description: 'Used to filter comments',
  fields: () => ({
    post: {
      type: GraphQLID,
    },
  }),
});

export default CommentFilterInputType;
