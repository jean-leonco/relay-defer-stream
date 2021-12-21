import { ForwardedRef } from 'react';
import { graphql, usePaginationFragment } from 'react-relay';
import { css } from 'styled-components';

import Flex from '../common/Flex';
import InfiniteScroll from '../common/InfiniteScroll';
import Text from '../common/Text';

import { PostList_query$key } from './__generated__/PostList_query.graphql';
import { PostListPaginationQuery } from './__generated__/PostListPaginationQuery.graphql';
import PostCard from './PostCard';

const containerCss = css`
  width: 100%;
`;

type PostListProps = {
  query: PostList_query$key;
};

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

  if (!data.posts?.edges) {
    return <Text>Unable to fetch posts</Text>;
  }

  return (
    <Flex align="center" css={containerCss}>
      <InfiniteScroll
        data={data.posts.edges}
        renderItem={({ edge, ref }) => (
          <PostCard key={edge!.node!.id} post={edge!.node!} ref={ref as ForwardedRef<HTMLAnchorElement>} />
        )}
        loadNext={loadNext}
        hasNext={hasNext}
        isLoading={isLoadingNext}
      />
    </Flex>
  );
};

export default PostList;
