import { Test, TestingModule } from '@nestjs/testing';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { PrismaService } from '../prisma/prisma.service';
import AuthorsJSON from '../fixture/authors.json';
import ArticlesJson from '../fixture/articles.json';
import UsersJson from '../fixture/users.json';
import { ObjectId } from 'bson';

const NEW_ARTICLE_MOCK = {
  id: new ObjectId().toString(),
  title: 'New Blog #1',
  content: 'Hello World! New Blog #1',
  published: true,
  authorId: AuthorsJSON[0].id,
};

describe('ArticleResolver', () => {
  let resolver: ArticleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleResolver, ArticleService, PrismaService],
    }).compile();

    resolver = module.get<ArticleResolver>(ArticleResolver);
  });

  describe('articles', () => {
    it('should fetch all articles from db', async () => {
      const result = await resolver.findAll();
      expect(result.length).toBeGreaterThanOrEqual(3);
      expect(result[0]).toMatchObject(ArticlesJson[0]);
      expect(result[0].author).toMatchObject(AuthorsJSON[0]);
      expect(result[0].author.user).toMatchObject(UsersJson[0]);
    });
  });

  describe('article', () => {
    it('should fetch one article from db', async () => {
      const result = await resolver.findOne(ArticlesJson[0].id);
      expect(result).toMatchObject(ArticlesJson[0]);
      expect(result.author).toMatchObject(AuthorsJSON[0]);
      expect(result.author.user).toMatchObject(UsersJson[0]);
    });
  });

  describe('createArticle', () => {
    it('should create a new article in db', async () => {
      const result = await resolver.createArticle(NEW_ARTICLE_MOCK);
      expect(result).toMatchObject(NEW_ARTICLE_MOCK);
    });
  });

  describe('updateArticle', () => {
    it('should update the title of article in db', async () => {
      const before = await resolver.findOne(NEW_ARTICLE_MOCK.id);
      expect(before).toMatchObject({ title: NEW_ARTICLE_MOCK.title });
      const result = await resolver.updateArticle({
        id: NEW_ARTICLE_MOCK.id,
        title: 'Updated Blog',
      });
      expect(result).toMatchObject({ title: 'Updated Blog' });
    });
  });

  describe('removeArticle', () => {
    it('should remove an existing article from db', async () => {
      const before = await resolver.findOne(NEW_ARTICLE_MOCK.id);
      expect(before).not.toBeNull();
      const result = await resolver.removeArticle(NEW_ARTICLE_MOCK.id);
      expect(result).toMatchObject({ id: NEW_ARTICLE_MOCK.id });
      const after = await resolver.findOne(NEW_ARTICLE_MOCK.id);
      expect(after).toBeNull();
    });
  });
});
