import { LoginUser } from '@/gql/types';
import { LOGIN } from '@/gql/user';
import graphqlClient from '@/service/graphqlClient';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.accessToken = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user.id = token.userId;
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const client = graphqlClient();
        try {
          const { login } = await client.request<{ login: LoginUser }>(LOGIN, {
            input: {
              email: credentials?.email,
              password: credentials?.password,
            },
          });
          return {
            id: login.id,
            email: credentials?.email,
            name: login.name,
            token: login.token,
          };
        } catch (error: any) {
          throw new Error(
            error.response.errors[0].message ||
              'Something went wrong with login',
          );
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
