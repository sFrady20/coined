import React, { Suspense, memo } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import styles from "./index.module.scss";
import Transitioner from "./Transitioner";
import ARBridge from "../ARBridge";
import SessionContextProvider from "../Session";
import TempPassword from "../TempPassword";
import AnimationTest from "../../routes/AnimationTest";
import AssetLoader from "../AssetLoader";
import MainRoute from "../../routes/Main";

export const SCAN_SCREEN = "/";
export const WELCOME_SCREEN = "/welcome";
export const CATEGORY_SELECT_SCREEN = "/category";
export const GAMEPLAY_SCREEN = "/play";
export const COLLECTION_SCREEN = "/collection";

const Router = memo(() => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/testAnimations">
          <Suspense fallback="Loading">
            <AnimationTest />
          </Suspense>
        </Route>

        <Route path="/">
          {({ location }) => (
            <SessionContextProvider>
              <TempPassword password="HUZZAH!">
                <AssetLoader>
                  <ARBridge>
                    <div className={styles.page}>
                      <Transitioner pageKey={location.pathname}>
                        <Switch location={location}>
                          <Route path={"/"}>
                            <MainRoute />
                          </Route>
                        </Switch>
                      </Transitioner>
                    </div>
                  </ARBridge>
                </AssetLoader>
              </TempPassword>
            </SessionContextProvider>
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
});

export default Router;
