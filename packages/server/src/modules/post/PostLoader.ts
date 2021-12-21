import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../../loader/loaderRegister';
import { GraphQLContext } from '../../types';

import PostModel, { IPost } from './PostModel';

const PostLoader = createLoader<GraphQLContext, 'PostLoader', IPost>({
  model: PostModel,
  loaderName: 'PostLoader',
});

registerLoader('PostLoader', PostLoader.getLoader);

export default PostLoader;
