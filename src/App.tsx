import React from "react";
import Router from "./components/Router";
import ARBridge from "./components/ARBridge";
import Session from "./components/Session";

export default () => {
  return (
    <Session>
      <ARBridge>
        <Router />
      </ARBridge>
    </Session>
  );
};
