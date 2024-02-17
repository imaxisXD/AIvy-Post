import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { zonedTimeToUtc } from "date-fns-tz";
import { format, parse } from "date-fns";

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

  console.log(
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
