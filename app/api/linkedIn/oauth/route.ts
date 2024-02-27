import { api } from "@/convex/_generated/api";
import { fetchAction } from "convex/nextjs";
import { getURL } from "@/utils/geturl";
import { getAuthToken } from "@/lib/utils";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
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
      `${getURL()}dashboard/settings?error=${errorQuery}`,
      302
    );
  }
  console.log("Api Logs | User Application State ", state);
  try {
    const token = await getAuthToken();
    if (token == null) {
      return Response.redirect("/login", 302);
    }
    const data = await fetchAction(
      api.oauth.getAccessTokenAndStoreIt,
      { code },
      { token }
    );
    if (data) {
      return Response.redirect(
        `${getURL()}dashboard/settings?sucess=connected`,
        302
      );
    } else {
      const errorMessage = encodeURIComponent(
        "Encountered error while connecting your account, please try again."
      );
      return Response.redirect(
        `${getURL()}dashboard/settings?error=${errorMessage}`,
        302
      );
    }
  } catch (error) {
    console.log("Api Logs | Error in getting access token api");
    const errorMessage = encodeURIComponent(
      "An error occurred, please try again."
    );
    return Response.redirect(
      `${getURL()}dashboard/settings?error=${errorMessage}`,
      302
    );
  }
}
