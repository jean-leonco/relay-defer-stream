import { ForwardedRef, forwardRef } from 'react';
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

type CommentCardProps = {
  comment: CommentCard_Comment$key;
};

const CommentCard = (props: CommentCardProps) => {
  const comment = useFragment(
    graphql`
      fragment CommentCard_Comment on Comment {
        body
      }
    `,
    props.comment,
  );

  return (
    <Flex css={commentCss}>
      <Text>{comment.body}</Text>
    </Flex>
  );
};

export default CommentCard;
