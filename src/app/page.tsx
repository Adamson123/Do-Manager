"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header/Header";
import TabNav from "@/components/HomeComps/TabNav";
import Tasks from "@/components/HomeComps/Tasks/Tasks";
import Favorites from "@/components/HomeComps/Favorites/Favorites";
import Activities from "@/components/HomeComps/Activities/Activities";
import SubTasks from "@/components/HomeComps/Subtasks/Subtasks";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import debounce from "@/lib/debounce";

export default function Home() {
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerContentRef = useRef<HTMLDivElement>(null);

  // State variables
  const [showDraw, setShowDraw] = useState(true);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [focusedTab, setFocusedTab] = useState("Tasks");
  const [showMore, setShowMore] = useState(false);

  // Handle screen resizing
  useEffect(() => {
    const updateShowDraw = debounce(() => {
      setShowDraw(window.innerWidth < 768);
    }, 200);

    updateShowDraw();
    window.addEventListener("resize", updateShowDraw);

    return () => {
      window.removeEventListener("resize", updateShowDraw);
    };
  }, []);

  // Render the section content based on the focused tab
  const section = () => {
    switch (focusedTab) {
      case "Tasks":
        return <Tasks drawerTriggerRef={drawerTriggerRef} />;
      case "Favorites":
        return <Favorites />;
      default:
        return <Activities />;
    }
  };

  return (
    <main
      className={`flex flex-col md:flex-row min-w-full
         max-h-screen overflow-hidden min-h-screen`}
    >
      {/* Left section */}
      <section
        className={`w-full ${
          focusedTab === "Tasks" ? "md:w-[60%]" : "md:w-full"
        } h-screen flex flex-col`}
      >
        <Header />
        <TabNav focusedTab={focusedTab} setFocusedTab={setFocusedTab} />
        {section()}
      </section>

      {/* Right section for larger screens */}
      {(!showDraw || dialogOpened) && (
        <section
          className={`w-[40%] hidden ${
            focusedTab === "Tasks" && "md:flex"
          } border-l border-darkerBg min-h-screen`}
        >
          <SubTasks
            setDialogOpened={setDialogOpened}
            showMore={showMore}
            setShowMore={setShowMore}
          />
        </section>
      )}

      {/* Drawer for smaller screens */}
      {(showDraw || dialogOpened) && (
        <Drawer>
          <DrawerTrigger asChild ref={drawerTriggerRef}>
            <Button
              variant="outline"
              className="w-0 h-0 p-0 opacity-0 pointer-events-none"
            />
          </DrawerTrigger>
          <DrawerContent
            ref={drawerContentRef}
            className="min-h-[calc(100vh-15%)] h-[calc(100vh-15%)]"
          >
            <DialogTitle />
            <SubTasks
              setDialogOpened={setDialogOpened}
              showMore={showMore}
              setShowMore={setShowMore}
            />
          </DrawerContent>
        </Drawer>
      )}
    </main>
  );
}
