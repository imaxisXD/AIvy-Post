import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { zonedTimeToUtc } from "date-fns-tz";
import { format, parse } from "date-fns";
import { auth } from "@clerk/nextjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTimeToUTC(
  startDate: string,
  time: string,
  timezone: string
) {
  const formatString = "yyyy-MM-dd hh:mm a";

  const parsedTime = parse(time, "h:mm a", new Date());
  const formattedTime = format(parsedTime, "HH:mm:ss");

  console.debug(
    "API Logs | Time and start date and timezon of the user: ",
    time,
    startDate,
    timezone
  );

  const parsedDate = parse(
    `${startDate} ${time}`,
    formatString,
    new Date()
  ).toLocaleString();

  console.log("API Logs | Parsed time and start date : ", parsedDate);
  const utcTime = zonedTimeToUtc(`${startDate} ${formattedTime}`, timezone);
  console.log("API Logs | Time in UTC  : ", utcTime.toLocaleString());
  console.log("API Logs | Time in UTC sent to cron : ", utcTime);

  return utcTime;
}

export function getRandomColor() {
  const colors = [
    "purple",
    "blue",
    "green",
    "yellow",
    "pink",
    "emerald",
    "sky",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export async function getAuthToken() {
  return (await auth().getToken({ template: "convex" })) ?? undefined;
}

export function abbreviateNumber(number: number) {
  const SI_SYMBOL = ["", "K", "M", "B", "T"];

  // Find the index of the appropriate suffix
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // If tier is 0, return the original number
  if (tier === 0) return number;

  // Get the suffix and adjust the number
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  // Check if the scaled number is an integer
  const isInteger = scaled % 1 === 0;

  // Format the number appropriately
  let formattedNumber;
  if (isInteger) {
    formattedNumber = scaled.toFixed(0);
  } else {
    formattedNumber = scaled.toFixed(1);
  }

  return formattedNumber + suffix;
}
