import React from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';

import PostList from '../post/PostList';

import { HomeQuery } from './__generated__/HomeQuery.graphql';

const Home = () => {
  const data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        ...PostList_query
      }
    `,
    {},
  );

  return <PostList query={data} />;
};

export default Home;
