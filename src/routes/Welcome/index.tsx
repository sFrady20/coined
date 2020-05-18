import React, { memo } from "react";
import { useHistory } from "react-router";
import { CATEGORY_SELECT_SCREEN, SCAN_SCREEN } from "../../components/Router";
import Banner from "../../components/Banner";
import Panel from "../../components/Panel";
import ActionBar from "../../components/ActionBar";

const Welcome = () => {
  const history = useHistory();

  return (
    <>
      <Banner>Coined Logo</Banner>
      <Panel>
        <h5>Welcome</h5>
        <p>
          Bacon ipsum dolor amet chuck chislic biltong beef ribs short ribs.
          Sirloin ham ham hock, prosciutto beef corned beef ball tip flank
          shankle biltong bacon.
        </p>
        <ActionBar
          actions={{
            Back: () => history.push(SCAN_SCREEN),
            Continue: () => history.push(CATEGORY_SELECT_SCREEN),
          }}
        />
      </Panel>
    </>
  );
};

export default memo(Welcome);
