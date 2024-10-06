"use client";
import SubTasks from "@/components/HomeComps/SubTasks/SubTasks";
import Tasks from "@/components/HomeComps/Tasks/Tasks";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import { RefObject, useEffect, useRef, useState } from "react";

export default function Home() {
  const drawerTriggerRef: RefObject<HTMLButtonElement> =
    useRef<HTMLButtonElement>(null);
  const [showDraw, setShowDraw] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
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
      <div className="w-[100%] md:w-[60%] h-screen">
        <Navbar />
        <Tasks drawerTriggerRef={drawerTriggerRef} />
      </div>
      {/* Right section */}
      <div
        className=" md:w-[40%] hidden md:flex border-l 
        border-darkerBg min-h-screen"
      >
        <SubTasks />
      </div>
      {/* SubTask drawer :sm devices */}
      {/* <div className="flex md:hidden"> */}
      {showDraw && (
        <Drawer>
          <DrawerTrigger asChild ref={drawerTriggerRef}>
            <Button
              variant="outline"
              className="p-0 h-0 w-0 overflow-hidden
               opacity-0 pointer-events-none"
            ></Button>
          </DrawerTrigger>
          <DrawerContent className="h-[calc(100vh-15%)]">
            <DialogTitle />
            <SubTasks />
          </DrawerContent>
        </Drawer>
      )}
      {/* </div> */}
    </div>
  );
}
