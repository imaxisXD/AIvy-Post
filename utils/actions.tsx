"use server";
import * as v from "valibot";
import { parse } from "date-fns";
import { convertTimeToUTC } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { toast } from "sonner";
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
    redirect("http://localhost:3000/");
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
    console.log(formData);
    console.log("UTC", resultUTC);
  } else {
    console.log(validatedFormData.issues);
    redirect("http://localhost:3000/dashboard/campaign/new");
  }
}
