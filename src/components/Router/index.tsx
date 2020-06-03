import React, { Suspense, memo } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import styles from "./index.module.scss";
import Scan from "../../routes/Scan";
import Transitioner from "./Transitioner";
import Welcome from "../../routes/Welcome";
import CategorySelect from "../../routes/CategorySelect";
import Gameplay from "../../routes/Gameplay";
import Collection from "../../routes/Collection";
import ARBridge from "../ARBridge";
import AnimationExample from "../../routes/AnimationExample";
import SessionContextProvider from "../Session";
import TempPassword from "../TempPassword";
import AnimationTest from "../../routes/AnimationTest";

export const SCAN_SCREEN = "/";
export const WELCOME_SCREEN = "/welcome";
export const CATEGORY_SELECT_SCREEN = "/category";
export const GAMEPLAY_SCREEN = "/play";
export const COLLECTION_SCREEN = "/collection";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/animationExample">
          <Suspense fallback="Loading">
            <AnimationExample />
          </Suspense>
        </Route>
        <Route exact path="/testAnimations">
          <Suspense fallback="Loading">
            <AnimationTest />
          </Suspense>
        </Route>
        <Route path="/">
          {({ location }) => (
            <SessionContextProvider>
              <TempPassword password="HUZZAH!">
                <ARBridge>
                  <div className={styles.page}>
                    <Transitioner pageKey={location.pathname}>
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
                  </div>
                </ARBridge>
              </TempPassword>
            </SessionContextProvider>
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default memo(Router);
