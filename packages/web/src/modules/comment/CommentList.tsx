import React, { ForwardedRef, useCallback, useMemo } from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import Flex from '../common/Flex';
import InfiniteScroll from '../common/InfiniteScroll';

import { CommentList_post$key } from './__generated__/CommentList_post.graphql';
import CommentCard from './CommentCard';

type CommentListProps = {
  post: CommentList_post$key;
  isPaginationEnabled?: boolean;
};

const CommentList = ({ isPaginationEnabled = true, ...props }: CommentListProps) => {
  const {
    data,
    loadNext: _loadNext,
    isLoadingNext,
    hasNext: _hasNext,
  } = usePaginationFragment(
    graphql`
      fragment CommentList_post on Post
      @argumentDefinitions(first: { type: Int, defaultValue: 3 }, after: { type: String })
      @refetchable(queryName: "CommentListPaginationQuery") {
        comments(first: $first, after: $after) @connection(key: "CommentList_comments") {
          edges {
            node {
              id
              ...CommentCard_Comment
            }
          }
        }
      }
    `,
    props.post,
  );

  const hasNext = useMemo(() => (isPaginationEnabled ? _hasNext : false), [isPaginationEnabled, _hasNext]);

  const loadNext = useCallback(() => {
    if (isPaginationEnabled) {
      return _loadNext;
    } else {
      return null;
    }
  }, [isPaginationEnabled, _loadNext]);

  if (!data.comments?.edges) {
    return null;
  }

  return (
    <Flex>
      <InfiniteScroll
        data={data.comments.edges}
        renderItem={({ edge, ref }) => (
          <CommentCard key={edge!.node!.id} comment={edge!.node!} ref={ref as ForwardedRef<HTMLDivElement>} />
        )}
        loadNext={loadNext}
        hasNext={hasNext}
        isLoading={isLoadingNext}
      />
    </Flex>
  );
};

export default CommentList;
