import React, { memo, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import styles from "./index.module.scss";
import SessionContextProvider from "../Session";
import AssetLoader from "../AssetLoader";
import ARRenderer from "../ARBridge/ARRenderer";
import Header from "../Header";
import Footer from "../Footer";
import Collection from "../Collection";
import Scan from "../Scan";
import Welcome from "../Welcome";
import Gameplay from "../Gameplay";
import { SessionContext } from "../Session";
import { AnimatePresence } from "framer-motion";
import Reward from "../Reward";
import CategorySelect from "../CategorySelect";
import QrCode from "../QrCode";
import isMobile from "is-mobile";

const IS_MOBILE = isMobile();

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
        <Route path="/qr">{IS_MOBILE ? <Redirect to="/" /> : <QrCode />}</Route>
        <Route path="/">
          {IS_MOBILE ? (
            ({ location }) => (
              <SessionContextProvider>
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
              </SessionContextProvider>
            )
          ) : (
            <Redirect to="/qr" />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
});

export default Router;
