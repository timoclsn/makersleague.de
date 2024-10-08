import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { HTTP_BASIC_AUTH } = process.env;
const [AUTH_USER, AUTH_PASS] = HTTP_BASIC_AUTH.split(":");

export const middleware = (req: NextRequest) => {
  if (!isAuthenticated(req)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }

  return NextResponse.next();
};

const isAuthenticated = (req: NextRequest) => {
  if (req.method !== "GET") return true;

  const authheader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authheader) {
    return false;
  }

  const auth = Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const user = auth[0];
  const pass = auth[1];

  if (user == AUTH_USER && pass == AUTH_PASS) {
    return true;
  } else {
    return false;
  }
};

export const config = {
  matcher: "/admin",
};
