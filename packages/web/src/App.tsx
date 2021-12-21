import { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { css } from 'styled-components';

import Flex from './modules/common/Flex';
import Text from './modules/common/Text';

import Home from './modules/home/Home';
import Post from './modules/post/Post';

const containerCss = css`
  height: 100%;
  width: 100%;
  background: ${(p) => p.theme.colors.background};
  margin: 0 auto;
`;

const App = () => {
  const fallback = useMemo(
    () => (
      <Flex align="center" justify="center" css={containerCss}>
        <Text>Loading</Text>
      </Flex>
    ),
    [],
  );

  return (
    <Flex css={containerCss}>
      <Suspense fallback={fallback}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </Suspense>
    </Flex>
  );
};

export default App;
