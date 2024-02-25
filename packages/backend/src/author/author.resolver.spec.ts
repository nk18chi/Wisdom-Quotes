import { Test, TestingModule } from '@nestjs/testing';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { PrismaService } from '../prisma/prisma.service';
import AuthorsJSON from '../fixture/authors.json';
import UsersJson from '../fixture/users.json';
import { ObjectId } from 'bson';

const NEW_AUTHOR_MOCK = {
  id: new ObjectId().toString(),
  name: 'David Brown',
  userId: '65b5fdb1a5ab620c89715ffc',
};

describe('AuthorResolver', () => {
  let resolver: AuthorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorResolver, AuthorService, PrismaService],
    }).compile();

    resolver = module.get<AuthorResolver>(AuthorResolver);
  });

  describe('authors', () => {
    it('should fetch all authors from db', async () => {
      const result = await resolver.findAll();
      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result[0]).toMatchObject(AuthorsJSON[0]);
      expect(result[0].user).toMatchObject(UsersJson[0]);
    });
  });

  describe('author', () => {
    it('should fetch one author from db', async () => {
      const result = await resolver.findOne(AuthorsJSON[0].id);
      expect(result).toMatchObject(AuthorsJSON[0]);
      expect(result.user).toMatchObject(UsersJson[0]);
    });
  });

  describe('createAuthor', () => {
    it('should create a new author in db', async () => {
      const result = await resolver.createAuthor(NEW_AUTHOR_MOCK);
      expect(result).toMatchObject(NEW_AUTHOR_MOCK);
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });
  });

  describe('updateAuthor', () => {
    it('should update the title of author in db', async () => {
      const before = await resolver.findOne(NEW_AUTHOR_MOCK.id);
      expect(before).toMatchObject({ name: NEW_AUTHOR_MOCK.name });
      const result = await resolver.updateAuthor({
        id: NEW_AUTHOR_MOCK.id,
        name: 'Taro Yamada',
      });
      expect(result).toMatchObject({ name: 'Taro Yamada' });
      expect(result.updatedAt).not.toBe(result.createdAt);
    });
  });
});
