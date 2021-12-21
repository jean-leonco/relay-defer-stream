import { Suspense } from 'react';
import { graphql, useFragment } from 'react-relay';
import { Link as RouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import CommentList from '../comment/CommentList';
import Flex from '../common/Flex';
import Space from '../common/Space';
import Text from '../common/Text';

import { PostCard_post$key } from './__generated__/PostCard_post.graphql';

const Link = styled(RouterLink)`
  max-width: 700px;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin: 20px;
`;

const spacerCss = css`
  margin: 20px 0;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
`;

type PostCardProps = {
  post: PostCard_post$key;
};

const PostCard = (props: PostCardProps) => {
  const data = useFragment<PostCard_post$key>(
    graphql`
      fragment PostCard_post on Post {
        id
        content
        ...CommentList_post @defer
      }
    `,
    props.post,
  );

  return (
    <Link to={`/post/${data.id}`}>
      <Flex>
        <Space height={6} />
        <Text size="label">{data.content}</Text>
        <Flex css={spacerCss} />
        <Suspense fallback={'Loading comments...'}>
          <Text weight="semiBold">Comments:</Text>
          <CommentList post={data} isPaginationEnabled={false} />
        </Suspense>
      </Flex>
    </Link>
  );
};

export default PostCard;
