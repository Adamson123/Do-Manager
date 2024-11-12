"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { differenceInDays, format } from "date-fns";

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
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getMultipleTasks, TaskInitialStateTypes } from "@/features/taskSlice";
import DateRangeSelector, { DateRangeTypes } from "./DateRangeSelector";

export const description = "A bar chart showing completed subtasks over time";

// Generate ranges of start and limit dates based on the user's signup date
const generateDateRanges = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(getMultipleTasks());
  }, [dispatch]);

  const signupDate = new Date("2024-9-16");
  const today = new Date();
  const totalDays = differenceInDays(today, signupDate) + 1;
  const increment = 5; // Days per range
  const skip = 5; // Days to skip for next range
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

    console.log({
      limitDays,
      totalDays,
      currentStart: currentStart + increment,
    });

    // Update start for the next iteration
    currentStart += skip;
  }

  return ranges;
};

// Define chart configuration, with labels and color schemes for each data type
const chartConfig = {
  Completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CompletedTasksChart = () => {
  // Initialize selected date range with the first range in the list
  const [selectedRange, setSelectedRange] = useState(generateDateRanges()[0]);
  const { tasks } = useSelector<RootState, TaskInitialStateTypes>(
    (state) => state.task
  );

  // Generate data points for completed subtasks within the selected date range
  const completedSubtasksData = useMemo(() => {
    const start = new Date(selectedRange.start);
    const end = new Date(selectedRange.limit);
    const totalDays = differenceInDays(end, start);

    // Generate list of dates within the selected range
    const dateList = Array.from({ length: totalDays + 1 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date.toISOString().split("T")[0];
    });

    // Retrieve completed subtasks from the task list
    const completedSubtasks = tasks.flatMap((task) =>
      task.subtasks.filter((subtask) => subtask.completed)
    );

    // Count completed subtasks for each date in the range
    return dateList.map((date) => ({
      date,
      Completed: completedSubtasks.filter(
        (subtask) => subtask.dateCompleted.split("T")[0] === date
      ).length,
    }));
  }, [tasks, selectedRange]);

  return (
    <Card className="border-none w-full bg-secondary rounded flex-grow">
      <CardHeader>
        <CardTitle>Completed Subtasks</CardTitle>
        <CardDescription>
          <DateRangeSelector
            selectedRange={selectedRange}
            options={generateDateRanges()}
            setSelectedRange={setSelectedRange}
          />
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

export default CompletedTasksChart;
