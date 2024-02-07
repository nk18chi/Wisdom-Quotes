import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { PrismaService } from './prisma/prisma.service';
import UsersJson from './fixture/users.json';
import AuthorsJson from './fixture/authors.json';
import ArticlesJson from './fixture/articles.json';

module.exports = async () => {
  const mongodb = await MongoMemoryReplSet.create({
    replSet: { count: 1, storageEngine: 'wiredTiger' },
  });
  process.env.DATABASE_URL = mongodb.getUri('test');
  global.__MONGODB_INSTANCE = mongodb;

  // insert mock data in DB
  const instance = new PrismaService();
  instance.onModuleInit();
  await instance.user.createMany({ data: UsersJson });
  await instance.author.createMany({ data: AuthorsJson });
  await instance.article.createMany({ data: ArticlesJson });
};
