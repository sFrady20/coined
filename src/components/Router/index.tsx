import React, { Suspense, memo, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import styles from "./index.module.scss";
import SessionContextProvider from "../Session";
import TempPassword from "../TempPassword";
import AnimationTest from "../../tests/AnimationTest";
import AssetLoader from "../AssetLoader";
import ARRenderer from "../ARBridge/ARRenderer";
import EffectTest from "../../tests/EffectTest";
import Test2 from "../../tests/AnimationTest/Test2";
import Header from "../Header";
import Footer from "../Footer";
import Collection from "../Collection";
import Scan from "../Scan";
import Welcome from "../Welcome";
import Gameplay from "../Gameplay";
import { SessionContext } from "../Session";
import { AnimatePresence } from "framer-motion";
import { Win } from "../Feedback";
import Reward from "../Reward";
import CategorySelect from "../CategorySelect";
import NnTest from "../../tests/NnTest";

const MainRoute = memo(() => {
  const { sessionState } = useContext(SessionContext);
  const { phase } = sessionState;
  const { selectedCategory } = sessionState;

  return (
    <AnimatePresence exitBeforeEnter>
      {phase === "scan" ? (
        <Scan key="scan" />
      ) : phase === "intro" ? (
        <Welcome key="intro" />
      ) : phase === "home" ? (
        <CategorySelect key={"home"} />
      ) : phase === "play" && selectedCategory ? (
        <Gameplay
          key={"gameplay-" + selectedCategory}
          category={selectedCategory}
        />
      ) : phase === "reward" && selectedCategory ? (
        <Reward key={"reward"} />
      ) : (
        "Something is wrong"
      )}
    </AnimatePresence>
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
        <Route exact path="/nnTest">
          <Suspense fallback="Loading">
            <NnTest />
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
            <Win />
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
                        <Switch location={location}>
                          <Route path={"/"}>
                            <MainRoute />
                          </Route>
                        </Switch>
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
