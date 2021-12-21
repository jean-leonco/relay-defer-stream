import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../../loader/loaderRegister';

import { GraphQLContext } from '../../types';

import { commentFilterMapping } from './CommentFilterInputType';
import CommentModel, { IComment } from './CommentModel';

const CommentLoader = createLoader<GraphQLContext, 'CommentLoader', IComment>({
  model: CommentModel,
  loaderName: 'CommentLoader',
  filterMapping: commentFilterMapping,
});

registerLoader('CommentLoader', CommentLoader.getLoader);

export default CommentLoader;
