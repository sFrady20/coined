import _ from "lodash";

import imgPaper from "../../media/paper.png";
import imgCardDesign from "../../media/cardDesign.png";
import imgFalseSymbol from "../../media/falseSymbol.png";
import imgTrueSymbol from "../../media/trueSymbol.png";

const preloadImages = async (onProgress: (pct: number) => void) => {
  const container = document.createElement("div");
  container.style.display = "none";
  document.body.appendChild(container);

  const images = [imgPaper, imgCardDesign, imgFalseSymbol, imgTrueSymbol];
  var current = 0;

  await Promise.all(
    _(images)
      .map(
        (src) =>
          new Promise((resolve) => {
            const img = container.appendChild(document.createElement("img"));
            img.onload = resolve;
            img.src = src;
            onProgress(++current / images.length);
          })
      )
      .value()
  );
};

export default preloadImages;
