import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import styled, { DefaultTheme, FlattenInterpolation, ThemedStyledProps } from 'styled-components';

const Container = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(p) => p.direction};
  ${(p) => p.justify && `justify-content: ${p.justify};`}
  ${(p) => p.align && `align-items: ${p.align};`}
  ${(p) => p.flex && `flex: ${p.flex};`}
  ${(p) => p.css}
`;

export interface FlexProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  direction?: 'column' | 'row';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flex?: number;
  children?: ReactNode;
  css?: FlattenInterpolation<ThemedStyledProps<any, DefaultTheme>>;
}

const Flex = ({ children, direction = 'column', ...props }: FlexProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <Container direction={direction} ref={ref} {...props}>
      {children}
    </Container>
  );
};

export default React.forwardRef<HTMLDivElement, FlexProps>(Flex);
