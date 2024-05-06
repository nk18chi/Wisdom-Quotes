import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import { CreateAuthorResolverInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { GqlUser } from 'src/decorators/gqlUser.decorator';
import { SignedInUser } from 'src/user/entities/signedInUser.entity';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  createAuthor(
    @Args('input') input: CreateAuthorResolverInput,
    @GqlUser() user: SignedInUser,
  ) {
    if (!user) new Error('User not found');
    return this.authorService.create({ ...input, userId: user._id });
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
    @Args('input') input: UpdateAuthorInput,
    @GqlUser() user: SignedInUser,
  ) {
    if (!user) new Error('User not found');
    return this.authorService.update({ userId: user._id }, input);
  }
}
