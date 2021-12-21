import { DetailedHTMLProps, ForwardedRef, HTMLAttributes, PropsWithoutRef, ReactNode, forwardRef } from 'react';
import styled, { DefaultTheme, FlattenInterpolation, FlattenSimpleInterpolation, ThemeProps } from 'styled-components';

const Container = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(p) => p.direction};
  ${(p) => p.justify && `justify-content: ${p.justify};`}
  ${(p) => p.align && `align-items: ${p.align};`}
  ${(p) => p.flex && `flex: ${p.flex};`}
  ${(p) => p.css}
`;

type DivPropsWithoutRef = PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;

type FlexProps = DivPropsWithoutRef & {
  direction?: 'column' | 'row';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flex?: number;
  children?: ReactNode;
  css?: FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<DefaultTheme>>;
};

const Flex = ({ children, direction = 'column', ...props }: FlexProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <Container direction={direction} ref={ref} {...props}>
      {children}
    </Container>
  );
};

export default forwardRef<HTMLDivElement, FlexProps>(Flex);
