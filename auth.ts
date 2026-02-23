import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { loginFormSchema } from "@/app/lib/schemas"

import { createUser } from '@/app/lib/commands'
import { getUser } from './app/lib/queries';

dotenv.config();

export const authConfig = {
  pages: {
    signIn: '/',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // async jwt({ token, account }) {
    //   // Persist access token
    //   if (account) {
    //     token.accessToken = account.access_token;
    //     token.idToken = account.id_token;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   // console.log(session)
    //   return session;
    // },
    async authorized({ auth }) {
      // console.log(auth)
      return !!auth
    },
    // async redirect({url, baseUrl}) {
    //   return baseUrl
    // }
  },
  // providers: [Keycloak],

  providers: [
    CredentialsProvider({
      async authorize(credentials): Promise<any> {
        console.log("parsing credentials")
        const parsedCredentials = loginFormSchema.safeParse(credentials); 

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data; 
          const user = await getUser(email) 

          if (user) {
            const passwordsMatch = await bcrypt.compare(password, user.password);

            console.log(passwordsMatch)
            if (passwordsMatch) return user;
          }

          console.log('Invalid credentials');
          return null;
        }
      }
    }),
  ],

} satisfies NextAuthConfig;


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
});

// https://authjs.dev/getting-started/installation