import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../../loader/loaderRegister';

import { GraphQLContext } from '../../types';

import CommentModel, { IComment } from './CommentModel';
import { commentFilterMapping } from './CommentFilterInputType';

const CommentLoader = createLoader<GraphQLContext, 'CommentLoader', IComment>({
  model: CommentModel,
  loaderName: 'CommentLoader',
  filterMapping: commentFilterMapping,
});

registerLoader('CommentLoader', CommentLoader.getLoader);

export default CommentLoader;
