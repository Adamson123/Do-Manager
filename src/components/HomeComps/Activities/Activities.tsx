import Chart from "./Chart";
import TasksStatistics from "./TasksStatistics";

const Activities = () => {
  return (
    <section
      style={{
        scrollbarWidth: "thin",
      }}
      className="grid md:grid-cols-2 lg:grid-cols-3
     overflow-y-auto"
    >
      {/* Tasks and tasks statistics  */}
      <section className="flex flex-col p-3 gap-3">
        <Chart />
        <TasksStatistics />
      </section>
      <section></section>
      <section></section>
    </section>
  );
};

export default Activities;
