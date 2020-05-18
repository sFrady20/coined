import React, {
  useState,
  useContext,
  memo,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { useHistory } from "react-router";
import { WELCOME_SCREEN, GAMEPLAY_SCREEN } from "../../components/Router";
import _ from "lodash";
import { SessionContext } from "../../components/Session";
import Banner from "../../components/Banner";
import Panel from "../../components/Panel";
import ActionBar from "../../components/ActionBar";
import CanvasPortal from "../../components/ARBridge/CanvasPortal";
import QuarterFlipScene, { QuarterFlipSceneHandle } from "./QuarterFlipScene";

const CATEGORIES = ["Science", "Math", "History"];

const CategorySelect = () => {
  const history = useHistory();
  const { selectCategory } = useContext(SessionContext);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const quarterSceneRef = useRef<QuarterFlipSceneHandle>(null);

  const selectRandomCategory = useCallback(() => {
    setCategory((c) => {
      var newCategory = c;
      while (newCategory === c) {
        newCategory = CATEGORIES[_.random(0, CATEGORIES.length - 1)];
      }
      return newCategory;
    });
  }, [setCategory]);

  return (
    <>
      <CanvasPortal
        scene={
          <Suspense fallback={<></>}>
            <QuarterFlipScene
              ref={quarterSceneRef}
              category={category}
              onFlipStart={() => {
                selectRandomCategory();
              }}
            />
          </Suspense>
        }
      />

      <Banner>Coined Logo</Banner>
      <Panel>
        <h5>Choose Category</h5>
        {category}

        <ActionBar
          actions={{
            Back: () => history.push(WELCOME_SCREEN),
            Spin: () => {
              quarterSceneRef.current?.spin();
            },
            Play: category
              ? () => {
                  selectCategory(category);
                  history.push(GAMEPLAY_SCREEN);
                }
              : undefined,
          }}
        />
      </Panel>
    </>
  );
};

export default memo(CategorySelect);
