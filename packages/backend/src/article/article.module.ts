import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [ArticleResolver, ArticleService, PrismaService, UserService],
})
export class ArticleModule {}
