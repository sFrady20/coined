import React, { useState, useContext } from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router";
import { WELCOME_SCREEN, GAMEPLAY_SCREEN } from "../../components/Router";
import _ from "lodash";
import classnames from "classnames";
import { SessionContext } from "../../components/Session";
import Banner from "../../components/Banner";
import Panel from "../../components/Panel";
import ActionBar from "../../components/ActionBar";

const CATEGORIES = ["Science", "Math", "History"];

export default () => {
  const history = useHistory();
  const { selectedCategory, selectCategory } = useContext(SessionContext);
  const [category, setCategory] = useState(selectedCategory || CATEGORIES[0]);

  return (
    <div className={styles.root}>
      <Banner transitions={["fade", "down"]}>Coined Logo</Banner>
      <Panel>
        <h5>Choose Category</h5>
        <p>This will be something cooler later.</p>
        {_.map(CATEGORIES, cat => (
          <div
            key={cat}
            className={classnames(
              styles.category,
              cat === category && styles[`category--selected`]
            )}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </div>
        ))}

        <ActionBar
          actions={{
            Back: () => history.push(WELCOME_SCREEN),
            Play: () => {
              selectCategory(category);
              history.push(GAMEPLAY_SCREEN);
            }
          }}
        />
      </Panel>
    </div>
  );
};
