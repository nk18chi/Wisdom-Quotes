import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import UsersJson from '../fixture/users.json';
import { ObjectId } from 'bson';

const NEW_USER_MOCK = {
  id: new ObjectId().toString(),
  email: 'unit.testing@example.com',
};

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService, PrismaService],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  describe('users', () => {
    it('should fetch all users from db', async () => {
      const result = await resolver.findAll();
      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result[0]).toMatchObject(UsersJson[0]);
    });
  });

  describe('user', () => {
    it('should fetch one user from db', async () => {
      const result = await resolver.findOne(UsersJson[0].id);
      expect(result).toMatchObject(UsersJson[0]);
    });
  });

  describe('createUser', () => {
    it('should create a new user in db', async () => {
      const result = await resolver.createUser(NEW_USER_MOCK);
      expect(result).toMatchObject(NEW_USER_MOCK);
    });
  });
});
