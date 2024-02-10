import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../prisma/singleton';
import { ObjectId } from 'bson';

const ARTICLES_MOCK = [
  {
    id: new ObjectId().toString(),
    title: 'Blog Title #1111',
    content: 'Blog Content 1',
    published: true,
    authorId: new ObjectId().toString(),
  },
  {
    id: new ObjectId().toString(),
    title: 'Blog Title #2',
    content: 'Blog Content 2',
    published: false,
    authorId: new ObjectId().toString(),
  },
  {
    id: new ObjectId().toString(),
    title: 'Blog Title #3',
    content: 'Blog Content 3',
    published: true,
    authorId: new ObjectId().toString(),
  },
];

describe('ArticleService', () => {
  let service: ArticleService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();
    service = module.get(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call the prisma create method', async () => {
      jest
        .spyOn(prismaMock.article, 'create')
        .mockResolvedValue(ARTICLES_MOCK[0]);
      const article = await service.create(ARTICLES_MOCK[0]);
      expect(prismaMock.article.create).toHaveBeenCalledTimes(1);
      expect(article).toEqual(ARTICLES_MOCK[0]);
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      jest
        .spyOn(prismaMock.article, 'findMany')
        .mockResolvedValue(ARTICLES_MOCK);
      const articles = await service.findAll();
      expect(prismaMock.article.findMany).toHaveBeenCalledTimes(1);
      expect(articles).toEqual(ARTICLES_MOCK);
    });
  });

  describe('findOne', () => {
    it('should return an article', async () => {
      jest
        .spyOn(prismaMock.article, 'findUnique')
        .mockResolvedValue(ARTICLES_MOCK[0]);
      const article = await service.findOne(ARTICLES_MOCK[0].id);
      expect(prismaMock.article.findUnique).toHaveBeenCalledTimes(1);
      expect(article).toEqual(ARTICLES_MOCK[0]);
    });
  });

  describe('update', () => {
    it('should call the prisma update method', async () => {
      jest
        .spyOn(prismaMock.article, 'update')
        .mockResolvedValue(ARTICLES_MOCK[0]);
      const article = await service.update(ARTICLES_MOCK[0]);
      expect(prismaMock.article.update).toHaveBeenCalledTimes(1);
      expect(article).toEqual(ARTICLES_MOCK[0]);
    });
  });

  describe('remove', () => {
    it('should call the prisma delete method', async () => {
      jest
        .spyOn(prismaMock.article, 'delete')
        .mockResolvedValue(ARTICLES_MOCK[0]);
      const article = await service.remove(ARTICLES_MOCK[0].id);
      expect(prismaMock.article.delete).toHaveBeenCalledTimes(1);
      expect(article).toEqual(ARTICLES_MOCK[0]);
    });
  });
});
