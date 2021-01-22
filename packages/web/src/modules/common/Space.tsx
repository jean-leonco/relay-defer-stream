import styled from 'styled-components';

export interface SpaceProps {
  width?: number;
  height?: number;
}

const Space = styled.div<SpaceProps>`
  ${(p) => (p.width ? `width: ${p.width.toFixed()}px;` : '')}
  ${(p) => (p.height ? `height: ${p.height.toFixed()}px;` : '')}
`;

export default Space;
