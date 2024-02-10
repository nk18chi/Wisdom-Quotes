import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../prisma/singleton';
import { ObjectId } from 'bson';

const USERS_MOCK = [
  {
    id: new ObjectId().toString(),
    email: 'test1@example.com',
  },
  {
    id: new ObjectId().toString(),
    email: 'test2@example.com',
  },
  {
    id: new ObjectId().toString(),
    email: 'test3@example.com',
  },
];

describe('UserService', () => {
  let service: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();
    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call the prisma create method', async () => {
      jest.spyOn(prismaMock.user, 'create').mockResolvedValue(USERS_MOCK[0]);
      const user = await service.create(USERS_MOCK[0]);
      expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
      expect(user).toEqual(USERS_MOCK[0]);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue(USERS_MOCK);
      const users = await service.findAll();
      expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
      expect(users).toEqual(USERS_MOCK);
    });
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      jest
        .spyOn(prismaMock.user, 'findUnique')
        .mockResolvedValue(USERS_MOCK[0]);
      const user = await service.findOne(USERS_MOCK[0].id);
      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
      expect(user).toEqual(USERS_MOCK[0]);
    });
  });
});
