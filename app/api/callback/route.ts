import { createClient } from "@/utils/supabase/server";
import createAuthClient from "@/utils/authClient";
import { cookies } from "next/headers";
import Client from "twitter-api-sdk";
import { RedirectType, redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const cookieStore = cookies();
  const secureCookie = cookieStore.get("secure_cookie");
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!state || state !== process.env.STATE || !code) {
    return new Response(
      "Auth Error - Code or State not present or doesn't match",
      {
        status: 403,
      }
    );
  }

  try {
    const authClient = await createAuthClient();
    authClient.generateAuthURL({
      state: process.env.STATE!,
      code_challenge_method: "plain",
      code_challenge: secureCookie?.value!,
    });
    const tokenResponse = await authClient.requestAccessToken(code);
    // const refToken = await authClient.console.log("TOKEN-->", authClient.token);
    //c0FqbkN6dnlzWFpvT2ZXRTktT3NIM19HMk1ZTzVvSVBJM042S250dEdwckhhOjE3MDQ5NzMzNDYxMDY6MTowOmF0OjE

    // 'RkJyWFhoWmxIbTBfUFF5N1lOY2YydVJXVDFPUGZVYTlIU3FnTnUtY0ZrTG10OjE3MDU2OTE4MDUxMzY6MToxOmF0OjE'

    const client = new Client(authClient);
    // await client.tweets.createTweet({
    //   text: "Hi 💫",
    // });

    const userDetails = await client.users.findMyUser({
      "user.fields": ["description", "name", "profile_image_url", "entities"],
    });
    console.log("Token ->", tokenResponse);
    const newToken = await authClient.refreshAccessToken();
    console.log("NEW Token ->", newToken);

    const { data, error, status, statusText } = await supabase
      .from("userdata")
      .insert({
        email: user?.email,
        name: userDetails.data?.name,
        refresh_token: tokenResponse.token.refresh_token,
        access_token: tokenResponse.token.access_token,
        expires_at: tokenResponse.token.expires_at,
      });
    console.log(data, error, status, statusText);
  } catch (error) {
    console.error("Auth Error | ", error);
    return new Response("Auth Error - Check logs for more information", {
      status: 500,
    });
  }
  redirect("/dashboard/settings", RedirectType.replace);
}
