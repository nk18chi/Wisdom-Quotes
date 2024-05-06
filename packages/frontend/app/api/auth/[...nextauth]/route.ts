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
        token.accessToken = user.token;
        token.authorId = user.authorId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;
      session.accessToken = token.accessToken;
      session.user.authorId = token.authorId;
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
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Something went wrong with login');
        }
        const client = graphqlClient();
        try {
          const { login } = await client.request<{ login: LoginUser }>(LOGIN, {
            input: {
              email: credentials.email,
              password: credentials?.password,
            },
          });
          return {
            id: login.id,
            authorId: login.authorId,
            email: credentials.email,
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
