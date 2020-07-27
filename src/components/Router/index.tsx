import React, { Suspense, memo } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import styles from "./index.module.scss";
import Transitioner from "./Transitioner";
import SessionContextProvider from "../Session";
import TempPassword from "../TempPassword";
import AnimationTest from "../../routes/AnimationTest";
import AssetLoader from "../AssetLoader";
import MainRoute from "../../routes/Main";
import ARRenderer from "../ARBridge/ARRenderer";
import EffectTest from "../../routes/EffectTest";
import Test2 from "../../routes/AnimationTest/Test2";

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
        <Route exact path="/testAnimations/2">
          <Suspense fallback="Loading">
            <Test2 />
          </Suspense>
        </Route>
        <Route exact path="/testEffects">
          <Suspense fallback="Loading">
            <EffectTest />
          </Suspense>
        </Route>

        <Route path="/">
          {({ location }) => (
            <SessionContextProvider>
              <TempPassword password="HUZZAH!">
                <AssetLoader>
                  <ARRenderer>
                    <div className={styles.page}>
                      <Transitioner pageKey={location.pathname}>
                        <Switch location={location}>
                          <Route path={"/"}>
                            <MainRoute />
                          </Route>
                        </Switch>
                      </Transitioner>
                    </div>
                  </ARRenderer>
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
