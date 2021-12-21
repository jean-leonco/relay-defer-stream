import { DataLoaderKey } from '@entria/graphql-mongo-helpers';
import DataLoader from 'dataloader';
import { Context } from 'koa';

import { IComment } from './modules/comment/CommentModel';
import { IPost } from './modules/post/PostModel';

export interface GraphQLDataloaders {
  PostLoader: DataLoader<DataLoaderKey, IPost>;
  CommentLoader: DataLoader<DataLoaderKey, IComment>;
}

export interface GraphQLContext {
  koaContext: Context;
  dataloaders: GraphQLDataloaders;
}

export interface IDefaultSchema {
  createdAt: Date;
  updatedAt: Date;
}
