"use client";
import SubTasks from "@/components/HomeComps/Subtasks/Subtasks";
import TabNav from "@/components/HomeComps/TabNav/TabNav";
import Tasks from "@/components/HomeComps/Tasks/Tasks";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // const drawerTriggerRef: RefObject<HTMLButtonElement> =
  //   useRef<HTMLButtonElement>(null);
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerContentRef = useRef<HTMLDivElement>(null);
  const [showDraw, setShowDraw] = useState(true);
  //prevent dialog from closing when window's screen is being resized
  const [dialogOpened, setDialogOpened] = useState(false);
  const [focusedTab, setFocusedTab] = useState("Tasks");

  useEffect(() => {
    window.addEventListener("resize", () => {
      // const height = "100vh";
      // if (drawerContentRef.current)
      //   drawerContentRef.current.style.height = height;
      if (window.innerWidth >= 768) {
        setShowDraw(false);
      } else {
        setShowDraw(true);
      }
    });
  }, []);

  return (
    <div
      className="flex flex-col md:flex-row min-w-full
     max-h-screen overflow-hidden min-h-screen"
    >
      {/* Left section */}
      <div className="w-[100%] md:w-[60%] h-screen flex flex-col">
        <Navbar />
        <TabNav focusedTab={focusedTab} setFocusedTab={setFocusedTab} />
        <Tasks drawerTriggerRef={drawerTriggerRef} />
      </div>
      {/* Right section */}
      {(!showDraw || dialogOpened) && (
        <div
          className="w-[40%] hidden md:flex border-l 
            border-darkerBg min-h-screen"
        >
          <SubTasks setDialogOpened={setDialogOpened} />
        </div>
      )}

      {/* SubTask drawer :sm devices */}
      {/* <div className="flex md:hidden"> */}
      {(showDraw || dialogOpened) && (
        <Drawer>
          <DrawerTrigger asChild ref={drawerTriggerRef}>
            <Button
              variant="outline"
              className="w-0 h-0 p-0 opacity-0 pointer-events-none"
            ></Button>
          </DrawerTrigger>
          <DrawerContent
            ref={drawerContentRef}
            className="min-h-[calc(100vh-15%)] h-[calc(100vh-15%)]"
          >
            <DialogTitle />
            <SubTasks setDialogOpened={setDialogOpened} />
          </DrawerContent>
        </Drawer>
      )}
      {/* </div> */}
    </div>
  );
}
