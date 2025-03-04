"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { differenceInDays, differenceInHours, format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { TaskInitialStateTypes } from "@/features/taskSlice";
import DateRangeSelector, { DateRangeTypes } from "./DateRangeSelector";
import { RawUserTypes } from "@/types/userTypes";

export const description = "A bar chart showing completed subtasks over time";

// Define chart configuration, with labels and color schemes for each data type
const chartConfig = {
  Completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CompletedSubtasksChart = () => {
  const { tasks } = useSelector<RootState, TaskInitialStateTypes>(
    (state) => state.task
  );

  const {
    id: userId,
    createdAt,
    subtaskCompletionHistory,
  } = useSelector<RootState, RawUserTypes>((state) => state.user.userInfo);

  console.log(subtaskCompletionHistory)
  // Generate ranges of start and limit dates based on the user's signup date
  const generateDateRanges = useCallback(() => {
    if (!createdAt) return [];
    const signupDate = new Date(createdAt);
    const today = new Date();

    let totalDays = Math.ceil(differenceInHours(today, signupDate) / 24);

    const limitDate = new Date(
      new Date().setDate(signupDate.getDate() + totalDays)
    );
    totalDays =
      today.getDate() < limitDate.getDate() ? totalDays - 1 : totalDays;

    if (!totalDays) {
      return [
        {
          start: today.toISOString().split("T")[0],
          limit: today.toISOString().split("T")[0],
        },
      ];
    }

    const increment = 5; // Days per range
    const skip = 6; // Days to skip for next range
    let currentStart = 0;
    const ranges: DateRangeTypes[] = [];

    // Loop to generate date ranges
    while (currentStart < totalDays) {
      const start = new Date(signupDate);
      const end = new Date(signupDate);

      // Set start and limit dates for each range based on increment and skip values
      const limitDays = Math.min(currentStart + increment, totalDays);
      start.setDate(signupDate.getDate() + currentStart);
      end.setDate(signupDate.getDate() + limitDays);

      ranges.push({
        start: start.toISOString().split("T")[0],
        limit: end.toISOString().split("T")[0],
      });
      // Update start for the next iteration
      currentStart += skip;
    }

    return ranges;
  }, [createdAt]);

  const dateRanges = generateDateRanges();
  // Initialize selected date range with the first range in the list
  const [selectedRange, setSelectedRange] = useState(
    dateRanges[dateRanges.length - 1]
  );

  useEffect(() => {
    if (selectedRange) return;
    setSelectedRange(dateRanges[dateRanges.length - 1]);
  }, [dateRanges]);

  // Generate data points for completed subtasks within the selected date range
  const completedSubtasksData = useMemo(() => {
  if (!userId || !selectedRange || !subtaskCompletionHistory) return [];
  
  const start = new Date(selectedRange.start);
  const end = new Date(selectedRange.limit);
  const totalDays = differenceInDays(end, start);

  // Generate list of dates within the selected range
  const dateList = Array.from({ length: totalDays + 1 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date.toISOString().split("T")[0]; // Ensure uniform YYYY-MM-DD format
  });

  return dateList.map((date) => {
    const matchedSubtask = subtaskCompletionHistory.find(
      (subtask) => subtask.day.trim() === date.trim() // Ensuring exact string match
    );

    return {
      date,
      Completed: matchedSubtask ? matchedSubtask.subtasksCompleted.length : 0,
    };
  });
}, [tasks, selectedRange, userId, subtaskCompletionHistory]);
  console.log(subtaskCompletionHistory,completedSubtasksData,selectedRange)

  return (
    <Card className="border-none w-full bg-secondary rounded flex-grow">
      <CardHeader>
        <CardTitle>Completed Subtasks</CardTitle>
        <CardDescription>
          {selectedRange ? (
            <DateRangeSelector
              selectedRange={selectedRange}
              options={dateRanges}
              setSelectedRange={setSelectedRange}
            />
          ) : (
            <>Loading...</>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart
            data={completedSubtasksData}
            margin={{ top: 0, right: 0, left: -40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey={(value) => {
                return value?.date ? `${format(value.date, "EEE, MMM d")}` : "";
              }}
              tickFormatter={(date) => {
                return date.split(",")[1];
              }}
              interval={0}
              height={70}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <YAxis />
            <Bar
              dataKey="Completed"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm">
        <div className="leading-none text-muted-foreground">
          Showing completed subtasks over time
        </div>
      </CardFooter>
    </Card>
  );
};

export default CompletedSubtasksChart;
