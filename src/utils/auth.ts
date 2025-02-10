import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        password: { label: 'Password', type: 'password', placeholder: 'admin' },
      },
      async authorize() {
        const user = {
          username: 'admin',
          password: 'admin',
        };

        if (!user) {
          throw new Error('Invalid email or password');
        }

        return { id: '1', name: 'Edgar', email: 'admin@example.com' };
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
  },
  secret: process.env.NEXTAUTH_SECRET,
};
