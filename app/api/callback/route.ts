import createAuthClient from "@/utils/authClient";
import { cookies } from "next/headers";
import Client from "twitter-api-sdk";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const cookieStore = cookies();
  const secureCookie = cookieStore.get("secure_cookie");

  if (!state || state !== process.env.STATE || !code) {
    return new Response(
      "Auth Error - Code or State not present or doesn't match",
      {
        status: 403,
      }
    );
  }
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const authClient = await createAuthClient();
    authClient.generateAuthURL({
      state: process.env.STATE!,
      code_challenge_method: "plain",
      code_challenge: secureCookie?.value!,
    });
    const tokenResponse = await authClient.requestAccessToken(code);
    const client = new Client(authClient);
    const userDetails = await client.users.findMyUser({
      "user.fields": ["name", "id"],
    });

    try {
      //Convex insert users data
      const addedToDB = convex.mutation(api.users.setUserDetails, {
        name: userDetails.data?.name!,
        email: user?.primaryEmailAddressId!,
        t_access_token: tokenResponse.token.access_token!,
        t_refresh_token: tokenResponse.token.refresh_token!,
        t_expires: tokenResponse.token.expires_at!,
        t_id: userDetails.data?.id!,
      });
    } catch (error) {
      console.error("Convex Error | ", error);
    }
  } catch (error) {
    console.error("Auth Error | ", error);
    return new Response("Auth Error - Check logs for more information", {
      status: 500,
    });
  }
  console.log("Redirecting ...");
  NextResponse.redirect("/dashboard/settings");
}
