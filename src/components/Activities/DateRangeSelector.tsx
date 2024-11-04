"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import { format, parseISO } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for start and limit dates for each interval
export interface DateRangeTypes {
  start: string;
  limit: string;
}

interface DateRangeSelectorProps {
  selectedRange: DateRangeTypes;
  setSelectedRange: Dispatch<SetStateAction<DateRangeTypes>>;
  options: DateRangeTypes[];
  className?: string;
}

// Component for date range selection dropdown
const DateRangeSelector = ({
  selectedRange,
  setSelectedRange,
  options,
  className = "border-none h-[20px]",
}: DateRangeSelectorProps) => {
  const formatRange = (range: DateRangeTypes) => {
    const start = format(parseISO(range.start), "MMM d, yyyy");
    const limit = format(parseISO(range.limit), "MMM d, yyyy");
    return `${start} - ${limit}`;
  };

  // Create a lookup table to map date ranges to their indices for quick retrieval
  const rangeIndexMap = useMemo(() => {
    const indexMap: Record<string, number> = {};
    options.forEach((range, index) => {
      const key = formatRange(range);
      indexMap[key] = index;
    });
    return indexMap;
  }, [options]);

  return (
    <Select
      value={formatRange(selectedRange)}
      onValueChange={(value) => {
        setSelectedRange(options[rangeIndexMap[value]]);
      }}
    >
      <SelectTrigger className={`w-auto rounded flex gap-2 ${className}`}>
        <SelectValue
          placeholder={formatRange(selectedRange)}
          defaultValue={0}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((range, index) => (
            <SelectItem value={formatRange(range)} key={index}>
              <span className="text-[12p]">{formatRange(range)}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DateRangeSelector;
