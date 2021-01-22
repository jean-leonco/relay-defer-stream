import { Context } from 'koa';
import DataLoader from 'dataloader';

import { DataLoaderKey } from '@entria/graphql-mongo-helpers';

import { IPost } from './modules/post/PostModel';
import { IComment } from './modules/comment/CommentModel';

export interface GraphQLDataloaders {
  PostLoader: DataLoader<DataLoaderKey, IPost>;
  CommentLoader: DataLoader<DataLoaderKey, IComment>;
}

export interface KoaContext {
  dataloaders: GraphQLDataloaders;
}

export interface GraphQLContext extends KoaContext {
  koaContext: Context;
}

export interface IDefaultSchema {
  createdAt: Date;
  updatedAt: Date;
}
