import { GraphQLObjectType } from 'graphql';

import CommentMutations from '../modules/comment/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...CommentMutations,
  }),
});

export default MutationType;
