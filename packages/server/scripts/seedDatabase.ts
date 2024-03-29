/* eslint-disable no-console */
import faker from 'faker';

import { connectDatabase } from '../src/database';

import CommentModel from '../src/modules/comment/CommentModel';
import PostModel from '../src/modules/post/PostModel';

const runScript = async () => {
  const posts = 50;

  for (let i = 0; i < posts; i++) {
    const content = faker.lorem.paragraph().slice(0, 255);
    const comments = faker.datatype.number(6);

    const post = await new PostModel({ content }).save();

    for (let i = 0; i < comments; i++) {
      const body = faker.lorem.paragraph().slice(0, 100);

      await new CommentModel({ body, post: post._id }).save();
    }
  }

  console.log(`⏳ Seeding...\n`);
};

(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('❌ Could not connect to database');
    process.exit(1);
  }

  try {
    await runScript();
    console.log('✔️  Database seed completed');
  } catch (err) {
    console.log('err:', err);
    process.exit(1);
  }
  process.exit(0);
})();
