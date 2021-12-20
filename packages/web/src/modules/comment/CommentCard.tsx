import React from 'react';
import { graphql, useFragment } from 'react-relay';
import { css } from 'styled-components';

import Flex from '../common/Flex';
import Text from '../common/Text';

import { CommentCard_Comment$key } from './__generated__/CommentCard_Comment.graphql';

const commentCss = css`
  max-width: 400px;
  padding: 10px;
  margin: 10px 0;
  background: #f5f5f5;
`;

interface CommentCardProps {
  query: CommentCard_Comment$key;
}

const CommentCard = (props: CommentCardProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const data = useFragment<CommentCard_Comment$key>(
    graphql`
      fragment CommentCard_Comment on Comment {
        body
      }
    `,
    props.query,
  );

  return (
    <Flex css={commentCss} ref={ref}>
      <Text>{data.body}</Text>
    </Flex>
  );
};

export default React.forwardRef<HTMLDivElement, CommentCardProps>(CommentCard);
