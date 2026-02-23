"use server"

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
// import { loginFormSchema, LoginFormValues } from './schemas';

// const Login = loginFormSchema.omit({});

export async function authenticate( 
  prevState:any,
  formData :FormData, 
) {
  try { 
    const redirectTo = formData.get('redirectTo') as string || '/dashboard';
    await signIn('credentials', { 
        ...Object.fromEntries(formData),
        redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
