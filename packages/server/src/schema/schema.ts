import { GraphQLSchema, GraphQLDirective, DirectiveLocation, GraphQLBoolean, GraphQLString, GraphQLInt } from 'graphql';

import MutationType from './MutationType';
import QueryType from './QueryType';
import SubscriptionType from './SubscriptionType';

export const GraphQLDeferDirective = new GraphQLDirective({
  name: 'defer',
  description: 'Directs the executor to defer this fragment when the `if` argument is true or undefined.',
  locations: [DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: GraphQLBoolean,
      description: 'Deferred when true or undefined.',
    },
    label: {
      type: GraphQLString,
      description: 'Unique name',
    },
  },
});

export const GraphQLStreamDirective = new GraphQLDirective({
  name: 'stream',
  description: 'Directs the executor to stream plural fields when the `if` argument is true or undefined.',
  locations: [DirectiveLocation.FIELD],
  args: {
    if: {
      type: GraphQLBoolean,
      description: 'Stream when true or undefined.',
    },
    label: {
      type: GraphQLString,
      description: 'Unique name',
    },
    initialCount: {
      defaultValue: 0,
      type: GraphQLInt,
      description: 'Number of items to return immediately',
    },
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
  directives: [GraphQLDeferDirective, GraphQLStreamDirective],
});

export default schema;
