import React, { useCallback, useMemo } from 'react';
import { graphql, usePaginationFragment, useSubscription } from 'react-relay/hooks';

import Flex from '../common/Flex';
import InfiniteScroll from '../common/InfiniteScroll';

import CommentCard from './CommentCard';
import { CommentListPaginationQuery } from './__generated__/CommentListPaginationQuery.graphql';
import { CommentListSubscription } from './__generated__/CommentListSubscription.graphql';
import { CommentList_post$key } from './__generated__/CommentList_post.graphql';

interface CommentListProps {
  query: CommentList_post$key;
  shouldEnablePagination?: boolean;
}

const CommentList = ({ shouldEnablePagination = true, ...props }: CommentListProps) => {
  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    CommentListPaginationQuery,
    CommentList_post$key
  >(
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
    props.query,
  );

  const renderComment = useCallback(
    ({ edge, ref }) => <CommentCard key={edge.node.id} query={edge.node} ref={ref} />,
    [],
  );

  const comments = useMemo(
    () => (shouldEnablePagination ? [] : data.comments?.edges.slice(0, 3).map((edge) => renderComment({ edge }))),
    [data.comments?.edges, renderComment, shouldEnablePagination],
  );

  if (!data.comments?.edges) {
    return null;
  }

  if (!shouldEnablePagination) {
    return <Flex>{comments.length > 0 ? comments : 'No comments'}</Flex>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useSubscription<CommentListSubscription>({
    subscription: graphql`
      subscription CommentListSubscription($input: CommentNewInput!, $connections: [ID!]!) {
        CommentNew(input: $input) {
          commentEdge @prependEdge(connections: $connections) {
            node {
              id
              ...CommentCard_Comment
            }
          }
        }
      }
    `,
    variables: {
      input: { post: data.id },
      connections: [`client:${data.id}:__CommentList_comments_connection`],
    },
  });

  return (
    <Flex>
      <InfiniteScroll
        data={data.comments.edges as any}
        renderItem={renderComment}
        loadNext={loadNext}
        hasNext={hasNext}
        isLoading={isLoadingNext}
      />
    </Flex>
  );
};

export default CommentList;
