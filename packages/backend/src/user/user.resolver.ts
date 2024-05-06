import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { LoginUser } from './entities/loginUser.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => LoginUser)
  async login(@Args('input') input: LoginUserInput): Promise<LoginUser> {
    try {
      const user = await this.userService.login(input);
      return {
        id: user.id,
        authorId: user.author?.id ?? null,
        name: user.author?.name ?? null,
        email: user.email,
        token: await this.userService.generateAuthenticationToken({
          userId: user.id,
          expiryTime: '14d',
        }),
      };
    } catch {
      throw new Error('email or password is incorrect');
    }
  }
}
