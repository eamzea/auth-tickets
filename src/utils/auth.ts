import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { Session, User } from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    // ✅ GitHub OAuth Provider
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    // ✅ Credentials Provider (Mocked Authentication)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'username', placeholder: 'admin' },
      },
      async authorize() {
        const userMock = {
          username: 'admin',
        };

        const user = await prisma.user.findUnique({
          where: {
            name: userMock.username,
            email: 'admin@example.com',
          },
        });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async redirect({ url, baseUrl }: Record<string, string>) {
      return url.startsWith(baseUrl) ? url : '/';
    },
    async signIn({ user }: { user: User }) {
      const userExists = await prisma.user.findUnique({
        where: {
          name: user.name ?? '',
          email: user.email ?? '',
        },
      });

      if (userExists) {
        return true;
      }

      const newUser = await prisma.user.create({
        data: {
          name: user.name ?? '',
          email: user.email ?? '',
          tasks: { create: [] },
        },
      });

      if (!newUser) {
        throw new Error('Invalid email or password');
      }

      return true;
    },
    async session({ session }: { session: Session }) {
      if (session?.user && session.user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (dbUser) {
          session.user.id = dbUser.id; // ✅ Attach user ID to session
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
