import React from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { useParams } from 'react-router-dom';
import { css } from 'styled-components';

import Flex from '../common/Flex';
import Space from '../common/Space';
import Text from '../common/Text';

import CommentList from '../comment/CommentList';

import { PostQuery } from './__generated__/PostQuery.graphql';

const containerCss = css`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
`;

const spacerCss = css`
  margin: 20px 0;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
`;

const Post = () => {
  const { id } = useParams<{ id: string }>();

  const { post } = useLazyLoadQuery<PostQuery>(
    graphql`
      query PostQuery($id: ID!) {
        post: node(id: $id) {
          ... on Post {
            content
            ...CommentList_post @arguments(first: 10)
          }
        }
      }
    `,
    { id }
  );

  if (!post) {
    return <Text>Post not found</Text>;
  }

  return (
    <Flex css={containerCss}>
      <Space height={6} />
      <Text size="title">{post.content}</Text>
      <Flex css={spacerCss} />
      <Text size="label" weight="semiBold">
        Comments:
      </Text>
      <CommentList query={post} />
    </Flex>
  );
};

export default Post;
