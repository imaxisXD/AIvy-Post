import { createClient } from "@/utils/supabase/server";
import createAuthClient from "@/utils/authClient";
import { cookies } from "next/headers";
import Client from "twitter-api-sdk";

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
  console.log(user?.email);

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
      "user.fields": ["description", "name", "profile_image_url", "entities"],
    });

    // await client.tweets.createTweet({
    //   text: "HI 👋",
    // });

    const { data, error, status, statusText } = await supabase
      .from("userdata")
      .insert({
        name: userDetails.data?.name,
        refresh_token: tokenResponse.token.refresh_token,
        access_token: tokenResponse.token.access_token,
        expires_at: tokenResponse.token.expires_at,
      });
    console.log(data, error, status, statusText);

    return new Response(JSON.stringify(userDetails), {
      status: 200, // OK status code
    });
  } catch (error) {
    console.error("Auth Error | ", error);
    return new Response("Auth Error - Check logs for more information", {
      status: 500,
    });
  }
}
