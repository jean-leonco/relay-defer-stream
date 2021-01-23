import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
  COMMENT: {
    NEW: 'COMMENT_NEW',
  },
};

const pubSub = new PubSub();

export default pubSub;
