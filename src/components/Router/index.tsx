import React, { Suspense, memo, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import styles from "./index.module.scss";
import Transitioner from "./Transitioner";
import SessionContextProvider from "../Session";
import TempPassword from "../TempPassword";
import AnimationTest from "../../routes/AnimationTest";
import AssetLoader from "../AssetLoader";
import ARRenderer from "../ARBridge/ARRenderer";
import EffectTest from "../../routes/EffectTest";
import Test2 from "../../routes/AnimationTest/Test2";
import Header from "../Header";
import Footer from "../Footer";
import Collection from "../../routes/Collection";
import Scan from "../../routes/Scan";
import Welcome from "../../routes/Welcome";
import Gameplay from "../../routes/Gameplay";
import { SessionContext } from "../../components/Session";
import { AnimatePresence } from "framer-motion";
import { Wrong } from "../../routes/Gameplay/Feedback";

export const SCAN_SCREEN = "/";
export const WELCOME_SCREEN = "/welcome";
export const CATEGORY_SELECT_SCREEN = "/category";
export const GAMEPLAY_SCREEN = "/play";
export const COLLECTION_SCREEN = "/collection";

const MainRoute = memo(() => {
  const { sessionState } = useContext(SessionContext);
  const { phase } = sessionState;
  const { selectedCategory } = sessionState;

  return (
    <Transitioner pageKey={phase}>
      {phase === "scan" ? (
        <Scan />
      ) : phase === "intro" ? (
        <Welcome />
      ) : phase === "home" ? (
        ""
      ) : phase === "play" && selectedCategory ? (
        <AnimatePresence exitBeforeEnter>
          <Gameplay key={selectedCategory} category={selectedCategory} />
        </AnimatePresence>
      ) : null}
    </Transitioner>
  );
});

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
        <Route exact path="/feedback">
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "60vw",
            }}
          >
            <Wrong />
          </div>
        </Route>

        <Route path="/">
          {({ location }) => (
            <SessionContextProvider>
              <TempPassword password="HUZZAH!">
                <AssetLoader>
                  <ARRenderer>
                    <div className={styles.page}>
                      <Header />
                      <div className={styles.content}>
                        <Transitioner pageKey={location.pathname}>
                          <Switch location={location}>
                            <Route path={"/"}>
                              <MainRoute />
                            </Route>
                          </Switch>
                        </Transitioner>
                        <Collection />
                      </div>
                      <Footer />
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
