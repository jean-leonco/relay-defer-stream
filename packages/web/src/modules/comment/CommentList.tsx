import { startTransition, useCallback } from 'react';
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
  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment(
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

  const onEndReached = useCallback(() => {
    if (!isPaginationEnabled || isLoadingNext || !hasNext) {
      return;
    }

    startTransition(() => {
      loadNext(3);
    });
  }, [hasNext, isLoadingNext, isPaginationEnabled, loadNext]);

  if (!data.comments?.edges) {
    return null;
  }

  return (
    <Flex>
      <InfiniteScroll
        data={data.comments.edges}
        renderItem={({ edge }) => <CommentCard key={edge!.node!.id} comment={edge!.node!} />}
        keyExtrator={(edge) => edge!.node!.id!}
        onEndReached={onEndReached}
        isLoading={isLoadingNext}
      />
    </Flex>
  );
};

export default CommentList;
