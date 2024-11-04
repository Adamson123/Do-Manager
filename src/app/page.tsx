"use client";

import Tasks from "@/components/Home/Tasks/Tasks";
import { useEffect, useState } from "react";
import SubTasks from "@/components/Home/Subtasks/Subtasks";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import debounce from "@/utils/debounce";
import useCreateSubtask from "@/hooks/useCreateSubtask";

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);
  // State variables
  const [showDraw, setShowDraw] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { action, setAction, triggerCreateSubtask } = useCreateSubtask();
  const globalCreateSubtask = { action, setAction, triggerCreateSubtask };

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

  return (
    <main
      className="flex md:flex-row min-w-full
      max-h-screen min-h-screen h-screen"
    >
      <section className="w-full md:min-w-[60%] md:pr-[40%]">
        <Tasks setOpenDrawer={setOpenDrawer} />
      </section>

      {/* Right section for larger screens */}
      {
        <section
          className="hidden
          md:flex border-l border-darkerBg min-h-screen
          fixed right-0 top-0 bottom-0 md:w-[40%]"
        >
          <SubTasks
            setCreateDialogOpen={setDialogOpen}
            createDialogOpen={dialogOpen}
            showMore={showMore}
            setShowMore={setShowMore}
            globalCreateSubtask={globalCreateSubtask}
          />
        </section>
      }

      {/* Drawer for smaller screens */}
      {(showDraw || dialogOpen) && (
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="w-0 h-0 p-0 opacity-0 pointer-events-none"
            />
          </DrawerTrigger>
          <DrawerContent
            className="h-[calc(100vh-15%)] min-h-[calc(100vh-15%)]
            max-h-[calc(100vh-15%)]"
          >
            <DialogTitle />
            <SubTasks
              setCreateDialogOpen={setDialogOpen}
              createDialogOpen={dialogOpen}
              showMore={showMore}
              setShowMore={setShowMore}
              globalCreateSubtask={globalCreateSubtask}
            />
          </DrawerContent>
        </Drawer>
      )}
    </main>
  );
}
