import _ from "lodash";

import cultureQuarter from "../../media/quarters/QUARTER_CATEGORY_CULTURE.png";
import historyQuarter from "../../media/quarters/QUARTER_CATEGORY_HISTORY.png";
import scienceQuarter from "../../media/quarters/QUARTER_CATEGORY_SCIENCE&NATURE.png";
import statesQuarter from "../../media/quarters/QUARTER_CATEGORY_STATES&TERRITORIES.png";
import wildlifeQuarter from "../../media/quarters/QUARTER_CATEGORY_WILDLIFE.png";
import quarterFront from "../../media/quarters/FRONT.png";

const preloadImages = async (onProgress: (pct: number) => void) => {
  const container = document.createElement("div");
  container.style.display = "none";
  document.body.appendChild(container);

  const images = {
    cultureQuarter,
    historyQuarter,
    scienceQuarter,
    statesQuarter,
    wildlifeQuarter,
    quarterFront,
  };
  var current = 0;

  await Promise.all(
    _(images)
      .map(
        (src) =>
          new Promise((resolve) => {
            const img = container.appendChild(document.createElement("img"));
            img.onload = resolve;
            img.src = src;
            onProgress(++current / _.keys(images).length);
          })
      )
      .value()
  );

  return images;
};

export default preloadImages;
