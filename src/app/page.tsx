"use client";

import Tasks from "@/components/HomeComps/Tasks/Tasks";
import { useEffect, useRef, useState } from "react";
import SubTasks from "@/components/HomeComps/Subtasks/Subtasks";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import debounce from "@/utils/debounce";

export default function Home() {
  const drawerContentRef = useRef<HTMLDivElement>(null);
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);

  // State variables
  const [showDraw, setShowDraw] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);
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

  //(!showDraw || dialogOpened) &&
  return (
    <main
      className="flex md:flex-row min-w-full
      max-h-screen min-h-screen h-screen"
    >
      <section className="w-full md:min-w-[60%] md:pr-[40%]">
        <Tasks drawerTriggerRef={drawerTriggerRef} />
      </section>

      {/* Right section for larger screens */}
      {
        <section
          className="hidden
          md:flex border-l border-darkerBg min-h-screen
          fixed right-0 top-0 bottom-0 md:w-[40%]"
        >
          <SubTasks
            setDialogOpened={setDialogOpened}
            showMore={showMore}
            setShowMore={setShowMore}
            dialogOpened={dialogOpened}
          />
        </section>
      }

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
            className="h-[calc(100vh-15%)] min-h-[calc(100vh-15%)]
            max-h-[calc(100vh-15%)]"
          >
            <DialogTitle />
            <SubTasks
              setDialogOpened={setDialogOpened}
              showMore={showMore}
              setShowMore={setShowMore}
              dialogOpened={dialogOpened}
            />
          </DrawerContent>
        </Drawer>
      )}
    </main>
  );
}
