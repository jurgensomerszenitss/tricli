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
    async authorized({ auth }) { 
      return !!auth
    }, 
  },  
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