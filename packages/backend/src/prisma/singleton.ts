import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<{
  [K in keyof PrismaClient]: Omit<PrismaClient[K], 'groupBy'>;
}>;
