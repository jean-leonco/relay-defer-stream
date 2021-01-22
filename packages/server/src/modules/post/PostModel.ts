import mongoose, { Document, Model } from 'mongoose';

import { IDefaultSchema } from '../../types';

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'Post',
    timestamps: true,
  }
);

export interface IPost extends Document, IDefaultSchema {
  content: string;
}

const PostModel: Model<IPost> = mongoose.model('Post', PostSchema);

export default PostModel;
