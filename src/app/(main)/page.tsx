"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import debounce from "@/utils/debounce";
import useCreateSubtask from "@/hooks/useCreateSubtask";
import dynamic from "next/dynamic";

const Tasks = dynamic(() => import("@/components/Home/Tasks/Tasks"), {
  ssr: false,
});
//dynamic import will only reflect well in small devices
const SubTasks = dynamic(() => import("@/components/Home/Subtasks/Subtasks"), {
  ssr: false,
});
const Drawer = dynamic(
  () => import("@/components/ui/drawer").then((mod) => mod.Drawer),
  { ssr: false }
);
const DrawerContent = dynamic(
  () => import("@/components/ui/drawer").then((mod) => mod.DrawerContent),
  { ssr: false }
);
const DrawerTrigger = dynamic(
  () => import("@/components/ui/drawer").then((mod) => mod.DrawerTrigger),
  { ssr: false }
);

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
      //show draw only when the window width is less 900
      //!768 before
      setShowDraw(window.innerWidth < 900);
    }, 200);
    updateShowDraw();

    window.addEventListener("resize", updateShowDraw);

    return () => {
      window.removeEventListener("resize", updateShowDraw);
    };
  }, []);

  return (
    //md:flex-row
    <main
      className="flex min-w-full
      max-h-screen min-h-screen h-screen"
    >
      <section className="w-full bmd:min-w-[60%] bmd:pr-[40%]">
        <Tasks setOpenDrawer={setOpenDrawer} />
      </section>

      {/* Right section for larger screens */}
      {(!showDraw || dialogOpen) && (
        <aside
          className="hidden
          bmd:flex border-l border-darkerBg min-h-screen
          fixed right-0 top-0 bottom-0 bmd:w-[40%]"
        >
          <SubTasks
            setCreateDialogOpen={setDialogOpen}
            createDialogOpen={dialogOpen}
            showMore={showMore}
            setShowMore={setShowMore}
            globalCreateSubtask={globalCreateSubtask}
          />
        </aside>
      )}

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
            aria-describedby={"subtasks on mobile device"}
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
