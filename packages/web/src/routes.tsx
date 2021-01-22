import React, { Suspense, useMemo } from 'react';
import { css } from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Flex from './modules/common/Flex';
import Text from './modules/common/Text';

import Home from './modules/home/Home';
import Post from './modules/post/Post';

const containerCss = css`
  height: 100%;
  width: 100%;
  background: ${p => p.theme.colors.background};
  margin: 0 auto;
`;

const Routes = () => {
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
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/post/:id">
            <Post />
          </Route>
        </Switch>
      </Suspense>
    </Flex>
  );
};

export default Routes;
