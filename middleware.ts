import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from "jsonwebtoken";
const secret = process.env.SECRET;
import{jwtVerify, type JWTPayload } from 'jose'

export default async function middleware(req: NextRequest,) {

  const jwt = req.cookies.get('OurSideJWT')?.value;

  const url = req.url;

  if (url.includes("/dashboard")) {
    console.log( jwt );


    if (jwt === undefined) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.rewrite(url);
    }

  

    try {
      await jwtVerify(jwt, new TextEncoder().encode(secret) )
      console.log( 'JwtAproved' );
      return NextResponse.next();
    } catch (error) {
      console.log( 'JwtRecusado!')
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
