import React from 'react';
import styled, { DefaultTheme, FlattenInterpolation, ThemedStyledProps } from 'styled-components';

const Container = styled.span<TextProps>`
  color: ${p => (p.color ? p.theme.colors[p.color] || p.color : p.theme.colors.text)};
  font-size: ${p => (p.size ? p.theme.fontSizes[p.size] || p.size : p.theme.fontSizes.text)};
  font-weight: ${p => (p.weight ? p.theme.fontWeights[p.weight] || p.weight : p.theme.fontWeights.regular)};
  ${p => p.height && `line-height: ${p.height}px;`}
  ${p => p.center && 'text-align: center;'}
  ${p => p.italic && ' font-style: italic;'}
  ${p => p.css}
`;

interface TextProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string;
  size?: string;
  height?: number;
  weight?: string;
  children: React.ReactNode;
  css?: FlattenInterpolation<ThemedStyledProps<any, DefaultTheme>>;
  center?: boolean;
  italic?: boolean;
}

const Text = ({ children, ...props }: TextProps) => {
  return <Container {...props}>{children}</Container>;
};

export default Text;
