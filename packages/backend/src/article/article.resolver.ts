import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { UpdateArticleFilter } from './dto/update-article.filter';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => [Article], { name: 'articles' })
  findAll() {
    return this.articleService.findAll();
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.articleService.findOne(id);
  }

  @Mutation(() => Article)
  async createArticle(@Args('input') input: CreateArticleInput) {
    return this.articleService.create(input);
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
