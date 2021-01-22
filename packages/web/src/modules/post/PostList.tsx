import React, { useCallback } from 'react';
import { css } from 'styled-components';
import { graphql, usePaginationFragment } from 'react-relay/hooks';

import Flex from '../common/Flex';
import Text from '../common/Text';
import InfiniteScroll from '../common/InfiniteScroll';

import PostCard from './PostCard';
import { PostListPaginationQuery } from './__generated__/PostListPaginationQuery.graphql';
import { PostList_query$key } from './__generated__/PostList_query.graphql';

const containerCss = css`
  width: 100%;
`;

interface PostListProps {
  query: PostList_query$key;
}

const PostList = ({ query }: PostListProps) => {
  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<PostListPaginationQuery, PostList_query$key>(
    graphql`
      fragment PostList_query on Query
        @argumentDefinitions(first: { type: Int, defaultValue: 10 }, after: { type: String })
        @refetchable(queryName: "PostListPaginationQuery") {
        posts(first: $first, after: $after) @connection(key: "PostList_posts") {
          edges {
            node {
              id
              ...PostCard_post
            }
          }
        }
      }
    `,
    query,
  );

  const renderPost = useCallback(({ edge, ref }) => <PostCard key={edge.node.id} query={edge.node} ref={ref} />, []);

  if (!data.posts.edges) {
    return <Text>Unable to fetch posts</Text>;
  }

  return (
    <Flex align="center" css={containerCss}>
      <InfiniteScroll
        data={data.posts.edges as any}
        renderItem={renderPost}
        loadNext={loadNext}
        hasNext={hasNext}
        isLoading={isLoadingNext}
      />
    </Flex>
  );
};

export default PostList;
