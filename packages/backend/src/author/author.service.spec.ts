import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../prisma/singleton';
import { ObjectId } from 'bson';

const AUTHORS_MOCK = [
  {
    id: new ObjectId().toString(),
    name: 'Alice Johnson',
    userId: new ObjectId().toString(),
  },
  {
    id: new ObjectId().toString(),
    name: 'Bob Taylor',
    userId: new ObjectId().toString(),
  },
  {
    id: new ObjectId().toString(),
    name: 'William Jones',
    userId: new ObjectId().toString(),
  },
];

describe('AuthorService', () => {
  let service: AuthorService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();
    service = module.get(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call the prisma create method', async () => {
      jest
        .spyOn(prismaMock.author, 'create')
        .mockResolvedValue(AUTHORS_MOCK[0]);
      const author = await service.create(AUTHORS_MOCK[0]);
      expect(prismaMock.author.create).toHaveBeenCalledTimes(1);
      expect(author).toEqual(AUTHORS_MOCK[0]);
    });
  });

  describe('findAll', () => {
    it('should return an array of author', async () => {
      jest.spyOn(prismaMock.author, 'findMany').mockResolvedValue(AUTHORS_MOCK);
      const author = await service.findAll();
      expect(prismaMock.author.findMany).toHaveBeenCalledTimes(1);
      expect(author).toEqual(AUTHORS_MOCK);
    });
  });

  describe('findOne', () => {
    it('should return an author', async () => {
      jest
        .spyOn(prismaMock.author, 'findUnique')
        .mockResolvedValue(AUTHORS_MOCK[0]);
      const author = await service.findOne(AUTHORS_MOCK[0].id);
      expect(prismaMock.author.findUnique).toHaveBeenCalledTimes(1);
      expect(author).toEqual(AUTHORS_MOCK[0]);
    });
  });

  describe('update', () => {
    it('should call the prisma update method', async () => {
      jest
        .spyOn(prismaMock.author, 'update')
        .mockResolvedValue(AUTHORS_MOCK[0]);
      const author = await service.update(AUTHORS_MOCK[0]);
      expect(prismaMock.author.update).toHaveBeenCalledTimes(1);
      expect(author).toEqual(AUTHORS_MOCK[0]);
    });
  });
});
