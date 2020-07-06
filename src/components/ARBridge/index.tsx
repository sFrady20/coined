import ARController from "./ARController";
import { createContext } from "react";

export type ARContextType = {
  arController?: ARController;
};
const defaultARContext: ARContextType = {
  arController: undefined,
};
export const ARContext = createContext(defaultARContext);
