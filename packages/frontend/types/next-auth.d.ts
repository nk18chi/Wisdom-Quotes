import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      authorId?: string | null;
      name?: string | null;
    };
    accessToken: string;
  }
  interface User {
    id: string;
    email: string;
    authorId?: string | null;
    name?: string | null;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface DefaultJWT {
    userId: string;
    authorId?: string | null;
    accessToken: string;
  }
}
