import { createContext, Dispatch, SetStateAction } from "react";

export interface AppLayoutContextTypes {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
}

// Create and export the context
const appLayoutContext = createContext<AppLayoutContextTypes>({
  setSearch: () => {},
  search: "",
});

export default appLayoutContext;
