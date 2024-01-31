import { Injectable } from '@nestjs/common';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) { }
  
  create(input: CreateArticleInput) {
    return this.prisma.article.create({
      data: input,
    })
  }

  findAll() {
    return this.prisma.article.findMany({
      include: {
        author: {
          include: {
            user: true,
          }
        }
      }
    })
  }

  findOne(id: string) {
    return this.prisma.article.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          include: {
            user: true,
          }
        }
      }
    }
    )
  }

  update(id: string, updateArticleInput: UpdateArticleInput) {
    return this.prisma.article.update({
      where: {
        id,
      },
      data: updateArticleInput,
    });
  }

  remove(id: string) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    })
  }
}
