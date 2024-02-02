import createAuthClient from "@/utils/authClient";
import { cookies } from "next/headers";
import Client from "twitter-api-sdk";
import { RedirectType, redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const cookieStore = cookies();
  const secureCookie = cookieStore.get("secure_cookie");

  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (!state || state !== process.env.STATE || !code) {
    return new Response(
      "Auth Error - Code or State not present or doesn't match",
      {
        status: 403,
      }
    );
  }
  const user = await currentUser();
  console.log("_---------USER--> ", user);

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
      await fetchMutation(api.users.setUserDetails, {
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
  return NextResponse.json({ user }, { status: 200 });
  // redirect("http://127.0.0.1:3000/dashboard/settings", RedirectType.replace);
}
