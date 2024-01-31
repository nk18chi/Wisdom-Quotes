import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateAuthorInput) {
    return await this.prisma.author.create({
      data: input,
    })
  }

  findAll() {
    return this.prisma.author.findMany({})  
  }

  async findOne(id: string) {
    return this.prisma.author.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      }
    });
  }

  update(input: UpdateAuthorInput) {
    return this.prisma.user.update({
      where: {
        id: input.id,
      },
      data: input,
    });
  }
}
