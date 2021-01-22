import React from 'react';
import { css } from 'styled-components';

import Flex, { FlexProps } from './Flex';

const containerCss = css<LimiterProps>`
  max-width: ${p => `${p.size}px`};
  width: 100%;
`;

interface LimiterProps extends FlexProps {
  size?: number;
  children: React.ReactNode;
}

const Limiter = ({ size = 1200, children, ...props }: LimiterProps) => {
  return (
    <Flex size={size} css={containerCss} {...props}>
      {children}
    </Flex>
  );
};

export default Limiter;
