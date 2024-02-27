"use client";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { campaignFormSubmit } from "@/utils/actions";
import { Label } from "@/components/ui/label";
import Timezone from "@/components/timezone";
import CampaignSubmitButton from "./campaign-submit";

export default function CampaignForm() {
  const today = new Date();
  const maxDate = addDays(today, 30);

  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: maxDate,
  });

  const timeOptions = [
    "12:00 AM",
    "12:30 AM",
    "01:00 AM",
    "01:30 AM",
    "02:00 AM",
    "02:30 AM",
    "03:00 AM",
    "03:30 AM",
    "04:00 AM",
    "04:30 AM",
    "05:00 AM",
    "05:30 AM",
    "06:00 AM",
    "06:30 AM",
    "07:00 AM",
    "07:30 AM",
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
  ];
  async function serverAction(formData: FormData) {
    campaignFormSubmit(formData);
  }
  return (
    <form
      action={serverAction}
      className="border-[#d8d8de] border pt-4 pb-6 rounded-b-lg border-x flex-col gap-3 items-start justify-between bg-[#fefffe] px-10 w-full drop-shadow-md"
    >
      <div className="flex flex-col gap-1.5 py-3 mb-1">
        <Label
          htmlFor="name"
          className="font-urban font-medium text-[15px] w-full"
        >
          Campaign name
        </Label>
        <input
          placeholder="My Campaign"
          type="text"
          pattern="[A-Za-z]+"
          title="Name should only contain letters. No numbers, spaces or emojis allowed."
          name="name"
          id="name"
          minLength={3}
          maxLength={10}
          required
          className="text-sm drop-shadow-sm max-w-52 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-gray-700 px-3 py-1.5 border border-[#e3e3e3] rounded-md focus:outline-none focus:ring-1 focus:ring-green-400 transition-all duration-150 ease-linear"
        />
      </div>
      <div className="flex flex-col gap-1.5 py-3 mb-1">
        <div className={cn("grid gap-1")}>
          <Label className="font-urban font-medium text-[15px] w-full">
            Campaign duration
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start drop-shadow-sm text-left font-normal text-gray-700 px-3 py-1",
                  !date && "text-gray-700"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <span className="text-gray-700">
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </span>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span className="text-gray-700">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={{
                  before: today,
                }}
                fromMonth={today}
                max={30}
                min={3}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <input
        required
        type="hidden"
        name="startDate"
        value={date?.from ? format(date.from, "yyyy-MM-dd") : ""}
      />
      <input
        required
        type="hidden"
        name="endDate"
        value={date?.to ? format(date.to, "yyyy-MM-dd") : ""}
      />
      <div className="flex flex-col gap-1.5 py-3 mb-1">
        <Label
          htmlFor="postingTime"
          className="font-urban font-medium text-[15px] w-full"
        >
          Posting time
        </Label>
        <select
          name="postingTime"
          id="postingTime"
          required
          className="text-sm shadow-sm hover:bg-accent cursor-pointer text-gray-700 px-3 py-1.5 border border-[#e3e3e3] rounded-md w-28 focus:outline-none focus:ring-1 focus:ring-[#d8d8de] transition-all duration-150 ease-linear"
        >
          <option value="" disabled selected hidden>
            Click here
          </option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <Timezone />
      <div className="flex justify-end items-center w-full">
        <CampaignSubmitButton />
      </div>
    </form>
  );
}
