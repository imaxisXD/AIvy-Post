"use server";
import createAuthClient from "@/utils/authClient";
import { generateSecureString } from "@/utils/pkce";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function twitterLinkAction() {
  const authClient = await createAuthClient();
  const secureString = generateSecureString();
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
  console.log(secureString);

  redirect(authUrl);
}
