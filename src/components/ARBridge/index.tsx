import ARController from "./ARController";
import { createContext } from "react";

export type ARContextType = {
  arController: ARController;
};
//@ts-ignore
const defaultARContext: ARContextType = {};
export const ARContext = createContext(defaultARContext);
