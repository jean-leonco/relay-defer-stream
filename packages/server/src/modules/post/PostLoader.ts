import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';

import PostModel from './PostModel';

const { Wrapper: Post, getLoader, load, loadAll } = createLoader({
  model: PostModel,
  loaderName: 'PostLoader',
});

registerLoader('PostLoader', getLoader);

export { getLoader, load, loadAll };

export default Post;
