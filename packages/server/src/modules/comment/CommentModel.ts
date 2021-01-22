import mongoose, { Document, Model, ObjectId } from 'mongoose';

import { IDefaultSchema } from '../../types';

const { Types } = mongoose.Schema;

const Schema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    post: {
      type: Types.ObjectId,
      ref: 'Post',
      required: true,
      index: true,
    },
  },
  {
    collection: 'Comment',
    timestamps: true,
  }
);

export interface IComment extends Document, IDefaultSchema {
  post: ObjectId;
  body: string;
}

const CommentModel: Model<IComment> = mongoose.model('Comment', Schema);

export default CommentModel;
