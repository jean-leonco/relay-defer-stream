import { GraphQLObjectType } from 'graphql';

import CommentAdd from '../modules/comment/mutations/CommentAddMutation';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    CommentAdd,
  }),
});

export default MutationType;
