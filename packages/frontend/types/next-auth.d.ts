import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    };
    accessToken: string;
  }
  interface User {
    id: string;
    email: string;
    name?: string | null;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface DefaultJWT {
    userId: string;
    accessToken: string;
  }
}
