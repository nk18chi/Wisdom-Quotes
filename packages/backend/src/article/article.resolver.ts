import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { UpdateArticleFilter } from './dto/update-article.filter';
import { FindArticlesFilter } from './dto/find-articles.filter';
import { GqlUser } from '../decorators/gqlUser.decorator';
import { UserService } from '../user/user.service';
import { SignedInUser } from '../user/entities/signedInUser.entity';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Article], { name: 'articles' })
  findAll(@Args('filter') filter: FindArticlesFilter) {
    return this.articleService.findAll(filter);
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.articleService.findOne(id);
  }

  @Mutation(() => Article)
  async createArticle(
    @Args('input') input: CreateArticleInput,
    @GqlUser() user: SignedInUser,
  ) {
    if (!user) new Error('User not found');
    const authorUser = await this.userService.findOne(user._id);
    if (!authorUser?.author?.id) throw new Error('Author not found');
    return this.articleService.create({
      ...input,
      authorId: authorUser!.author!.id,
    });
  }

  @Mutation(() => Article)
  updateArticle(
    @Args('filter') filter: UpdateArticleFilter,
    @Args('input') input: UpdateArticleInput,
  ) {
    return this.articleService.update(filter, input);
  }

  @Mutation(() => Article)
  removeArticle(@Args('id', { type: () => String }) id: string) {
    return this.articleService.remove(id);
  }
}
