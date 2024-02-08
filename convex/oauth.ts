import { action, httpAction, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { FunctionReturnType } from "convex/server";
import { number, object, safeParse, string } from "valibot";

const ResponseSchema = object({
  access_token: string(),
  expires_in: number(),
  scope: string(),
});

/*
The below function fetches the access token and save it to database
*/
export const getAccessTokenAndStoreIt = action({
  args: {
    code: v.string(),
  },
  async handler(ctx, args) {
    const url = "https://www.linkedin.com/oauth/v2/accessToken";
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", args.code);
    params.append("redirect_uri", process.env.LINKEDIN_REDIRECT_URL!);
    params.append("client_id", process.env.LINKEDIN_CLIENT_ID!);
    params.append("client_secret", process.env.LINKEDIN_CLIENT_SECRET!);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(
        `Api Logs | Failed to fetch access token: ${response.statusText}`
      );
    }
    const responseData = await response.json();
    const validatedResponse = safeParse(ResponseSchema, responseData);

    if (validatedResponse.success) {
      await ctx.runMutation(internal.users.storeToken, {
        data: validatedResponse.output,
      });
      return validatedResponse.output;
    } else {
      throw new Error(
        "API Logs | Response Data is not matching the validation"
      );
    }
  },
});
