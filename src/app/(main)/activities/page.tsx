import CompletedTasksChart from "@/components/Activities/CompletedTasksChart";
import LatestTasks from "@/components/Activities/LatestTasks";
import ProgressChart from "@/components/Activities/ProgressChart";
import RecentSubtasks from "@/components/Activities/RecentSubtasks";
import TasksStatistics from "@/components/Activities/TasksStatistics";

const Activities = () => {
  return (
    <main
      className="grid md:grid-cols-2 lg:grid-cols-3
      overflow-y-auto max-h-[calc(100vh-97.5px)] min-h-[calc(100vh-97.5px)]
      h-[calc(100vh-97.5px)] p-3 pb-10 md:pb-3 gap-3"
    >
      {/* Tasks and tasks statistics  */}
      <section className="flex flex-col gap-3">
        <CompletedTasksChart />
        <TasksStatistics />
      </section>
      <section className="gap-3 flex flex-col">
        <ProgressChart />
        <LatestTasks />
      </section>
      <section className="md:col-span-2 lg:col-span-1 lg:overflow-y-hidden">
        <RecentSubtasks />
      </section>
    </main>
  );
};

export default Activities;
