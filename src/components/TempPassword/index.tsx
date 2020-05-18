import React, { memo, ReactNode, useContext, useState } from "react";
import styles from "./index.module.scss";
import { SessionContext } from "../Session";

const TempPassword = (props: { password: string; children: ReactNode }) => {
  const { password, children } = props;
  const { gameState, updateGameState } = useContext(SessionContext);
  const [passwordInput, setPasswordInput] = useState("");

  if (gameState.password === password) {
    return <>{children}</>;
  } else {
    return (
      <form
        className={styles.form}
        onSubmit={(e) => {
          updateGameState((g) => {
            g.password = passwordInput;
          });
        }}
      >
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          value={passwordInput}
          onChange={(e) => {
            const val = e.target.value;
            setPasswordInput(val);
          }}
        />
      </form>
    );
  }
};

export default memo(TempPassword);
