import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../prisma/singleton';
import { ObjectId } from 'bson';

const USERS_MOCK = [
  {
    id: new ObjectId().toString(),
    email: 'test1@example.com',
    password: 'Ba1>YHeOH434IerDrRE',
  },
  {
    id: new ObjectId().toString(),
    email: 'test2@example.com',
    password: 'H&8U)*UBV*t87rqf41-',
  },
  {
    id: new ObjectId().toString(),
    email: 'test3@example.com',
    password: 'H&8U)*UBV*t87rqf42-',
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
    it('should encrypt the password', async () => {
      jest.spyOn(prismaMock.user, 'create').mockResolvedValue(USERS_MOCK[0]);
      await service.create(USERS_MOCK[0]);
      expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          ...USERS_MOCK[0],
          password: expect.not.stringMatching(USERS_MOCK[0].password),
        },
      });
    });
    it('should throw an error when the password is easy to identify', async () => {
      jest.spyOn(prismaMock.user, 'create').mockResolvedValue(USERS_MOCK[0]);
      await expect(
        service.create({ ...USERS_MOCK[0], password: 'a' }),
      ).rejects.toThrow('The password should not be identical');
    });
  });

  describe('login', () => {
    it('should return user with the valid email/password', async () => {
      const user = {
        ...USERS_MOCK[0],
        password:
          '$2b$10$8C4wZmCUGM2zOoS9BcRas.z1HGUHEcl57Q4e3IyUS9mWm253XjhrC',
      };
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(user);
      expect(
        await service.login({
          email: 'test1@example.com',
          password: 'Ba1>YHeOH434IerDrRE',
        }),
      ).toBe(user);
    });
    it('should throw an error when the password is incorrect', async () => {
      jest
        .spyOn(prismaMock.user, 'findUnique')
        .mockResolvedValue(USERS_MOCK[0]);
      await expect(
        service.login({
          email: 'test1@example.com',
          password: 'Ba1>YHeOH434IerDrRE',
        }),
      ).rejects.toThrow('Password is incorrect');
    });
    it('should throw an error when the user is not found with the email', async () => {
      jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null);
      await expect(
        service.login({
          email: 'test1@example.com',
          password: 'Ba1>YHeOH434IerDrRE',
        }),
      ).rejects.toThrow('User is not found.');
    });
  });

  describe('generateAuthenticationToken', () => {
    it('should generate the token with userId', async () => {
      expect(
        await service.generateAuthenticationToken({
          userId: USERS_MOCK[0].id,
        }),
      ).toContain('eyJhbG');
    });
    it('should generate the token with userId and expiryToken', async () => {
      expect(
        await service.generateAuthenticationToken({
          userId: USERS_MOCK[0].id,
          expiryTime: '1h',
        }),
      ).toContain('eyJhbG');
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
