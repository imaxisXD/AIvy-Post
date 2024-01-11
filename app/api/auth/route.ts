import createAuthClient from "@/utils/authClient";
import { generateSecureString } from "@/utils/pkce";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const authClient = await createAuthClient();
    const secureString = generateSecureString();
    console.log(secureString);
    cookies().set({
      name: "secure_cookie",
      value: secureString,
      secure: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    const authUrl = authClient.generateAuthURL({
      state: process.env.STATE!,
      code_challenge_method: "plain",
      code_challenge: secureString,
    });
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
