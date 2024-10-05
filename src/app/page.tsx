import Tasks from "@/components/HomeComps/Tasks/Tasks";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div className="flex max-h-screen overflow-hidden min-h-screen">
      {/* Left section */}
      <div className="w-[100%] md:w-[60%] h-screen">
        <Navbar />
        <Tasks />
      </div>
      {/* Right section */}
      <div className="md:w-[40%] hidden md:visible"></div>
    </div>
  );
}
