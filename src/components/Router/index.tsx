import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import Scan from "../../routes/Scan";
import Transitioner from "./Transitioner";
import Welcome from "../../routes/Welcome";
import CategorySelect from "../../routes/CategorySelect";
import Gameplay from "../../routes/Gameplay";
import Collection from "../../routes/Collection";
import ARBridge from "../ARBridge";
import AnimationExample from "../../routes/AnimationExample";
import GameContextProvider from "../GameContext";
import SessionContextProvider from "../Session";

export const SCAN_SCREEN = "/";
export const WELCOME_SCREEN = "/welcome";
export const CATEGORY_SELECT_SCREEN = "/category";
export const GAMEPLAY_SCREEN = "/play";
export const COLLECTION_SCREEN = "/collection";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/animationExample">
          <AnimationExample />
        </Route>
        <Route path="/">
          {({ location }) => (
            <GameContextProvider>
              <SessionContextProvider>
                <ARBridge>
                  <Transitioner>
                    <Switch location={location}>
                      <Route exact path={WELCOME_SCREEN}>
                        <Welcome />
                      </Route>
                      <Route exact path={CATEGORY_SELECT_SCREEN}>
                        <CategorySelect />
                      </Route>
                      <Route exact path={GAMEPLAY_SCREEN}>
                        <Gameplay />
                      </Route>
                      <Route exact path={COLLECTION_SCREEN}>
                        <Collection />
                      </Route>
                      <Route path={SCAN_SCREEN}>
                        <Scan />
                      </Route>
                    </Switch>
                  </Transitioner>
                </ARBridge>
              </SessionContextProvider>
            </GameContextProvider>
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
