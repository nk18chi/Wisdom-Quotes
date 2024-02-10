import { Injectable } from '@nestjs/common';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateArticleInput) {
    return this.prisma.article.create({
      data: input,
    });
  }

  async findAll() {
    return this.prisma.article.findMany({
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

  update(updateArticleInput: UpdateArticleInput) {
    const id = updateArticleInput.id;
    const data = { ...updateArticleInput };
    delete data.id;
    return this.prisma.article.update({
      where: {
        id,
      },
      data,
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
