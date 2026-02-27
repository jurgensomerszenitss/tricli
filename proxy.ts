import { auth } from '@/auth'; 
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  // Check for authentication
  const session = await auth(); 
  
  // if (request.nextUrl.pathname !== '/' && !session) {  
  //   return NextResponse.redirect(new URL(`/?callbackUrl=${request.url}`, request.url)) 
  // }
 
  return NextResponse.next();
}
 

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} 

