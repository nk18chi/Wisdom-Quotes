import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { UpdateAuthorFilter } from './dto/update-author.filter';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  createAuthor(@Args('input') input: CreateAuthorInput) {
    return this.authorService.create(input);
  }

  @Query(() => [Author], { name: 'author' })
  findAll() {
    return this.authorService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.authorService.findOne(id);
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('filter') filter: UpdateAuthorFilter,
    @Args('input') input: UpdateAuthorInput,
  ) {
    return this.authorService.update(filter, input);
  }
}
