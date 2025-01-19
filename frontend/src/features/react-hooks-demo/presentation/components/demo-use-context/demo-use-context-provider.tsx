import { createContext } from "react";

interface ContextModel {
  sharedColor: "cyan" | "pink";
  toggleSharedColor?: () => void;
}

export const DemoUseContextProvider = createContext<ContextModel>({
  sharedColor: "cyan",
});
