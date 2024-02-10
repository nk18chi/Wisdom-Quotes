import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateAuthorInput) {
    return await this.prisma.author.create({
      data: input,
    });
  }

  async findAll() {
    return this.prisma.author.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.author.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  async update(updateArticleInput: UpdateAuthorInput) {
    const id = updateArticleInput.id;
    const data = { ...updateArticleInput };
    delete data.id;
    return this.prisma.author.update({
      where: {
        id,
      },
      data,
    });
  }
}
