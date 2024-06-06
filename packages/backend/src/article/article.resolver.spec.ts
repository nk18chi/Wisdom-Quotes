import { Test, TestingModule } from '@nestjs/testing';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { PrismaService } from '../prisma/prisma.service';
import AuthorJSON from '../fixture/authors.json';
import ArticlesJson from '../fixture/articles.json';
import UsersJson from '../fixture/users.json';
import { ObjectId } from 'bson';
import { UserService } from '../user/user.service';

const NEW_ARTICLE_MOCK = {
  id: new ObjectId().toString(),
  title: 'New Blog #1',
  content: 'Hello World! New Blog #1',
  published: true,
};

const USER_MOCK = {
  _id: UsersJson[0].id,
};

const AUTHOR_USER_MOCK = {
  id: UsersJson[0].id,
  name: 'Alice Johnson',
  author: {
    id: AuthorJSON[0].id,
  },
};

describe('ArticleResolver', () => {
  let resolver: ArticleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleResolver, ArticleService, PrismaService, UserService],
    }).compile();

    resolver = module.get<ArticleResolver>(ArticleResolver);
  });

  describe('articles', () => {
    it('should fetch all articles from db', async () => {
      const result = await resolver.findAll({});
      expect(result.length).toBeGreaterThanOrEqual(3);
      expect(result[0]).toMatchObject(ArticlesJson[0]);
      expect(result[0].author).toMatchObject(AuthorJSON[0]);
      expect(result[0].author.user).toMatchObject(UsersJson[0]);
    });
  });

  describe('article', () => {
    it('should fetch one article from db', async () => {
      const result = await resolver.findOne(ArticlesJson[0].id);
      expect(result).toMatchObject(ArticlesJson[0]);
      expect(result?.author).toMatchObject(AuthorJSON[0]);
      expect(result?.author.user).toMatchObject(UsersJson[0]);
    });
  });

  describe('createArticle', () => {
    beforeEach(() => {
      jest
        .spyOn(UserService.prototype, 'findOne')
        .mockResolvedValue(AUTHOR_USER_MOCK as any);
    });
    it('should create a new article in db', async () => {
      const result = await resolver.createArticle(NEW_ARTICLE_MOCK, USER_MOCK);
      expect(result).toMatchObject(NEW_ARTICLE_MOCK);
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });
    it('should throw an error when a user does not have author id yet', async () => {
      jest.spyOn(UserService.prototype, 'findOne').mockResolvedValue({
        ...AUTHOR_USER_MOCK,
        author: { id: null },
      } as any);
      expect(
        resolver.createArticle(NEW_ARTICLE_MOCK, USER_MOCK),
      ).rejects.toThrow('Author not found');
    });
  });

  describe('updateArticle', () => {
    it('should update the title of article in db', async () => {
      const before = await resolver.findOne(NEW_ARTICLE_MOCK.id);
      expect(before).toMatchObject({ title: NEW_ARTICLE_MOCK.title });
      const result = await resolver.updateArticle(
        {
          id: NEW_ARTICLE_MOCK.id,
        },
        {
          title: 'Updated Blog',
        },
      );
      expect(result).toMatchObject({ title: 'Updated Blog' });
      expect(result.updatedAt).not.toBe(result.createdAt);
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
