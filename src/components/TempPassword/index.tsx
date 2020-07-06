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
          try {
            updateGameState((g) => {
              g.password = passwordInput;
            });
          } catch (err) {
            alert(err.message);
          }
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
        <button type="submit">Submit</button>
      </form>
    );
  }
};

export default memo(TempPassword);
