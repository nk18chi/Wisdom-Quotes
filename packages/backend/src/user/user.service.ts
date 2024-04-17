import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { LoginUserInput } from './dto/login-user.input';
import { GenerateAuthenticationTokenInput } from './dto/generaet-authentication-token';
import jwt from 'jsonwebtoken';
import { isStrongPassword } from 'validator';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateUserInput) {
    if (!isStrongPassword(input.password)) {
      throw new Error('The password should not be identical');
    }
    const encryptedPassword = await bcrypt.hash(input.password, 10);
    return this.prisma.user.create({
      data: {
        ...input,
        password: encryptedPassword,
      },
    });
  }

  async login(input: LoginUserInput) {
    const user = await this.prisma.user.findUnique({
      include: {
        author: true,
      },
      where: {
        email: input.email,
      },
    });
    if (!user) throw new Error('User is not found.');
    if (!(await bcrypt.compare(input.password, user.password))) {
      throw new Error('Password is incorrect.');
    }
    return user;
  }

  async generateAuthenticationToken(input: GenerateAuthenticationTokenInput) {
    const token = jwt.sign(
      { userId: input.userId },
      process.env.TOKEN_SECRET_KEY as string,
      {
        ...(input.expiryTime && { expiresIn: input.expiryTime }),
        algorithm: 'HS256',
      },
    );
    return token;
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
