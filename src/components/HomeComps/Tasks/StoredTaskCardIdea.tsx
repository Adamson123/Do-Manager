import React from "react";

const StoredCardIdeas = () => {
  return (
    <div
      className="border border-[#b18284] w-full
   min-h-32 max-h-32 rounded-lg bg-[#3c3133] 
    p-3 relative overflow-hidden"
    >
      {/* Priority and Option */}

      <div className="flex justify-between">
        {/* Priority */}
        <span
          className="border-[#b18284] border-2 text-[10px] 
         py-[4px] px-[6px] rounded-full text-[#b18284] 
         font-bold tracking-wider flex items-center gap-1"
        >
          High{" "}
          <FlameIcon
            className="h-3 w-3 inline text-[#b18284] fill-current"
            strokeWidth={"3"}
          />
        </span>

        {/* Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontalIcon className="text-[#b18284] cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="text-[10px] border h-[70px] w-[80px]
           border-[#b18284] rounded bg-[#3c3133] z-30 mr-5"
          >
            <DropdownMenuRadioGroup
              className="flex flex-col h-full
           justify-center tracking-wider text-white"
            >
              <DropdownMenuRadioItem
                value="top"
                className="box-border pl-2 border-b border-[#b18284]
                 flex items-center flex-1 cursor-pointer outline-none"
              >
                Edit
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem
                value="bottom"
                className="box-border pl-2 flex items-center flex-1 
                cursor-pointer outline-none"
              >
                Delete
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default StoredCardIdeas;
