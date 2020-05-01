import React from "react";
import Router from "./components/Router";
import Session from "./components/Session";

export default () => {
  return (
    <Session>
      <Router />
    </Session>
  );
};
