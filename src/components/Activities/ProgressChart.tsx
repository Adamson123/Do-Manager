"use client";

import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { TaskInitialStateTypes } from "@/features/taskSlice";

export const description = "A donut chart with text";

const ProgressChart = () => {
  const { tasks } = useSelector<RootState, TaskInitialStateTypes>(
    (state) => state.task
  );

  const progress = useMemo(() => {
    let high = 0;
    let medium = 0;
    let low = 0;
    const allSubtasks = tasks.flatMap((task) =>
      task.subtasks.map((subtask) => {
        return { ...subtask, priority: task.priority };
      })
    );

    let completed = 0;
    allSubtasks
      .filter((subtask) => subtask.completed)
      .forEach((subtask) => {
        completed++;
        switch (subtask.priority) {
          case "HIGH":
            high++;
            break;
          case "MEDIUM":
            medium++;
            break;
          default:
            low++;
            break;
        }
      });

    const percentage = (completed * 100) / allSubtasks.length || 0;
    const roundedPercentage = Math.round(percentage);

    const chartData = [
      { priority: "high", completed: high, fill: "rgb(var(--highPriority))" },
      {
        priority: "medium",
        completed: medium,
        fill: "rgb(var(--mediumPriority))",
      },
      { priority: "low", completed: low, fill: "rgb(var(--lowPriority))" },
    ];

    const chartConfig = {
      completed: {
        label: "Completed",
      },
      high: {
        label: "High",
        color: "rgb(var(--highPriority))",
      },
      medium: {
        label: "Medium",
        color: "rgb(var(--mediumPriority))",
      },
      low: {
        label: "Low",
        color: "rgb(var(--lowPriority))",
      },
    };

    return { chartData, chartConfig, roundedPercentage };
  }, [tasks]);

  return (
    <Card className="flex flex-col border-none bg-secondary rounded flex-grow">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-[17px]">Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={progress.chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={progress.chartData}
              dataKey="completed"
              nameKey="priority"
              innerRadius={45}
              strokeWidth={7}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {progress.roundedPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Completed
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
