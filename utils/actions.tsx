"use server";
import * as v from "valibot";
import { parse } from "date-fns";
import { convertTimeToUTC } from "@/lib/utils";
import { auth } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";

import { fetchMutation } from "convex/nextjs";
import { getAuthToken } from "@/app/api/linkedIn/oauth/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CAMPAIGNFORMSCHEMA = v.object({
  name: v.string([
    v.maxLength(10, "Name should be less than 10 characters"),
    v.minLength(3, "Name should be greater than 3 characters"),
    v.regex(/^[A-Za-z]+$/, "Name should only contain letters"),
  ]),
  startDate: v.date("Invalid date format"),
  endDate: v.date("Invalid date format"),
  postingTime: v.string([v.isoTimestamp("Not a valid time")]),
  timezone: v.string(),
});
const formatString = "yyyy-MM-dd";

export async function campaignFormSubmit(formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    console.error("You must be signed in to create a campaign");
    redirect("/login");
  }
  const validatedFormData = v.safeParse(CAMPAIGNFORMSCHEMA, {
    name: formData.get("name"),
    startDate: parse(
      formData.get("startDate")?.toString()!,
      formatString,
      new Date()
    ),
    endDate: parse(
      formData.get("endDate")?.toString()!,
      formatString,
      new Date()
    ),
    postingTime: parse(
      formData.get("postingTime")?.toString()!,
      "h:mm a",
      new Date()
    ).toISOString(),
    timezone: formData.get("timezone"),
  });

  if (validatedFormData.success) {
    const resultUTC = convertTimeToUTC(
      formData.get("startDate")?.toString()!,
      formData.get("postingTime")?.toString()!,
      formData.get("timezone")?.toString()!
    );
    const token = await getAuthToken();
    const result = await fetchMutation(
      api.campaign.insertCampaignData,
      {
        endDate: formData.get("startDate")?.toString()!,
        name: formData.get("name")?.toString()!,
        postingTime: formData.get("postingTime")?.toString()!,
        startDate: formData.get("startDate")?.toString()!,
        timezone: formData.get("timezone")?.toString()!,
        utc_postingTime: resultUTC.toISOString(),
      },
      { token }
    );
    if (result.status != "success") {
      //
    }
  } else {
    console.log(validatedFormData.issues);
    redirect("/dashboard/campaign/new");
  }

  redirect("/dashboard/campaign/");
}
