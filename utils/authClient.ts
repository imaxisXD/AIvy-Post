// utils/authClient.ts
"use server";
import { auth } from "twitter-api-sdk";

async function createAuthClient() {
  const authClient = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID!,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
    callback: "http://127.0.0.1:3000/api/callback",
    scopes: ["tweet.read", "users.read", "tweet.write", "offline.access"],
  });

  return authClient;
}

export default createAuthClient;
