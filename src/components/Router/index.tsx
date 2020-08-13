import React, { Suspense, memo, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import styles from "./index.module.scss";
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
import { Win } from "../../components/Feedback";
import Reward from "../../routes/Reward";
import CategorySelect from "../../routes/CategorySelect";

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
