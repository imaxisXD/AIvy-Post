"use client";
import { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { ITimezone, useTimezoneSelect } from "react-timezone-select";

function Timezone() {
  const [timezone, setTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const { options, parseTimezone } = useTimezoneSelect({});

  const handleTimezoneChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.currentTarget.value);
  };

  return (
    <div className="mb-1 flex flex-col gap-1.5 py-3 ">
      <Label
        htmlFor="timezone"
        className="w-full font-urban text-[15px] font-medium"
      >
        Timezone
      </Label>
      <select
        name="timezone"
        id="timezone"
        required
        value={parseTimezone(timezone).value}
        onChange={handleTimezoneChange} // Update the state when the user selects a different option
        className="max-w-96 cursor-pointer rounded-md border border-[#e3e3e3] px-3 py-1.5 text-sm text-gray-700 shadow-sm transition-all duration-150 ease-linear hover:bg-accent focus:outline-none focus:ring-1 focus:ring-[#d8d8de]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Timezone;
