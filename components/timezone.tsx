"use client";

import { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { ITimezone, useTimezoneSelect } from "react-timezone-select";

function Timezone() {
  const [timezone, setTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const { options, parseTimezone } = useTimezoneSelect({});

  const handleTimezoneChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col gap-1.5 py-3 mb-1 ">
      <Label
        htmlFor="timezone"
        className="font-urban font-medium text-[15px] w-full"
      >
        Timezone
      </Label>
      <select
        name="timezone"
        id="timezone"
        required
        value={parseTimezone(timezone).value}
        onChange={handleTimezoneChange} // Update the state when the user selects a different option
        className="text-sm cursor-pointer shadow-sm text-gray-700 px-3 py-1.5 border border-[#e3e3e3] rounded-md w-11/12 focus:outline-none focus:ring-1 focus:ring-[#d8d8de] transition-all duration-150 ease-linear"
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
