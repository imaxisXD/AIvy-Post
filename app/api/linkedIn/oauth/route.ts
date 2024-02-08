import { api } from "@/convex/_generated/api";
import { fetchAction } from "convex/nextjs";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  const { searchParams } = new URL(request.url!);

  const state = searchParams.get("state");
  const errorQuery = searchParams.get("error");
  const code = searchParams.get("code");

  if (state != process.env.STATE || state == null || code == null) {
    return new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized Call",
    });
  }
  if (errorQuery) {
    const errorQuery = searchParams.get("error_description");
    console.log("Api Logs | Error in LinkedIn Api ", errorQuery);
    return Response.redirect(
      `http://localhost:3000/dashboard/settings?error=${errorQuery}`,
      302
    );
  }
  console.log("Api Logs | User Application State ", state);
  try {
    const data = await fetchAction(api.oauth.getAccessTokenAndStoreIt, {
      code,
    });

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.log("Api Logs | Error in getting access token api");
    const errorMessage = encodeURIComponent(
      "An error occurred, please try again."
    );
    return Response.redirect(
      `http://localhost:3000/dashboard/settings?message=${errorMessage}`,
      302
    );
  }
}
