import { Injectable } from '@nestjs/common';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateArticleFilter } from './dto/update-article.filter';
import { FindArticlesFilter } from './dto/find-articles.filter';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateArticleInput & { authorId: string }) {
    return this.prisma.article.create({
      data: input,
    });
  }

  async findAll(filter: FindArticlesFilter) {
    return this.prisma.article.findMany({
      where: {
        ...filter,
      },
      include: {
        author: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.article.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  update(filter: UpdateArticleFilter, input: UpdateArticleInput) {
    return this.prisma.article.update({
      where: {
        ...filter,
      },
      data: input,
    });
  }

  remove(id: string) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
